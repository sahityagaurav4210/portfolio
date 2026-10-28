import React, { ReactNode } from 'react';

import HackerrankLogo from '../assets/hackerrank.png';
import LinkedinLogo from '../assets/linkedin.png';
import GithubLogo from '../assets/github.png';
import { ICodingProfileBanner } from '../interfaces';

function CodingProfileBanner({ hackerrankUrl, linkedInUrl }: Readonly<ICodingProfileBanner>): ReactNode {
  return (
    <>
      <p className='font-roboto p-2'>Find me on </p>
      <span className='flex items-center gap-x-2 cursor-pointer'>
        <button
          onClick={(_) => window.open(hackerrankUrl ?? 'https://hackerrank.com/sahityagaurav_41', '_blank', 'noopener,noreferrer')}
          className='bg-transparent'
        >
          <img src={HackerrankLogo} className='rounded-full' title='Hackerrank' alt='Hackerrank Logo' />
        </button>

        <button
          className='bg-transparent'
          onClick={(_) => window.open(linkedInUrl ?? import.meta.env.VITE_LINKEDIN_URL, '_blank', 'noopener,noreferrer')}
        >
          <img src={LinkedinLogo} className='rounded-full' title='Linkedin' alt='Linkedin Logo' />
        </button>

        <button
          className='bg-transparent'
          onClick={(_) => window.open('https://github.com/sahityagaurav4210', '_blank', 'noopener,noreferrer')}
        >
          <img src={GithubLogo} className='rounded-full' title='Github' alt='Github Logo' />
        </button>
      </span>
    </>
  );
}

export default React.memo(CodingProfileBanner);
