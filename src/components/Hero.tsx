import { useEffect, useState } from 'react';
import User from '../assets/user.png';
import { Client, Storage } from 'appwrite';

function Hero() {
  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    async function getFilePreviewAsync(bucketId: string, fileId: string): Promise<URL> {
      return new Promise((resolve, reject) => {
        const client = new Client();

        client.setEndpoint(import.meta.env.VITE_APPWRITE_URL);
        client.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

        const storage = new Storage(client);

        const filePreview = storage.getFilePreview(bucketId, fileId);

        if (filePreview) {
          resolve(filePreview);
        } else reject('An error ocurred');
      });
    }
    async function getFile(fileId: string) {
      const filePreview = await getFilePreviewAsync(import.meta.env.VITE_APPWRITE_BUCKET_ID, fileId);
      if (filePreview && typeof filePreview === 'object') {
        const src =
          filePreview.protocol +
          '//' +
          filePreview.hostname +
          filePreview.pathname +
          filePreview.search +
          '&mode=admin';
          
        setUrl(src);
      }
    }

    getFile(import.meta.env.VITE_APPWRITE_FILE_ID);
  }, []);

  return (
    <>
      <div className='relative isolate z-0 bg-white px-6 pt-14 lg:px-8'>
        <div className='relative mx-auto max-w-2xl py-24'>
          <div className='absolute inset-x-0 -top-[4rem] -z-10 transform-gpu overflow-hidden blur-3xl md:-top-[10rem]'>
            <svg
              className='relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]'
              viewBox='0 0 1155 678'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill='url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)'
                fillOpacity='.3'
                d='M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z'
              ></path>
              <defs>
                <linearGradient
                  id='45de2b6b-92d5-4d68-a6a0-9b9b2abad533'
                  x1='1155.49'
                  x2='-78.208'
                  y1='.177'
                  y2='474.645'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stopColor='#9089FC'></stop>
                  <stop offset='1' stopColor='#FF80B5'></stop>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className='text-center'>
            <div className='flex items-center justify-center'>
              {!url ? (
                <img src={User} alt='photo' className='rounded-full object-cover aspect-square mb-5 w-64 h-64' />
              ) : (
                <img
                  src={url}
                  alt='photo'
                  className='rounded-full object-cover aspect-square mb-5 w-64 h-64 border-2 border-blue-400 ring-2 ring-offset-1 ring-blue-500 shadow-inner scale-95 hover:scale-105'
                />
              )}
            </div>
            <h1 className='text-3xl lg:text-6xl font-bold font-roboto text-black sm:text-6xl'>
              Hello, I am
              <span className='text-blue-800 font-bold'> Gaurav Sahitya.</span>
            </h1>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              I am a backend developer having almost 2 years of experience in the same. I also possess a good knowledge
              and 5+ months of experience of front-end technology as well.
            </p>
            <div className='mt-10 flex items-center justify-center gap-x-2'>
              <a
                href='tel:+91-8837573143'
                className='rounded-md transition-all bg-blue-800 p-4 text-md font-semibold text-white shadow-sm shadow-blue-200 ring-2 ring-offset-1 ring-blue-500 mx-4 scale-95 hover:scale-105 hover:bg-white hover:text-blue-800'
              >
                Contact Me
              </a>
              <a
                href='#projects'
                className='rounded-md transition-all bg-orange-100 p-4 text-md font-semibold text-orange-800 shadow-sm shadow-orange-400 ring-2 ring-offset-1 ring-orange-400 focus-within:scale-95 hover:bg-orange-800 hover:text-white scale-95 hover:scale-105'
              >
                View my projects
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Hero;
