import type { SerializedPrice } from "@/domain/price";
import { getProduct } from "./shopify/getProduct";
import { isCurrencyCode } from "@/domain/currencyCode";

export const fetchPrice = async (shopifyProductId: string, countryCode: string): Promise<SerializedPrice | undefined> => {
  if (!shopifyProductId) {
    return;
  }

  const productResult = await getProduct(shopifyProductId, countryCode);
  if (!productResult.success) {
    return;
  }

  const variant = productResult.value.variants.edges[0].node;

  const currencyCode = variant.price.currencyCode;
  if (!isCurrencyCode(currencyCode)) {
    console.error('unsupported currency code');
    return;
  }

  return {
    currencyCode,
    amount: variant.price.amount,
    original: variant.compareAtPrice === null ? undefined : variant.compareAtPrice.amount,
    paymentPlan: undefined,
  };
};
