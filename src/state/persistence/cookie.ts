import type { CartStatePersistence } from '.';
import type { CartState } from '..';
import { isCartState } from '..';
import { readCookie, writeCookie } from '@/lib/cookie';

interface CookieCartStatePersistenceOptions {
  cookieName?: string;
  maxAgeSeconds?: number;
}

const defaultCookieName = 'cart_state';
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
      return cartState;
    } catch {
      return null;
    }
  };

  const save = (state: CartState): void => {
    writeCookie(cookieName, encodeURIComponent(JSON.stringify(state)), maxAgeSeconds);
  };

  return { load, save };
};
