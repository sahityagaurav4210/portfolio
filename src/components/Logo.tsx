import React from 'react';
import { ILogo } from '../interfaces';

function Logo({ displayName, designation }: Readonly<ILogo>) {
  return (
    <div className='flex flex-col items-center'>
      <a
        href='/'
        className='font-bold font-roboto italic text-3xl md:text-4xl text-blue-800 cursor-pointer underline decoration-dashed underline-offset-8 decoration-blue-900/75'
      >
        {displayName}
      </a>
      <span className='font-bookman font-bold mt-2 tracking-widest text-xs text-orange-700'>{designation}</span>
    </div>
  );
}

export default React.memo(Logo);
