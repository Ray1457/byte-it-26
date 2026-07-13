export interface CartItem {
  id: string;
  name: string;
  price: string;
  priceValue: number;
  buyImage: string;
}

export const CART_KEY = "nexus-cart";
export const CART_EVENT = "nexus-cart-updated";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function persist(items: CartItem[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_EVENT));
}

export function addToCart(item: CartItem): void {
  const cart = getCart().filter((c) => c.id !== item.id);
  persist([...cart, item]);
}

export function removeFromCart(id: string): void {
  persist(getCart().filter((c) => c.id !== id));
}

export function isInCart(id: string): boolean {
  return getCart().some((c) => c.id === id);
}
