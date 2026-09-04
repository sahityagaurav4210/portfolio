import React, { ReactNode } from 'react';
import { IWarning } from '../interfaces/IWarning';
import { CiSquareInfo } from 'react-icons/ci';

function Info({ text }: Readonly<IWarning>): ReactNode {
  return (
    <div className='mt-2 bg-blue-200 border border-blue-600 ring-2 ring-blue-400 border-spacing-4 ring-offset-1 p-1 rounded-md flex gap-x-1 justify-center flex-col text-xs'>
      <div className='font-bold inline-flex items-center text-blue-900'>
        <CiSquareInfo size={16} />
        <p>Info</p>
      </div>

      <p className='text-justify text-xs'>{text}</p>
    </div>
  );
}

export default React.memo(Info);
