import type { FC, PropsWithChildren } from 'react';

import { cn } from '@/lib/cn';

type SectionEyebrowTone = 'primary' | 'inverse';

interface Props {
  className?: string;
  tone?: SectionEyebrowTone;
}

const toneClassNames: Record<SectionEyebrowTone, string> = {
  primary: 'text-primary',
  inverse: 'text-foreground-inverse',
};

export const SectionEyebrow: FC<PropsWithChildren<Props>> = ({ children, className, tone = 'primary' }) => {
  return <p className={cn('text-xs font-bold uppercase tracking-[0.22em]', toneClassNames[tone], className)}>{children}</p>;
};
