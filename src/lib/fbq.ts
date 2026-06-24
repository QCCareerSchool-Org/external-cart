interface Options {
  eventID?: string;
}

export interface InitParams {
  em?: string;
  fn?: string;
  ln?: string;
  ct?: string;
  st?: string;
  country?: string;
  ph?: string;
}

interface FBQ {
  (action: 'init', pixelId: string, params?: InitParams): void;
  (action: 'track', type: 'Lead', params?: Record<never, string>, options?: Options): void;
  (action: 'track', type: 'PageView', params?: { page_url?: string }, options?: Options): void;
  (action: 'track', type: 'Purchase', params: { value: number; currency: string }, options: Options): void;
  (action: 'trackCustom', type: 'VirtualPageView', params: { url: string }): void;
}

declare global {
  interface Window {
    fbq?: FBQ;
  }
}

export const fbqPageview = (url?: string): void => {
  if (typeof url !== 'undefined') {
    // log the page view with a specific URL
    window.fbq?.('track', 'PageView', { page_url: url }); // eslint-disable-line camelcase
    return;
  }
  window.fbq?.('track', 'PageView');
};
