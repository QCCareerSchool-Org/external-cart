import type { FC, PropsWithChildren } from 'react';

export const SummarySection: FC<PropsWithChildren> = ({ children }) => (
  <div className="mt-5 border-t border-foreground/20 pt-5">
    {children}
  </div>
);
