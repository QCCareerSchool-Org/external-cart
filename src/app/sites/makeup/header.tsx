'use client';

import Image from 'next/image';
import type { FC } from 'react';
import { FaPhone } from 'react-icons/fa6';

import Logo from './logo.svg';
import { Container } from '@/components/container';
import { telephoneNumber } from '@/lib/telephone';

const backgroundColor = '#252525';

interface Props {
  countryCode: string;
}

export const Header: FC<Props> = ({ countryCode }) => {
  const tel = telephoneNumber(countryCode);

  return (
    <header className="text-white" style={{ backgroundColor }}>
      <Container>
        <div className="py-6">
          <div className="flex flex-row justify-between gap-4">
            <div><a href="https://www.qcmakeupacademy.com/"><Image src={Logo} priority className="img-fluid" alt="QC Makeup Academy" style={{ width: 'auto', height: 32 }} /></a></div>
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
