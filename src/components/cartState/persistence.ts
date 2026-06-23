import { isCourseCode } from "@/domain/courseCode";

import type { CartState } from "./state";
import type { CourseCode } from "@/domain/courseCode";

export interface CartStatePersistence {
  load(): CartState | null;
  save(state: CartState): void;
}

interface CookieCartStatePersistenceOptions {
  cookieName?: string;
  maxAgeSeconds?: number;
}

const defaultCookieName = "external-cart-state";
const defaultMaxAgeSeconds = 60 * 60 * 24 * 30;

const parseCourseCodes = (value: unknown): CourseCode[] | null => {
  if (!Array.isArray(value) || !value.every(isCourseCode)) {
    return null;
  }

  return value;
};

const parseCartState = (value: unknown): CartState | null => {
  if (typeof value !== "object" || value === null) {
    return null;
  }

  const record = value as Record<string, unknown>;
  const selected = parseCourseCodes(record.selected);
  if (selected) {
    return { selected };
  }

  const legacySelected = parseCourseCodes(record.selectedCourseCodes);
  if (legacySelected) {
    return { selected: legacySelected };
  }

  return null;
};

const readCookie = (cookieName: string): string | null => {
  if (typeof document === "undefined") {
    return null;
  }

  const prefix = `${cookieName}=`;
  const cookies = document.cookie ? document.cookie.split("; ") : [];
  const cookie = cookies.find(entry => entry.startsWith(prefix));

  if (!cookie) {
    return null;
  }

  return cookie.slice(prefix.length);
};

const writeCookie = (cookieName: string, value: string, maxAgeSeconds: number): void => {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${cookieName}=${value}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax`;
};

export const createCookieCartStatePersistence = (options: CookieCartStatePersistenceOptions = {}): CartStatePersistence => {
  const cookieName = options.cookieName ?? defaultCookieName;
  const maxAgeSeconds = options.maxAgeSeconds ?? defaultMaxAgeSeconds;

  return {
    load() {
      const cookieValue = readCookie(cookieName);
      if (!cookieValue) {
        return null;
      }

      try {
        return parseCartState(JSON.parse(decodeURIComponent(cookieValue)) as unknown);
      } catch {
        return null;
      }
    },
    save(state) {
      writeCookie(cookieName, encodeURIComponent(JSON.stringify(state)), maxAgeSeconds);
    },
  };
};
