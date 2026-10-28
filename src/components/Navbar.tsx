import React from 'react';
import { Download, Menu, X } from 'lucide-react';
import { INavbarProps } from '../interfaces/INavbar';
import Logo from './Logo';
import { ApiController } from '../api';
import { toast } from 'react-toastify';
import { getAppToastConfig } from '../config';

const Navbar: React.FC<INavbarProps> = ({ menuItems, heroSection }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);
  const [isDownloading, setIsDownloading] = React.useState<boolean>(false);

  async function handleResumeDownload() {
    setIsDownloading(true);

    const apiController = new ApiController();
    const url = `${import.meta.env.VITE_BACKEND_BASE_URL}/baas/files/download-resume`;
    const resumeUrl = await apiController.download(url);
    setIsDownloading(false);

    if (resumeUrl) {
      const link = document.createElement('a');

      link.href = resumeUrl;
      link.download = 'Gaurav Sahitya CV.pdf';
      document.body.appendChild(link);

      link.click();
      link.remove();
    } else {
      toast.error('Failed to download resume. Please try again later.', getAppToastConfig());
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className='sticky top-0 left-0 z-20 w-full bg-zinc-50/55 backdrop-blur-md backdrop-brightness-100 border-b-2 border-dashed border-blue-200'>
      <div className='mx-auto flex container lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl items-center justify-between py-4 px-4 xl:px-1'>
        <Logo designation={heroSection?.designation} displayName={heroSection?.displayName} />
        <div className='hidden lg:block'>
          <ul className='inline-flex space-x-2'>
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href as string}
                  hrefLang='en-US'
                  className='font-roboto text-xl font-semibold p-2 hover:bg-blue-800 hover:text-white rounded-md text-blue-800'
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className='hidden lg:flex'>
          <button
            className='rounded-md flex transition-all scale-95 hover:scale-105 bg-orange-50 hover:bg-orange-600 p-4 text-md text-orange-600 hover:text-white shadow-md shadow-orange-200 font-bold ring-2 ring-orange-400 ring-offset-2 hover:cursor-pointer aria-disabled:bg-slate-700 aria-disabled:text-gray-200 aria-disabled:ring-slate-800'
            onClick={handleResumeDownload}
            aria-disabled={isDownloading}
            disabled={isDownloading}
          >
            <Download className='mx-1' /> {isDownloading ? 'Downloading...' : 'Resume'}
          </button>
        </div>
        <div className='lg:hidden'>
          <Menu onClick={toggleMenu} className='h-6 w-6 cursor-pointer' />
        </div>

        {isMenuOpen && (
          <div className='absolute font-roboto inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden'>
            <div className='rounded-lg bg-zinc-50 ring-1 ring-offset-1 ring-blue-400 shadow-md outline-none shadow-blue-900 border border-blue-600 border-dashed'>
              <div className='px-5 pb-6 pt-5'>
                <div className='flex items-center justify-between'>
                  <Logo />
                  <div className='-mr-2 -mt-4'>
                    <button
                      type='button'
                      onClick={toggleMenu}
                      className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'
                    >
                      <span className='sr-only'>Close menu</span>
                      <X className='h-8 w-8 text-red-600' aria-hidden='true' />
                    </button>
                  </div>
                </div>

                <div className='mt-4'>
                  <nav className='grid gap-y-3'>
                    {menuItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        hrefLang='en-US'
                        className='flex items-center border-t-2 border-l-2 border-indigo-800 shadow-sm shadow-violet-400 rounded-md p-2 font-semibold outline-none'
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className='ml-3 font-bold text-lg'>{item.name?.toUpperCase()}</span>
                      </a>
                    ))}
                  </nav>
                </div>

                <div className='grid grid-cols-1 gap-x-4 mt-4 p-2'>
                  <button
                    onClick={handleResumeDownload}
                    aria-disabled={isDownloading}
                    disabled={isDownloading}
                    className='flex items-center justify-center text-center rounded-md bg-orange-600 px-3 py-2 text-lg font-semibold text-white shadow-sm ring-2 ring-offset-2 ring-orange-400 aria-disabled:bg-slate-700 aria-disabled:text-gray-200 aria-disabled:ring-slate-800'
                  >
                    <Download className='mx-1' />
                    {isDownloading ? 'Downloading...' : 'Resume'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Navbar);
