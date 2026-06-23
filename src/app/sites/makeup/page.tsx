import { Cart } from "@/components/cart";
import { makeupCourseCodes } from "@/domain/makeup/courseCode";
import { getServerData } from "@/lib/getServerData";
import { PageComponent } from "@/serverComponent";

const MakeupPage: PageComponent = async () => {
  const { countryCode, provinceCode, date } = await getServerData();

  return (
    <>
      <h1>Makeup</h1>
      <Cart
        schoolSlug="makeup"
        courseCodes={makeupCourseCodes}
        successPage="https://www.qcmakeupacademy.com/welcome-to-the-school"
        countryCode={countryCode}
        provinceCode={provinceCode}
        date={date}
      />
    </>
  );
};

export default MakeupPage;