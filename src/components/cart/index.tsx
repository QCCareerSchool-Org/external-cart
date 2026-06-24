import { Form } from "@/components/form";
import type { Course } from "@/domain/course";
import type { School } from "@/domain/school";
import type { FC, PropsWithChildren } from "react";
import { Summary } from "../summary";
import { CartStateProvider } from "../cartState";
import { CourseSelection } from "../courseSelection";
import { cookies } from "next/headers";
import { isShopifyCart, ShopifyCart } from "@/lib/shopify";
import { failure, Result, success } from "generic-result-type";

interface Props {
  school: School;
  courses: Course[];
  successPage: string;
  countryCode: string;
  provinceCode: string | null;
  date: number;
}

export const Cart: FC<PropsWithChildren<Props>> = async ({ school, courses, countryCode, children }) => {
  const shopifyCartResult = await loadShopifyCart();
  const shopifyCart = shopifyCartResult.success ? shopifyCartResult.value : undefined;

  return (
    <CartStateProvider>
      <Form school={school} courses={courses} checkoutUrl={shopifyCart?.checkoutUrl}>
        <pre>{JSON.stringify(shopifyCart, null, '  ')}</pre>
        {shopifyCart && <a href={shopifyCart.checkoutUrl}><button type="button">Check Out</button></a>}
        {children}
        <CourseSelection courses={courses} countryCode={countryCode} />
        <Summary />
      </Form>
    </CartStateProvider>
  );
};

const loadShopifyCart = async (): Promise<Result<ShopifyCart>> => {
  const cookieStore = await cookies();
  const value = cookieStore.get('shopify_cart')?.value;
  if (!value) {
    return failure(Error('cookie not found'));
  }
  try {
    const cart: unknown = JSON.parse(value);
    if (!isShopifyCart(cart)) {
      return failure(Error('invalid cookie'));
    }

    return success(cart);
  } catch (err) {
    return failure(err instanceof Error ? err : Error(String(err)));
  }
};

