import { getProduct } from './shopify/getProduct';
import { getCurrency } from '@/domain/currency';
import { isCurrencyCode } from '@/domain/currencyCode';
import type { SerializedPrice } from '@/domain/price';

export const fetchPrice = async (shopifyProductId: string, countryCode: string): Promise<SerializedPrice | undefined> => {
  if (!shopifyProductId) {
    return;
  }

  const productResult = await getProduct(shopifyProductId, countryCode);
  if (!productResult.success) {
    console.error(productResult.error);
    return;
  }

  const variant = productResult.value.variants.edges[0].node;

  const currencyCode = variant.price.currencyCode;
  if (!isCurrencyCode(currencyCode)) {
    console.error('unsupported currency code');
    return;
  }

  return {
    currency: getCurrency(currencyCode),
    amount: variant.price.amount,
    original: variant.compareAtPrice === null ? undefined : variant.compareAtPrice.amount,
    paymentPlan: undefined,
  };
};
