import Big from "big.js";
import { CurrencyCode } from "./currencyCode";

export interface Price {
  currencyCode: CurrencyCode;
  amount: Big;
  original?: Big;
  paymentPlan?: {
    installmentCount: number;
    deposit: Big;
    installmentAmount: Big;
  };
}