import type { FC, PropsWithChildren } from 'react';

import { cn } from '@/lib/cn';

type CardAs = 'div' | 'section' | 'header' | 'footer' | 'span';

interface Props {
  as?: CardAs;
  inverse?: boolean;
  className?: string;
}

const baseClassName = 'relative border border-border bg-surface rounded-md p-6';
const inverseClassName = cn(baseClassName, 'border-surface-inverse bg-surface-inverse text-foreground-inverse');

export const Card: FC<PropsWithChildren<Props>> = ({ as: Component = 'div', inverse, className, children }) => (
  <Component className={cn(inverse ? inverseClassName : baseClassName, className)}>
    {children}
  </Component>
);
