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

export const Cart: FC<Props> = async ({ courses, countryCode }) => {
  const prices = await getCoursePrices(courses, countryCode);

  return (
    <CartStateProvider>
      <Form countryCode={countryCode}>
        <CourseSelection courses={courses} />
        <Summary prices={prices} />
      </Form>
    </CartStateProvider>
  );
};
