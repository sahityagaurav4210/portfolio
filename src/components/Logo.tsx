import { Code, Code2 } from 'lucide-react';
import { ILogo } from '../interfaces/INavbar';

function Logo({ logoSize }: ILogo) {
  function handleIconSize(size: number): number {
    if (size < 1000) return 32;
    else return 64;
  }

  return (
    <>
      <div className='inline-flex items-center space-x-2 underline underline-offset-8 decoration-dashed decoration-blue-800/50'>
        <span>
          <Code size={handleIconSize(logoSize)} color='#1e40af' />
        </span>
        <span className='font-bold font-roboto italic text-3xl md:text-5xl text-blue-800'>
          Gaurav <span className='text-blue-800/75'>S.</span>
        </span>
        <span>
          <Code2 size={handleIconSize(logoSize)} color='#1e40af' />
        </span>
      </div>
    </>
  );
}

export default Logo;
