import { ReactNode } from 'react';
import Loader from '../../public/Loader.svg';

function Progress(): ReactNode {
  return (
    <>
      <div className='w-16 h-16'>
        <img src={Loader} className='aspect-square object-contain'></img>
      </div>
    </>
  );
}

export default Progress;
