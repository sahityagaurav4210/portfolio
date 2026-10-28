import React, { ReactNode } from 'react';
import Captcha from './Captcha';
import { ICaptchaProps } from '../interfaces/ICaptcha';

export function CaptchaSection(props: ICaptchaProps): ReactNode {
  return (
    <>
      <p className='text-sm lg:text-base text-justify leading-10 uppercase text-blue-700 font-extrabold underline underline-offset-2 my-1'>
        Please prove your identity
      </p>

      <Captcha {...props} />
    </>
  );
}

const MemoizedCaptchaSection = React.memo(CaptchaSection);
export default MemoizedCaptchaSection;
