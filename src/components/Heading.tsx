import { ReactNode } from 'react';
import { IHeadingProps } from '../interfaces';

function Heading({ headingName, className = '' }: IHeadingProps): ReactNode {
  return (
    <div className={`grid lg:grid-cols-3 place-items-center mx-2 ${className}`}>
      <div className='hidden lg:block lg:w-full h-2 bg-orange-500'></div>
      <h1
        className={`text-center text-5xl lg:text-7xl font-roboto font-extrabold text-orange-500 underline underline-offset-8 decoration-dashed decoration-orange-500/55`}
      >
        {headingName}
      </h1>
      <div className='hidden lg:block lg:w-full h-2 bg-orange-500'></div>
    </div>
  );
}

export default Heading;
