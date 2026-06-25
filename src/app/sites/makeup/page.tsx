import { Card } from '@/components/card';
import { Cart } from '@/components/cart';
import { Container } from '@/components/container';
import { Pill } from '@/components/pill';
import { makeupCourses } from '@/domain/makeup/course';
import { getServerData } from '@/lib/getServerData';
import type { PageComponent } from '@/serverComponent';

const MakeupPage: PageComponent = async () => {
  const { countryCode } = await getServerData();

  return (
    <main className="min-h-screen">
      <Container>
        <div className="flex flex-col gap-6 py-6">
          <Card as="header" variant="hero">
            <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-primary opacity-80 blur-2xl" />
            <div className="absolute bottom-0 right-24 h-28 w-56 rotate-[-18deg] rounded-full bg-primary/30 blur-xl" />
            <div className="relative max-w-2xl">
              <Pill className="mb-5">QC Makeup Academy</Pill>
              <h1>Build your course cart.</h1>
              <p className="mt-5 max-w-xl text-foreground-inverse/75 sm:text-xl font-light">Select the programs you want, review your total, and continue to Shopify checkout when everything looks right.</p>
            </div>
          </Card>
          <Cart courses={makeupCourses} countryCode={countryCode} />
        </div>
      </Container>
    </main>
  );
};

export default MakeupPage;
