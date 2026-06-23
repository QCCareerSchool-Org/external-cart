import { getCourse } from "@/domain/course";
import { CourseCode } from "@/domain/courseCode";
import { schools } from "@/domain/school";
import { SchoolSlug } from "@/domain/schoolSlug"
import { FC, PropsWithChildren } from "react";
import { Form } from "@/components/form";
import { Summary } from "../summary";
import { CartStateProvider } from "../cartState";
import { CourseSelection } from "../courseSelection";

interface Props {
  schoolSlug: SchoolSlug;
  courseCodes: Readonly<CourseCode[]>;
  successPage: string;
  countryCode: string;
  provinceCode: string | null;
  date: number;
}

export const Cart: FC<PropsWithChildren<Props>> = ({ schoolSlug, courseCodes, children }) => {
  const school = schools[schoolSlug];
  const courses = courseCodes.map(c => getCourse(c)).filter(c => c !== undefined);


  return (
    <CartStateProvider>
      <Form school={school} courses={courses}>
        {children}
        <CourseSelection />
        <Summary />
      </Form>
    </CartStateProvider>
  );
};
