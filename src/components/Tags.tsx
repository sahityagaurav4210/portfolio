import { ReactNode } from 'react';
import { ITagsProps } from '../interfaces';

function Tags({ labelName, content }: Readonly<ITagsProps>): ReactNode {
  return (
    <div>
      <p className='text-sm px-2 mb-1 text-blue-800 font-roboto font-bold'>{labelName}</p>
      <h1 className='font-bold font-roboto text-lg border-r-2 border-b-2 border-blue-950 p-2 shadow-sm shadow-blue-600 rounded-md text-orange-600'>
        {content}
      </h1>
    </div>
  );
}

export default Tags;
