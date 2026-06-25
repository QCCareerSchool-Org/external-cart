import type { Metadata } from 'next';
import Script from 'next/script';

import { Footer } from './footer';
import { Header } from './header';
import { UserValuesProvider } from '@/components/providers/userValuesProvider';
import { getServerData } from '@/lib/getServerData';
import { getUserValues } from '@/lib/userValues';
import { Bing } from '@/scripts/bing';
import { Facebook } from '@/scripts/facebook';
import { GoogleAnalytics } from '@/scripts/googleAnalytics';
import type { LayoutComponent } from '@/serverComponent';

export const metadata: Metadata = {
  title: 'Enroll Online - QC Design School',
  icons: {
    icon: [
      { type: 'image/png', url: '/design/favicon-16x16.png', sizes: '16x16' },
      { type: 'image/png', url: '/design/favicon-32x32.png', sizes: '32x32' },
      { type: 'image/x-icon', url: '/design/favicon.ico', sizes: '48x48' },
      { rel: 'mask icon', type: 'image/png', url: '/design/safari-pinned-tab.svg', color: '#5bbad5' },
    ],
    shortcut: { type: 'image/x-icon', url: '/design/favicon.ico' },
    apple: { type: 'image/png', url: '/design/apple-touch-icon.png' },
  },
  manifest: '/design/manifest.json',
  other: { 'msapplication-config': '/design/browserconfig.xml' },
};

const DesignLayout: LayoutComponent = async ({ children }) => {
  const { countryCode } = await getServerData();
  const userValues = await getUserValues();

  return (
    <>
      <UserValuesProvider {...userValues}>
        <GoogleAnalytics id="G-DV480L9S3Y" adsId="AW-1071836607" userValues={userValues} />
        <Facebook id="5372705592757225" userValues={userValues} />
        <Bing id="5105217" userValues={userValues} />
        <div className="design-theme min-h-screen bg-background text-foreground">
          <Header countryCode={countryCode} />
          {children}
          <Footer countryCode={countryCode} />
        </div>
      </UserValuesProvider>
      <div className="container w-auto p-6 bg-background-inverse text-inverse">
        <pre>
          {JSON.stringify(userValues, null, ' ')}
        </pre>
      </div>
      <Script src="/design/chat.js" />
    </>
  );
};

export default DesignLayout;
