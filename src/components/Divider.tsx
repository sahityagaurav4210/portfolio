import React, { ReactNode } from 'react';
import { IDividerProps } from '../interfaces/IProps';

function Divider({ color, my }: Readonly<IDividerProps>): ReactNode {
  const bgColor = color || 'bg-neutral-200';
  const marginY = my ? `my-${my}` : 'my-0';

  return <div className={`h-[2px] ${bgColor} ${marginY}`}></div>;
}

export default React.memo(Divider);
