import type { FC, PropsWithChildren } from 'react';

import { cn } from '@/lib/cn';

interface Props {
  className?: string;
}

const baseClassName = 'inline-flex rounded-full text-primary border border-primary px-3 py-1 text-xs font-bold uppercase tracking-[0.28em]';

export const Pill: FC<PropsWithChildren<Props>> = ({ className, children }) => {
  return (
    <p className={cn(baseClassName, className)}>{children}</p>
  );
};
