import type { ButtonHTMLAttributes, FC } from 'react';

import { cn } from '@/lib/cn';

type ButtonVariant = 'primary' | 'inverse' | 'light';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const baseClassName = 'inline-flex items-center justify-center rounded-full px-7 py-4 text-sm font-black uppercase tracking-[0.18em] enabled:shadow transition enabled:hover:-translate-y-0.5 enabled:hover:brightness-95 disabled:cursor-not-allowed';

const variantClassNames: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-foreground-inverse disabled:bg-primary-muted disabled:text-foreground-inverse',
  inverse: 'bg-background-inverse text-foreground-inverse disabled:bg-muted',
  light: 'bg-background text-foreground disabled:bg-muted',
};

export const Button: FC<Props> = ({ className, variant = 'primary', ...props }) => {
  return (
    <button className={cn(baseClassName, variantClassNames[variant], className)} {...props} />
  );
};
