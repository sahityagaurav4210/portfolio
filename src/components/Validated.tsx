import { CircleCheck } from 'lucide-react';
import { memo, ReactNode } from 'react';

function Validated(): ReactNode {
  return (
    <div className='flex min-w-4 max-w-max border p-2 font-bold bg-emerald-800 text-emerald-50 items-center rounded-md border-emerald-500 ring-1 ring-offset-1 ring-emerald-400 m-2 mx-3'>
      <span className='mx-1'>
        <CircleCheck />
      </span>
      <p className='text-sm lg:text-lg font-roboto'>Captcha Verified</p>
    </div>
  );
}

export default memo(Validated);
