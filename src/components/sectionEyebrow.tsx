import type { FC, PropsWithChildren } from 'react';

import { cn } from '@/lib/cn';

type SectionEyebrowTone = 'light' | 'dark';

interface Props {
  className?: string;
  tone?: SectionEyebrowTone;
}

const toneClassNames: Record<SectionEyebrowTone, string> = {
  light: 'text-accent',
  dark: 'text-highlight',
};

export const SectionEyebrow: FC<PropsWithChildren<Props>> = ({ children, className, tone = 'light' }) => {
  return <p className={cn('text-xs font-bold uppercase tracking-[0.22em]', toneClassNames[tone], className)}>{children}</p>;
};
