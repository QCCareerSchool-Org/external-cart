import type { FC, PropsWithChildren } from 'react';

import { cn } from '@/lib/cn';

type CardAs = 'div' | 'section' | 'header' | 'footer' | 'span';

type CardVariant =
  | 'hero'
  | 'panel'
  | 'panelDark'
  | 'option'
  | 'optionSelected'
  | 'empty';

interface Props {
  as?: CardAs;
  className?: string;
  variant?: CardVariant;
}

const variantClassNames: Record<CardVariant, string> = {
  hero: 'overflow-hidden bg-surface-inverse text-foreground-inverse',
  panel: 'border border-border bg-surface',
  panelDark: 'border border-surface-inverse bg-surface-inverse text-foreground-inverse shadow',
  option: 'border border-border bg-surface shadow transition duration-200',
  optionSelected: 'border border-accent bg-accent-muted shadow transition duration-200',
  empty: 'border border-dashed border-foreground-inverse/25 text-sm text-foreground-inverse/70',
};

export const Card: FC<PropsWithChildren<Props>> = ({ as = 'div', className, children, variant = 'panel' }) => {
  const Component = as;

  return (
    <Component className={cn('relative rounded-xl p-6', variantClassNames[variant], className)}>
      {children}
    </Component>
  );
};
