import { ReactNode, useRef } from 'react';
import { IHeadingProps } from '../interfaces';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

function SimpleHeading({ headingName, className = '' }: Readonly<IHeadingProps>): ReactNode {
  const divStyle = `mx-2 ${className}`;
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useGSAP(
    function () {
      gsap.from(headingRef.current, { opacity: 0, delay: 0.218, duration: 5 });
    },
    [headingRef]
  );

  return (
    <div className={divStyle}>
      <h1
        className='text-center text-5xl lg:text-7xl font-roboto font-extrabold text-orange-500 underline underline-offset-8 decoration-dashed decoration-orange-500/55'
        ref={headingRef}
      >
        {headingName}
      </h1>
    </div>
  );
}

export default SimpleHeading;
