import type { CartState } from "./state";
import { isCartState} from "./state";
import { readCookie, writeCookie } from "@/lib/cookie";

export interface CartStatePersistence {
  load: () => CartState | null;
  save: (state: CartState) => void;
}

interface CookieCartStatePersistenceOptions {
  cookieName?: string;
  maxAgeSeconds?: number;
}

const defaultCookieName = "shopify_cart";
const defaultMaxAgeSeconds = 60 * 60 * 24 * 30;

export const createCookieCartStatePersistence = (options: CookieCartStatePersistenceOptions = {}): CartStatePersistence => {
  const cookieName = options.cookieName ?? defaultCookieName;
  const maxAgeSeconds = options.maxAgeSeconds ?? defaultMaxAgeSeconds;

  const load = (): CartState | null => {
    const cookieValue = readCookie(cookieName);
    if (!cookieValue) {
      return null;
    }

    const decodedValue = decodeURIComponent(cookieValue);

    try {
      const cartState: unknown = JSON.parse(decodedValue);
      if (!isCartState(cartState)) {
        return null;
      }
      return cartState
    } catch {
      return null;
    }
  };

  const save = (state: CartState): void => {
    writeCookie(cookieName, encodeURIComponent(JSON.stringify(state)), maxAgeSeconds);
  }

  return { load, save };
};
