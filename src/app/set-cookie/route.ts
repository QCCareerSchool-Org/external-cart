import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { isCookieData } from '@/domain/cookie';
import type { RouteHandler } from '@/serverComponent';

const MAX_AGE = 60 * 86_400; // 60 days

export const POST: RouteHandler = async req => {
  const cookieData: unknown = await req.json();

  if (!isCookieData(cookieData)) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const {
    name,
    value,
    httpOnly = false,
    secure = process.env.NODE_ENV === 'production',
    maxAge = MAX_AGE,
    path = '/',
    domain,
    priority,
    sameSite = 'lax',
  } = cookieData;

  const jar = await cookies();
  jar.set({ name, value, httpOnly, secure, maxAge, path, domain, priority, sameSite });

  return NextResponse.json({ success: true });
};
