"use client";

import { useLayoutEffect } from "react";

const GUARD = "__dppfViewTransitionGuard";

function isHiddenAbort(error: unknown) {
  if (!(error instanceof DOMException) && !(error instanceof Error)) return false;
  if (error.name !== "InvalidStateError") return false;
  return error.message.startsWith("Transition was aborted because of invalid state");
}

function swallow(promise: Promise<unknown>) {
  return promise.catch((error: unknown) => {
    if (isHiddenAbort(error)) return undefined;
    throw error;
  });
}

function skippedTransition(update: void | Promise<void>): ViewTransition {
  const updateCallbackDone = Promise.resolve(update).then(() => undefined);
  return {
    updateCallbackDone,
    ready: updateCallbackDone,
    finished: updateCallbackDone,
    skipTransition() {},
    types: new Set<string>(),
  };
}

function runUpdate(callback?: ViewTransitionUpdateCallback) {
  return typeof callback === "function" ? callback() : undefined;
}

export function ViewTransitionGuard() {
  useLayoutEffect(() => {
    const doc = document as Document & { [GUARD]?: boolean };
    if (!doc.startViewTransition || doc[GUARD]) return;

    const original = doc.startViewTransition.bind(doc);
    doc.startViewTransition = ((callback?: ViewTransitionUpdateCallback) => {
      if (document.visibilityState !== "visible") {
        return skippedTransition(runUpdate(callback));
      }
      try {
        const transition = original(callback);
        return {
          updateCallbackDone: swallow(transition.updateCallbackDone),
          ready: swallow(transition.ready),
          finished: swallow(transition.finished),
          skipTransition: () => transition.skipTransition(),
          types: transition.types,
        };
      } catch (error) {
        if (isHiddenAbort(error)) return skippedTransition(runUpdate(callback));
        throw error;
      }
    }) as typeof document.startViewTransition;
    doc[GUARD] = true;
  }, []);

  return null;
}
