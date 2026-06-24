'use client';

import type { FC } from 'react';

import styles from './footer.module.css';
import { Container } from '@/components/container';
import { gbpCountry } from '@/domain/currency';
import { telephoneNumber } from '@/lib/telephone';

interface Props {
  countryCode: string;
}

export const Footer: FC<Props> = ({ countryCode }) => {
  const tel = telephoneNumber(countryCode);

  const termsLink = gbpCountry(countryCode)
    ? 'https://www.qcmakeupacademy.com/terms-gb.html'
    : 'https://www.qcmakeupacademy.com/terms.html';

  return (
    <footer className={styles.footer}>
      <Container>
        <div className="py-6">
          <div className="flex flex-row gap-3">
            <span>&copy; {new Date().getFullYear()} QC Makeup Academy</span>
            <span><a target="_blank" rel="noopener noreferrer" href={termsLink}>Privacy Policy</a></span>
            <span><a href={`tel:${tel}`}>{tel}</a></span>
            <span><a target="_blank" rel="noreferrer" href="https://www.bbb.org/ca/on/ottawa/profile/correspondence-schools/qc-career-school-0117-4175">BBB Accredited A+</a></span>
          </div>
        </div>
      </Container>
    </footer>
  );
};
