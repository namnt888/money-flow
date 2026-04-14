export const TRANSACTION_SYNC_EVENT = "mf:transaction-sync";
const TRANSACTION_SYNC_STORAGE_KEY = "mf:transaction-sync:ping";
const TRANSACTION_SYNC_CHANNEL = "mf:transaction-sync:channel";

type SyncPayload = {
  ts: number;
  sourceTabId: string;
  reason?: string;
};

declare global {
  interface Window {
    __MF_TXN_SYNC_TAB_ID__?: string;
  }
}

function getTabId(): string {
  if (typeof window === "undefined") return "server";
  if (!window.__MF_TXN_SYNC_TAB_ID__) {
    window.__MF_TXN_SYNC_TAB_ID__ = `tab-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }
  return window.__MF_TXN_SYNC_TAB_ID__;
}

export function emitTransactionSync(reason = "transaction-mutated"): void {
  if (typeof window === "undefined") return;

  const payload: SyncPayload = {
    ts: Date.now(),
    sourceTabId: getTabId(),
    reason,
  };

  window.dispatchEvent(new CustomEvent(TRANSACTION_SYNC_EVENT, { detail: payload }));

  try {
    localStorage.setItem(TRANSACTION_SYNC_STORAGE_KEY, JSON.stringify(payload));
    localStorage.removeItem(TRANSACTION_SYNC_STORAGE_KEY);
  } catch {
    // no-op
  }

  if (typeof BroadcastChannel !== "undefined") {
    try {
      const channel = new BroadcastChannel(TRANSACTION_SYNC_CHANNEL);
      channel.postMessage(payload);
      channel.close();
    } catch {
      // no-op
    }
  }
}

export function subscribeTransactionSync(
  onSync: (payload: SyncPayload) => void,
): () => void {
  if (typeof window === "undefined") return () => {};

  const currentTabId = getTabId();

  const handlePayload = (payload: SyncPayload | null | undefined) => {
    if (!payload) return;
    if (payload.sourceTabId === currentTabId) return;
    onSync(payload);
  };

  const onWindowEvent = (event: Event) => {
    const custom = event as CustomEvent<SyncPayload>;
    handlePayload(custom.detail);
  };

  const onStorage = (event: StorageEvent) => {
    if (event.key !== TRANSACTION_SYNC_STORAGE_KEY || !event.newValue) return;
    try {
      handlePayload(JSON.parse(event.newValue) as SyncPayload);
    } catch {
      // no-op
    }
  };

  window.addEventListener(TRANSACTION_SYNC_EVENT, onWindowEvent as EventListener);
  window.addEventListener("storage", onStorage);

  let channel: BroadcastChannel | null = null;
  if (typeof BroadcastChannel !== "undefined") {
    try {
      channel = new BroadcastChannel(TRANSACTION_SYNC_CHANNEL);
      channel.onmessage = (event: MessageEvent<SyncPayload>) => {
        handlePayload(event.data);
      };
    } catch {
      channel = null;
    }
  }

  return () => {
    window.removeEventListener(TRANSACTION_SYNC_EVENT, onWindowEvent as EventListener);
    window.removeEventListener("storage", onStorage);
    if (channel) {
      channel.close();
    }
  };
}
