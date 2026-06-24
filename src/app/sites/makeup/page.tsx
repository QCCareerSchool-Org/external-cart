import { Cart } from "@/components/cart";
import { makeupCourses } from "@/domain/makeup/course";
import { getSchool } from "@/domain/school";
import { getServerData } from "@/lib/getServerData";
import { PageComponent } from "@/serverComponent";

const MakeupPage: PageComponent = async () => {
  const { countryCode, provinceCode, date } = await getServerData();

  return (
    <Cart
      school={getSchool('makeup')}
      courses={makeupCourses}
      successPage="https://www.qcmakeupacademy.com/welcome-to-the-school"
      countryCode={countryCode}
      provinceCode={provinceCode}
      date={date}
    />
  );
};

export default MakeupPage;
