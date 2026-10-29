export type LookupResult<T> = {
  data: T;
  error: { message: string; code?: string } | null;
};

export type AdminMembershipResolution = {
  isAdmin: boolean;
  determined: boolean;
  source: "rpc_private" | "rpc_public" | "admin_profiles" | "none";
};

/**
 * Fail-closed: hata veya belirsizlikte isAdmin false.
 * İlk hatasız kanal kesindir.
 */
export function resolveAdminMembership(input: {
  userId: string;
  rpcPrivate: LookupResult<boolean | null>;
  rpcPublic: LookupResult<boolean | null>;
  profile: LookupResult<{ user_id: string } | null>;
}): AdminMembershipResolution {
  const privateRpc = interpretRpc(input.rpcPrivate);
  if (privateRpc) return { ...privateRpc, source: "rpc_private" };

  const publicRpc = interpretRpc(input.rpcPublic);
  if (publicRpc) return { ...publicRpc, source: "rpc_public" };

  const { profile, userId } = input;
  if (!profile.error) {
    const isAdmin = profile.data?.user_id === userId;
    return { isAdmin, determined: true, source: "admin_profiles" };
  }

  return { isAdmin: false, determined: false, source: "none" };
}

function interpretRpc(
  result: LookupResult<boolean | null>,
): Omit<AdminMembershipResolution, "source"> | null {
  if (result.error) return null;
  if (result.data === true) return { isAdmin: true, determined: true };
  if (result.data === false) return { isAdmin: false, determined: true };
  return null;
}

type RpcResponse = {
  data: unknown;
  error: { message: string; code?: string } | null;
};

export type AdminMembershipClient = {
  schema: (name: string) => { rpc: (fn: string) => PromiseLike<RpcResponse> };
  rpc: (fn: string) => PromiseLike<RpcResponse>;
  from: (table: string) => {
    select: (columns: string) => {
      eq: (column: string, value: string) => {
        maybeSingle: () => PromiseLike<RpcResponse>;
      };
    };
  };
};

export async function loadAdminMembership(
  client: AdminMembershipClient,
  userId: string,
): Promise<AdminMembershipResolution> {
  const rpcPrivate = await readRpc(() => client.schema("private").rpc("is_admin"));
  const rpcPublic = await readRpc(() => client.rpc("is_admin"));
  const profile = await readProfile(() =>
    client.from("admin_profiles").select("user_id").eq("user_id", userId).maybeSingle(),
  );

  return resolveAdminMembership({ userId, rpcPrivate, rpcPublic, profile });
}

async function readRpc(run: () => PromiseLike<RpcResponse>): Promise<LookupResult<boolean | null>> {
  try {
    const { data, error } = await run();
    if (error) return { data: null, error: { message: error.message, code: error.code } };
    if (data === true || data === false) return { data, error: null };
    return { data: null, error: null };
  } catch (caught) {
    return { data: null, error: { message: caught instanceof Error ? caught.message : "rpc_failed" } };
  }
}

async function readProfile(
  run: () => PromiseLike<RpcResponse>,
): Promise<LookupResult<{ user_id: string } | null>> {
  try {
    const { data, error } = await run();
    if (error) return { data: null, error: { message: error.message, code: error.code } };
    if (data && typeof data === "object" && "user_id" in data && typeof data.user_id === "string") {
      return { data: { user_id: data.user_id }, error: null };
    }
    return { data: null, error: null };
  } catch (caught) {
    return { data: null, error: { message: caught instanceof Error ? caught.message : "profile_failed" } };
  }
}
