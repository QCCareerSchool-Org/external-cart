import type { Result } from 'generic-result-type';
import { failure, success } from 'generic-result-type';

import { shopifyClient } from './client';

const CART_CREATE_MUTATION = `
  mutation createShopifyCart($input: CartInput!, $country: CountryCode)
  @inContext(country: $country) {
    cartCreate(input: $input) {
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

interface ShopifyCart {
  id: string;
  checkoutUrl: string;
}

interface CartCreateResponse {
  cartCreate: {
    cart: {
      id: string;
      checkoutUrl: string;
    } | null;
    userErrors: {
      field: string[] | null;
      message: string;
    }[];
  };
}

export const createShopifyCart = async (countryCode: string): Promise<Result<ShopifyCart>> => {
  const normalizedCountryCode = countryCode.toUpperCase();
  const cartVariables = {
    country: normalizedCountryCode,
    input: {
      buyerIdentity: {
        countryCode: normalizedCountryCode,
      },
    },
  };

  const { data, errors } = await shopifyClient.request<CartCreateResponse>(CART_CREATE_MUTATION, { variables: cartVariables });

  const cart = data?.cartCreate.cart;
  const userErrors = data?.cartCreate.userErrors ?? [];

  if (errors || !cart || userErrors.length > 0) {
    console.error(data, errors);
    return failure(Error(userErrors.map(error => error.message).join(', ') || 'Could not create cart'));
  }

  return success(cart);
};
