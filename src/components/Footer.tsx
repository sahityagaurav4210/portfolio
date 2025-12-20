import React from 'react';
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

function Footer() {
  return (
    <section className='overflow-hidden bg-gradient-to-tr from-indigo-950 to-blue-950 via-zinc-900 py-4 text-xs px-1 sm:px-0 font-bold font-roboto'>
      <div className='grid lg:grid-cols-3 text-zinc-200 mb-1'>
        <div className='sm:p-1 lg:border-r text-center'>
          <p className='flex justify-center items-center'>
            Made in{' '}
            <span className='font-extrabold text-white flex items-center'>
              &nbsp;
              <span className='text-orange-600'>भा</span>
              <span className='text-white'>र</span>
              <span className='text-green-600'>त</span>
              &nbsp;
              <img src='/ind.svg' alt='Indian Flag' width={16} height={16} />
            </span>{' '}
            &nbsp; || &copy; Gaurav Sahitya || All rights are reserved
          </p>
        </div>
        <div className='p-1 flex items-center justify-center lg:border-r flex-col'>
          <div>
            <a
              href={import.meta.env.VITE_PBADMIN_URL}
              target='_blank'
              className='mx-1 underline decoration-dashed underline-offset-2 uppercase'
            >
              CMS Portal
            </a>
          </div>
        </div>
        <div className='p-1 mt-1 lg:mt-0 flex justify-evenly items-center'>
          <FaLinkedin
            size={24}
            onClick={() => window.open(import.meta.env.VITE_LINKEDIN_URL, '_blank')}
            className='hover:cursor-pointer'
          />
          <FaInstagram
            size={24}
            onClick={() => window.open(import.meta.env.VITE_INSTAGRAM_URL, '_blank')}
            className='hover:cursor-pointer'
          />
          <FaTwitter
            size={24}
            onClick={() => window.open(import.meta.env.VITE_TWITTER_URL, '_blank')}
            className='hover:cursor-pointer'
          />
        </div>
      </div>

      <div>
        <p className='mt-1 text-white text-center'>
          Content of this website is being owned and maintained by Gaurav Sahitya.
        </p>
      </div>
    </section>
  );
}

export default React.memo(Footer);
