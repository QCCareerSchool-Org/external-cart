export const readCookie = (cookieName: string): string | null => {
  if (typeof document === 'undefined') {
    return null;
  }

  const prefix = `${cookieName}=`;
  const cookies = document.cookie ? document.cookie.split('; ') : [];
  const cookie = cookies.find(entry => entry.startsWith(prefix));

  if (!cookie) {
    return null;
  }

  return cookie.slice(prefix.length);
};

export const writeCookie = (cookieName: string, value: string, maxAgeSeconds: number): void => {
  if (typeof document === 'undefined') {
    return;
  }

  document.cookie = `${cookieName}=${value}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax`;
};
