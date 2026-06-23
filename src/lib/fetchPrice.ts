import { Price } from "@/domain/price";

export const fetchPrice = async (productId: string): Promise<Price> => {
  return {
    amount: 32.23,
    currencyCode: 'CAD',
  }
}