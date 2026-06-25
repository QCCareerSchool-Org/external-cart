import type { FC, PropsWithChildren } from 'react';

import { cn } from '@/lib/cn';

type CardAs = 'div' | 'section' | 'header' | 'footer' | 'span';

type CardVariant =
  | 'panelDark'
  | 'empty';

interface Props {
  as?: CardAs;
  variant?: CardVariant;
  className?: string;
}

const variantClassNames: Record<CardVariant, string> = {
  panelDark: 'border-surface-inverse bg-surface-inverse text-foreground-inverse shadow',
  empty: 'border-dashed border-foreground-inverse/25 text-sm text-foreground-inverse/70',
};

export const Card: FC<PropsWithChildren<Props>> = ({ as: Component = 'div', variant, className, children }) => (
  <Component className={cn('relative border border-border bg-surface rounded-xl p-6', variant ? variantClassNames[variant] : undefined, className)}>
    {children}
  </Component>
);
