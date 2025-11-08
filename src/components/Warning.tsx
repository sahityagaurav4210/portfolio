import React, { ReactNode } from 'react'
import { CiWarning } from 'react-icons/ci';
import { IWarning } from '../interfaces/IWarning';

function Warning({ text }: IWarning): ReactNode {
  return (
    <div className="mt-2 bg-amber-200 border border-amber-600 ring-2 ring-amber-400 border-spacing-4 ring-offset-1 p-1 rounded-md flex gap-x-1 justify-center flex-col text-xs">
      <div className='font-bold inline-flex items-center text-orange-900'>
        <CiWarning size={16} />
        <p>Warning</p>
      </div>

      <p className='text-justify text-xs'>{text}</p>
    </div>
  )
}

export default React.memo(Warning);