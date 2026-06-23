import { CurrencyCode } from "./currencyCode";

export interface Price {
  amount: number;
  currencyCode: CurrencyCode;
  original?: {
    amount: number;
    currencyCode: CurrencyCode;
  }
  paymentPlan?: {
    installmentCount: number;
    deposit: number;
    installmentAmount: number;
    currencyCode: number;
  }
}