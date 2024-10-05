import { ArrowBigRight } from 'lucide-react';
import { ReactNode } from 'react';
import { INoteProps } from '../interfaces/IContact';

function Notes({ note }: INoteProps): ReactNode {
  return (
    <div className='flex items-center mb-1 w-max max-w-[19rem] sm:max-w-xs lg:max-w-xl p-1 '>
      <ArrowBigRight className='mx-2 min-w-4' size={16} /> <span>{note}</span>
    </div>
  );
}

export default Notes;
