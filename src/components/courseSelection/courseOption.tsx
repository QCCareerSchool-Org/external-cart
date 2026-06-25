import type { FC, PropsWithChildren } from 'react';

import { Card } from '../card';
import { Marker } from './marker';
import { cn } from '@/lib/cn';

interface Props {
  selected: boolean;
}

const baseClassName = 'flex gap-4 p-4 shadow bg-surface transition duration-200';
const unSelectedClassName = cn(baseClassName, 'border-border group-hover:-translate-y-0.5 group-hover:border-primary');
const selectedClassName = cn(baseClassName, 'border-primary -translate-y-0.5');

export const CourseOption: FC<PropsWithChildren<Props>> = ({ selected, children }) => (
  <Card className={selected ? selectedClassName : unSelectedClassName}>
    <Marker selected={selected} />
    <div className="min-w-0 flex-1">
      {children}
    </div>
  </Card>
);
