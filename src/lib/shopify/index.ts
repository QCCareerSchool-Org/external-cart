import { createStorefrontApiClient } from '@shopify/storefront-api-client';

if (!process.env.SHOPIFY_STORE_DOMAIN) {
  throw Error();
}

if (!process.env.SHOPIFY_STOREFRONT_TOKEN) {
  throw Error();
}

export const shopifyClient = createStorefrontApiClient({
  storeDomain: process.env.SHOPIFY_STORE_DOMAIN,
  apiVersion: '2026-04', // Matches the latest API version
  publicAccessToken: process.env.SHOPIFY_STOREFRONT_TOKEN,
});
