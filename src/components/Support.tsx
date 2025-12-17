import { BadgeHelp } from 'lucide-react';
import React, { ReactNode } from 'react';
import { ISupport } from '../interfaces';

function Support({ lastModifiedDate }: Readonly<ISupport>): ReactNode {
  return (
    <div className='container mx-auto font-roboto'>
      <div className='flex p-1 items-center'>
        <span className='mx-1'>
          <BadgeHelp size={12} />
        </span>{' '}
        <p className='text-xs'>
          For any support and queries please{' '}
          <a
            href='mailto:works.sahitya@gmail.com'
            className='underline decoration-dashed decoration-blue-800 text-blue-800'
          >
            click here.
          </a>
        </p>
      </div>

      <div className='flex justify-end p-1'>
        <p className='font-roboto text-xs'>Last modified at : {new Date(lastModifiedDate).toLocaleString('hi-In')}</p>
      </div>
    </div>
  );
}

export default React.memo(Support);
