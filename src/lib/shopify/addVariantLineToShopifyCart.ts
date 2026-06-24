import type { Result } from 'generic-result-type';
import { failure, success } from 'generic-result-type';

import { shopifyClient } from '.';
import type { ShopifyCart } from '.';

const CART_LINES_ADD_MUTATION = `
  mutation addVariantLineToShopifyCart($cartId: ID!, $lines: [CartLineInput!]!, $country: CountryCode)
  @inContext(country: $country) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

interface CartLinesAddResponse {
  cartLinesAdd: {
    cart: ShopifyCart | null;
    userErrors: {
      field: string[] | null;
      message: string;
    }[];
  };
}

export const addVariantLineToShopifyCart = async (cartId: string, variantId: string, countryCode: string): Promise<Result<ShopifyCart>> => {
  const variables = {
    cartId,
    country: countryCode.toUpperCase(),
    lines: [{ merchandiseId: variantId, quantity: 1 }],
  };

  const { data, errors } = await shopifyClient.request<CartLinesAddResponse>(CART_LINES_ADD_MUTATION, { variables });
  const cart = data?.cartLinesAdd.cart;
  const userErrors = data?.cartLinesAdd.userErrors ?? [];

  if (errors || !cart || userErrors.length > 0) {
    console.error(data, errors);
    return failure(Error(userErrors.map(error => error.message).join(', ') || 'Could not add product to cart'));
  }

  return success(cart);
};
