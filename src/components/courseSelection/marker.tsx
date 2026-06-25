import type { FC, PropsWithChildren } from 'react';

import { cn } from '@/lib/cn';

interface Props {
  selected: boolean;
}

const baseClassName = 'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-xs font-black transition';
const unselectedclassName = cn(baseClassName, 'border-border bg-surface text-transparent');
const selectedClassName = cn(baseClassName, 'border-primary bg-primary text-foreground-inverse');

export const Marker: FC<PropsWithChildren<Props>> = ({ selected }) => (
  <div className={selected ? selectedClassName : unselectedclassName}>✓</div>
);
