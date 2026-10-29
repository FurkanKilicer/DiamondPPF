/**
 * Cursor, stitch.googleapis.com üzerindeki OAuth keşfini API anahtarından
 * önce deniyor ve DCR hatası veriyor. Bu stdio vekili Cursor'ı yerel tutar
 * ve istekleri X-Goog-Api-Key ile Stitch HTTP MCP'ye iletir.
 *
 * Stdio framing: ilk mesaja göre NDJSON veya LSP Content-Length.
 * initialize yerelde yanıtlanır; aksi halde Google gecikmesi createClient
 * IPC zaman aşımına (30s) düşürür.
 */
import { spawnSync } from "node:child_process";

const STITCH_URL = "https://stitch.googleapis.com/mcp";
const FETCH_MS = 20_000;
const DEBUG = process.env.STITCH_MCP_DEBUG === "1";

function readApiKey() {
  if (process.env.STITCH_API_KEY?.trim()) {
    return process.env.STITCH_API_KEY.trim();
  }

  if (process.platform === "win32") {
    const result = spawnSync(
      "powershell.exe",
      [
        "-NoProfile",
        "-NonInteractive",
        "-Command",
        '[System.Environment]::GetEnvironmentVariable("STITCH_API_KEY","User")',
      ],
      { encoding: "utf8", windowsHide: true },
    );
    const value = result.stdout?.trim();
    if (value) return value;
  }

  return "";
}

const apiKey = readApiKey();
/** @type {"ndjson" | "lsp"} */
let framing = "ndjson";
let protocolVersion = "2025-06-18";

function log(message) {
  if (!DEBUG) return;
  process.stderr.write(`[stitch-mcp-proxy] ${message}\n`);
}

function writeMessage(message) {
  const json = JSON.stringify(message);
  if (framing === "ndjson") {
    process.stdout.write(`${json}\n`);
    return;
  }
  const body = Buffer.from(json, "utf8");
  process.stdout.write(`Content-Length: ${body.length}\r\n\r\n`);
  process.stdout.write(body);
}

function parseSseOrJson(text) {
  const trimmed = text.trim();
  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    return JSON.parse(trimmed);
  }

  const dataLines = trimmed
    .split(/\r?\n/)
    .filter((line) => line.startsWith("data:"))
    .map((line) => line.slice(5).trim())
    .filter(Boolean);

  if (dataLines.length === 0) {
    throw new Error("Stitch yanıtı JSON veya SSE değil");
  }

  return JSON.parse(dataLines[dataLines.length - 1]);
}

async function forwardToStitch(message) {
  if (!apiKey) {
    return {
      jsonrpc: "2.0",
      id: message.id ?? null,
      error: {
        code: -32000,
        message:
          "STITCH_API_KEY yok. Windows kullanıcı ortam değişkenini ayarlayın ve Cursor'ı yeniden başlatın.",
      },
    };
  }

  const response = await fetch(STITCH_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
      "X-Goog-Api-Key": apiKey,
      "MCP-Protocol-Version": protocolVersion,
    },
    body: JSON.stringify(message),
    signal: AbortSignal.timeout(FETCH_MS),
  });

  const text = await response.text();
  if (!text) {
    if (message.id === undefined) return null;
    return {
      jsonrpc: "2.0",
      id: message.id,
      error: {
        code: -32000,
        message: `Stitch boş yanıt döndü (HTTP ${response.status})`,
      },
    };
  }

  return parseSseOrJson(text);
}

function localInitializeResult(message) {
  const requested = message.params?.protocolVersion;
  if (typeof requested === "string" && requested.length > 0) {
    protocolVersion = requested;
  }
  return {
    jsonrpc: "2.0",
    id: message.id,
    result: {
      protocolVersion,
      capabilities: {
        tools: { listChanged: false },
      },
      serverInfo: {
        name: "stitch-mcp-proxy",
        version: "1.1.0",
      },
    },
  };
}

async function handleMessage(message) {
  if (message.method === "initialize") {
    writeMessage(localInitializeResult(message));
    return;
  }

  if (message.method === "notifications/initialized" || message.method === "notifications/cancelled") {
    return;
  }

  if (message.method === "ping") {
    writeMessage({ jsonrpc: "2.0", id: message.id, result: {} });
    return;
  }

  if (message.method && message.id === undefined) {
    try {
      await forwardToStitch(message);
    } catch (error) {
      log(`bildirim iletilemedi: ${error instanceof Error ? error.message : error}`);
    }
    return;
  }

  try {
    const result = await forwardToStitch(message);
    if (result) writeMessage(result);
  } catch (error) {
    writeMessage({
      jsonrpc: "2.0",
      id: message.id ?? null,
      error: {
        code: -32000,
        message: error instanceof Error ? error.message : String(error),
      },
    });
  }
}

function consumeBuffer(buffer) {
  let rest = buffer;

  while (rest.length > 0) {
    while (rest.length > 0 && (rest[0] === 0x0a || rest[0] === 0x0d)) {
      rest = rest.subarray(1);
    }
    if (rest.length === 0) break;

    if (rest[0] === 0x7b) {
      framing = "ndjson";
      const newline = rest.indexOf("\n");
      if (newline === -1) break;
      const line = rest.subarray(0, newline).toString("utf8").trim();
      rest = rest.subarray(newline + 1);
      if (line) void handleMessage(JSON.parse(line));
      continue;
    }

    framing = "lsp";
    const headerEnd = rest.indexOf("\r\n\r\n");
    if (headerEnd === -1) break;
    const header = rest.subarray(0, headerEnd).toString("utf8");
    const lengthMatch = header.match(/Content-Length:\s*(\d+)/i);
    if (!lengthMatch) {
      throw new Error("stdio mesajında Content-Length yok");
    }
    const length = Number(lengthMatch[1]);
    const bodyStart = headerEnd + 4;
    if (rest.length < bodyStart + length) break;
    const body = rest.subarray(bodyStart, bodyStart + length).toString("utf8");
    rest = rest.subarray(bodyStart + length);
    void handleMessage(JSON.parse(body));
  }

  return rest;
}

let stdinBuffer = Buffer.alloc(0);

process.stdin.on("data", (chunk) => {
  stdinBuffer = Buffer.concat([stdinBuffer, chunk]);
  try {
    stdinBuffer = consumeBuffer(stdinBuffer);
  } catch (error) {
    log(error instanceof Error ? error.message : String(error));
  }
});

process.stdin.on("end", () => process.exit(0));
process.stdin.resume();
