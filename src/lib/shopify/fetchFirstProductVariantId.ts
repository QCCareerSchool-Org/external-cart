import type { Result } from 'generic-result-type';
import { failure, success } from 'generic-result-type';

import { shopifyClient } from '.';

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

export const fetchFirstProductVariantId = async (
  shopifyProductId: string,
  countryCode: string,
): Promise<Result<string>> => {
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
