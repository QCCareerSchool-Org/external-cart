import type { CourseCode } from "./courseCode";
import type { SerializedPrice } from "./price";

export type CoursePriceMap = Partial<Record<CourseCode, SerializedPrice>>;
