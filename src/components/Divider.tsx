import React, { ReactNode } from 'react'
import { IDividerProps } from '../interfaces/IProps';

function Divider({ color }: IDividerProps): ReactNode {
    const bgColor = color || "bg-neutral-200";
    return (
        <div className={`mt-1 h-[2px] ${bgColor}`}></div>
    )
}

export default React.memo(Divider);