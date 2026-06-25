import type { ButtonHTMLAttributes, FC } from 'react';

import { cn } from '@/lib/cn';

type ButtonVariant = 'primary' | 'inverse';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const baseClassName = 'inline-flex items-center justify-center rounded-full px-7 py-4 text-sm font-black uppercase tracking-[0.18em] shadow transition hover:-translate-y-0.5 hover:brightness-95 disabled:cursor-not-allowed disabled:bg-border disabled:shadow-none';

const variantClassNames: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-foreground-inverse',
  inverse: 'bg-foreground-inverse text-surface-inverse',
};

export const Button: FC<Props> = ({ className, variant = 'primary', ...props }) => {
  return (
    <button className={cn(baseClassName, variantClassNames[variant], className)} {...props} />
  );
};
