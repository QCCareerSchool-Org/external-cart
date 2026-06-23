import type { Result } from 'generic-result-type';
import { failure, success } from 'generic-result-type';

import { shopifyClient } from '.';

const PRODUCT_BY_ID_QUERY = `
  query getProductPriceById($id: ID!, $country: CountryCode)
  @inContext(country: $country) {
    product(id: $id) {
      title
      variants(first: 1) {
        edges {
          node {
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            shopPayInstallmentsPricing {
              available
              eligible
              fullPrice {
                amount
                currencyCode
              }
              installmentsCount {
                count
                precision
              }
              pricePerTerm {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
`;

export interface Product {
  title: string;
  variants: {
    edges: {
      node: {
        price: {
          amount: string;
          currencyCode: string;
        };
        compareAtPrice: {
          amount: string;
          currencyCode: string;
        } | null;
        shopPayInstallmentsPricing: {
          available: boolean;
          eligible: boolean;
          fullPrice: {
            amount: string;
            currencyCode: string;
          };
          installmentsCount: {
            count: number;
            precision: 'AT_LEAST' | 'EXACT';
          } | null;
          pricePerTerm: {
            amount: string;
            currencyCode: string;
          };
        } | null;
      };
    }[];
  };
};

interface Response { product: Product }

export const fetchProduct = async (shopifyProductId: string, countryCode: string): Promise<Result<Product>> => {
  const variables = {
    id: `gid://shopify/Product/${shopifyProductId}`,
    country: countryCode,
  };

  const { data, errors } = await shopifyClient.request<Response>(PRODUCT_BY_ID_QUERY, { variables });

  if (errors || !data?.product) {
    console.error(data, errors);
    return failure(Error('Could not fetch price'));
  }

  return success(data.product);
};
