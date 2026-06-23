import { headers } from "next/headers";

interface ServerData {
  countryCode: string;
  provinceCode: string | null;
  date: number;
}

export const getServerData = async (): Promise<ServerData> => {
  const headerSet = await headers();
  const countryCode = headerSet.get('X-Vercel-Country') ?? 'US';
  const provinceCode = headerSet.get('X-Vercel-Country-State');

  return { countryCode, provinceCode, date: Date.now() };
}