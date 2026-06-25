import type { FC, PropsWithChildren } from 'react';

import { cn } from '@/lib/cn';

type CardAs = 'div' | 'section' | 'header' | 'footer' | 'span';

type CardVariant =
  | 'panel'
  | 'panelDark'
  | 'option'
  | 'optionSelected'
  | 'empty';

interface Props {
  as?: CardAs;
  variant?: CardVariant;
  className?: string;
}

const variantClassNames: Record<CardVariant, string> = {
  panel: 'border-border bg-surface',
  panelDark: 'border-surface-inverse bg-surface-inverse text-foreground-inverse shadow',
  option: 'border-border bg-surface shadow transition duration-200',
  optionSelected: 'border-primary bg-primary-muted shadow transition duration-200',
  empty: 'border-dashed border-foreground-inverse/25 text-sm text-foreground-inverse/70',
};

export const Card: FC<PropsWithChildren<Props>> = ({ as: Component = 'div', variant = 'panel', className, children }) => (
  <Component className={cn('border relative rounded-xl p-6', variantClassNames[variant], className)}>
    {children}
  </Component>
);
