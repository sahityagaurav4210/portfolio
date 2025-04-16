import { ReactNode } from 'react';
import { IHeadingProps } from '../interfaces';

function SimpleHeading({ headingName, className = '' }: IHeadingProps): ReactNode {
  return (
    <div className={`mx-2 ${className}`}>
      <h1
        className={`text-center text-5xl lg:text-7xl font-roboto font-extrabold text-orange-500 underline underline-offset-8 decoration-dashed decoration-orange-500/55`}
      >
        {headingName}
      </h1>
    </div>
  );
}

export default SimpleHeading;
