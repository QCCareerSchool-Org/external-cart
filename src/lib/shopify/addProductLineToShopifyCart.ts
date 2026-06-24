import type { Result } from 'generic-result-type';
import { failure } from 'generic-result-type';

import { addVariantLineToShopifyCart } from './addVariantLineToShopifyCart';
import type { ShopifyCart } from '.';
import { fetchFirstProductVariantId } from './fetchFirstProductVariantId';

export const addProductLineToShopifyCart = async (cartId: string, shopifyProductId: string, countryCode: string): Promise<Result<ShopifyCart>> => {
  const variantIdResult = await fetchFirstProductVariantId(shopifyProductId, countryCode);
  if (!variantIdResult.success) {
    return failure(variantIdResult.error);
  }

  return addVariantLineToShopifyCart(cartId, variantIdResult.value, countryCode);
};
