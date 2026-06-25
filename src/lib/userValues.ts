'server only';

import { cookies } from 'next/headers';

import { decodeJwt } from './jwt';
import type { UserValues } from '@/domain/userValues';
import { isUserValues } from '@/domain/userValues';

export const getUserValues = async (): Promise<UserValues | undefined> => {
  const cookieStore = await cookies();
  const jwt = cookieStore.get('user')?.value;
  const result = jwt ? await decodeJwt(jwt, 'QC Design School') : undefined;
  if (!result) {
    return;
  }
  if (!result.success) {
    console.error(result.error);
    return;
  }
  if (!isUserValues(result.value)) {
    return;
  }
  return result.value;
};
