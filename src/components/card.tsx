import type { FC, PropsWithChildren } from 'react';

import { cn } from '@/lib/cn';

type CardAs = 'div' | 'section' | 'header' | 'footer' | 'span';

type CardVariant =
  | 'hero'
  | 'panel'
  | 'panelDark'
  | 'cta'
  | 'option'
  | 'optionSelected'
  | 'optionDark'
  | 'empty';

interface Props {
  as?: CardAs;
  className?: string;
  variant: CardVariant;
}

const variantClassNames: Record<CardVariant, string> = {
  hero: 'overflow-hidden bg-surface-inverse text-foreground-inverse',
  panel: 'border border-border bg-surface',
  panelDark: 'border border-surface-inverse bg-surface-inverse text-foreground-inverse shadow',
  cta: 'border border-border bg-surface shadow',
  option: 'border border-border bg-surface shadow transition duration-200',
  optionSelected: 'border border-accent bg-accent-muted shadow transition duration-200',
  optionDark: 'bg-foreground-inverse/10 px-4 py-3',
  empty: 'border border-dashed border-foreground-inverse/25 text-sm text-foreground-inverse/70',
};

export const Card: FC<PropsWithChildren<Props>> = ({ as = 'div', className, children, variant }) => {
  const Component = as;

  return (
    <Component className={cn('relative rounded-xl p-6', variantClassNames[variant], className)}>
      {children}
    </Component>
  );
};
