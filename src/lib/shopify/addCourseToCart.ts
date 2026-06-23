import type { Result } from 'generic-result-type';
import { failure, success } from 'generic-result-type';

import { shopifyClient } from '.';
import type { Cart } from './createCart';
import type { CourseCode } from '@/domain/courseCode';
import { getCourse } from '@/domain/course';

const PRODUCT_VARIANT_ID_QUERY = `
  query getProductVariantIdForCart($id: ID!, $country: CountryCode)
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

const CART_LINES_ADD_MUTATION = `
  mutation addCourseToCart($cartId: ID!, $lines: [CartLineInput!]!, $country: CountryCode)
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

interface CartLinesAddResponse {
  cartLinesAdd: {
    cart: Cart | null;
    userErrors: {
      field: string[] | null;
      message: string;
    }[];
  };
}

export const addCourseToCart = async (cartId: string, courseCode: CourseCode, countryCode: string): Promise<Result<Cart>> => {
  const normalizedCountryCode = countryCode.toUpperCase();
  const course = getCourse(courseCode);

  if (!course?.shopifyProductId) {
    return failure(Error('Could not find a Shopify product for this course'));
  }

  const getProductVariables = {
    id: `gid://shopify/Product/${course.shopifyProductId}`,
    country: normalizedCountryCode,
  };

  const productResponse = await shopifyClient.request<ProductVariantResponse>(PRODUCT_VARIANT_ID_QUERY, { variables: getProductVariables });

  const merchandiseId = productResponse.data?.product?.variants.edges[0]?.node.id;

  if (productResponse.errors || !merchandiseId) {
    console.error(productResponse.data, productResponse.errors);
    return failure(Error('Could not find a Shopify variant to add to the cart'));
  }

  const addProductVariables = {
    cartId,
    country: normalizedCountryCode,
    lines: [ { merchandiseId, quantity: 1 } ],
  };

  const { data, errors } = await shopifyClient.request<CartLinesAddResponse>(CART_LINES_ADD_MUTATION, { variables: addProductVariables });

  const cart = data?.cartLinesAdd.cart;
  const userErrors = data?.cartLinesAdd.userErrors ?? [];

  if (errors || !cart || userErrors.length > 0) {
    console.error(data, errors);
    return failure(Error(userErrors.map(error => error.message).join(', ') || 'Could not add course to cart'));
  }

  return success(cart);
};
