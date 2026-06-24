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
  hero: 'overflow-hidden bg-[#28180f] text-[#fff6e8] shadow-[0_24px_80px_rgba(50,31,18,0.22)]',
  panel: 'border border-[#d8c4a5] bg-[#fffaf1]/85 shadow-[0_18px_60px_rgba(69,43,24,0.12)] backdrop-blur',
  panelDark: 'border border-[#2a1a11] bg-[#2a1a11] text-[#fff6e8] shadow-[0_20px_70px_rgba(42,26,17,0.24)]',
  cta: 'border border-[#d8c4a5] bg-[#fffaf1]/90 shadow-[0_16px_50px_rgba(69,43,24,0.10)]',
  option: 'border border-[#dfccb0] bg-white/80 shadow-[0_10px_26px_rgba(71,44,25,0.08)] transition duration-200',
  optionSelected: 'border border-[#e36537] bg-[#fff2df] shadow-[0_16px_34px_rgba(227,101,55,0.18)] transition duration-200',
  optionDark: 'bg-[#fff6e8]/10',
  empty: 'border border-dashed border-[#fff6e8]/25 text-sm text-[#e6c9aa]',
};

export const Card: FC<PropsWithChildren<Props>> = ({ as = 'div', className, children, variant }) => {
  const Component = as;

  return (
    <Component className={cn('relative rounded-xl p-6', variantClassNames[variant], className)}>
      {children}
    </Component>
  );
};
