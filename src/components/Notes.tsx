import { ArrowBigRight } from 'lucide-react';
import { ReactNode } from 'react';
import { INoteProps } from '../interfaces/IContact';

function Notes({ note }: INoteProps): ReactNode {
  return (
    <div className='flex items-center mb-1 border w-max max-w-[19rem] lg:max-w-xl p-1 rounded-xl'>
      <ArrowBigRight className='mx-2 min-w-4' size={16} /> <span>{note}</span>
    </div>
  );
}

export default Notes;
