import type { StoreProductId } from "@/lib/storeProducts";

export type PendingStoreOrder = {
  productId: StoreProductId;
  productName: string;
  price: number;
  artistOrBandName: string;
  contactName: string;
  email: string;
  submittedAt: string;
};

const STORAGE_KEY = "801studio_pending_store_order";

export function savePendingStoreOrder(order: PendingStoreOrder): void {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(order));
}

export function loadPendingStoreOrder(): PendingStoreOrder | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PendingStoreOrder;
  } catch {
    return null;
  }
}

export function clearPendingStoreOrder(): void {
  sessionStorage.removeItem(STORAGE_KEY);
}

export type StoreCheckoutLocationState = {
  order?: PendingStoreOrder;
};

export function readPendingOrderFromLocation(
  state: unknown
): PendingStoreOrder | null {
  const order = (state as StoreCheckoutLocationState | null)?.order;
  if (!order?.productId || !order.email) return null;
  return order;
}
