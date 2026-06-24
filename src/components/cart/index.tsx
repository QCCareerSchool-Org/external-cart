import { Form } from "@/components/form";
import type { Course } from "@/domain/course";
import type { School } from "@/domain/school";
import { getCoursePrices } from "@/lib/getCoursePrices";
import type { FC } from "react";
import { Summary } from "../summary";
import { CartStateProvider } from "../cartState";
import { CourseSelection } from "../courseSelection";

interface Props {
  school: School;
  courses: Course[];
  successPage: string;
  countryCode: string;
  provinceCode: string | null;
  date: number;
}

export const Cart: FC<Props> = async ({ school, courses, countryCode }) => {
  const prices = await getCoursePrices(courses, countryCode);

  return (
    <section className="min-h-screen overflow-hidden bg-[#f4eadb] px-4 py-8 text-[#21160f] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="relative mb-8 overflow-hidden rounded-[2rem] bg-[#28180f] px-6 py-8 text-[#fff6e8] shadow-[0_24px_80px_rgba(50,31,18,0.22)] sm:px-10 lg:px-12">
          <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#e36537] opacity-80 blur-2xl" />
          <div className="absolute bottom-0 right-24 h-28 w-56 rotate-[-18deg] rounded-full bg-[#f6c44f] opacity-30 blur-xl" />
          <div className="relative max-w-2xl">
            <p className="mb-4 inline-flex rounded-full border border-[#f6c44f]/40 px-3 py-1 text-xs font-bold uppercase tracking-[0.28em] text-[#f6c44f]">
              {school.name}
            </p>
            <h1 className="max-w-3xl font-serif text-4xl font-black leading-[0.95] tracking-[-0.05em] sm:text-6xl">
              Build your course cart.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#f9dfbd] sm:text-lg">
              Select the programs you want, review your total, and continue to Shopify checkout when everything looks right.
            </p>
          </div>
        </header>

        <CartStateProvider>
          <Form countryCode={countryCode}>
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start">
              <CourseSelection courses={courses} prices={prices} />
              <Summary courses={courses} prices={prices} />
            </div>
          </Form>
        </CartStateProvider>
      </div>
    </section>
  );
};
