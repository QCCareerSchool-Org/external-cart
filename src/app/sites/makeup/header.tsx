'use client';

import Image from 'next/image';
import type { FC } from 'react';
import { FaPhone } from 'react-icons/fa6';

import LogoIcon from './logo.svg';
import { Container } from '@/components/container';
import { telephoneNumber } from '@/lib/telephone';

interface Props {
  countryCode: string;
}

export const Header: FC<Props> = ({ countryCode }) => {
  const tel = telephoneNumber(countryCode);

  return (
    <header className="bg-surface-inverse text-foreground-inverse">
      <Container>
        <div className="py-6">
          <div className="flex flex-row justify-between gap-4">
            <div><a href="https://www.qcmakeupacademy.com/"><Image src={LogoIcon} height="32" alt="QC Makeup Academy" priority /></a></div>
            <div className="flex flex-row items-center gap-3">
              <div><a title="Click to Call" href={'tel:' + tel}><FaPhone size={16} /></a></div>
              <div className="hidden md:block text-lg"><a href={'tel:' + tel}>{tel}</a></div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};
