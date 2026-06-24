import type { Result } from 'generic-result-type';
import { failure, success } from 'generic-result-type';

import { shopifyClient } from './client';

export const addProductLineToShopifyCart = async (cartId: string, shopifyProductId: string, countryCode: string): Promise<Result<true>> => {
  const variantIdResult = await fetchFirstProductVariantId(shopifyProductId, countryCode);
  if (!variantIdResult.success) {
    return failure(variantIdResult.error);
  }

  return addVariantLineToShopifyCart(cartId, variantIdResult.value, countryCode);
};

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

const addVariantLineToShopifyCart = async (cartId: string, variantId: string, countryCode: string): Promise<Result<true>> => {
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

  return success(true);
};

const PRODUCT_VARIANT_ID_QUERY = `
  query fetchFirstProductVariantId($id: ID!, $country: CountryCode)
  @inContext(country: $country) {
    product(id: $id) {
      variants(first: 1) {
        edges {
          node {
            id
          }
        }
      }
    }
  }
`;

interface ProductVariantResponse {
  product: {
    variants: {
      edges: {
        node: {
          id: string;
        };
      }[];
    };
  } | null;
}

const fetchFirstProductVariantId = async (shopifyProductId: string, countryCode: string): Promise<Result<string>> => {
  if (!shopifyProductId) {
    return failure(Error('Shopify product id is required'));
  }

  const variables = {
    id: `gid://shopify/Product/${shopifyProductId}`,
    country: countryCode.toUpperCase(),
  };

  const { data, errors } = await shopifyClient.request<ProductVariantResponse>(PRODUCT_VARIANT_ID_QUERY, { variables });
  const variantId = data?.product?.variants.edges[0]?.node.id;

  if (errors || !variantId) {
    console.error(data, errors);
    return failure(Error('Could not find a Shopify variant for this product'));
  }

  return success(variantId);
};
