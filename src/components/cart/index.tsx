import { Course, getCourse } from "@/domain/course";
import { CourseCode } from "@/domain/courseCode";
import { School, schools } from "@/domain/school";
import { SchoolSlug } from "@/domain/schoolSlug"
import { FC, PropsWithChildren } from "react";
import { Form } from "@/components/form";
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

export const Cart: FC<PropsWithChildren<Props>> = ({ school, courses, children }) => (
  <CartStateProvider>
    <Form school={school} courses={courses}>
      {children}
      <CourseSelection courses={courses} />
      <Summary />
    </Form>
  </CartStateProvider>
);
