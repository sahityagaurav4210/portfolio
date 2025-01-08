import React from 'react';
import { DollarSign, Download, Menu, X } from 'lucide-react';
import { INavbarProps } from '../interfaces/INavbar';
import Logo from './Logo';

const Navbar: React.FC<INavbarProps> = ({ menuItems, url, disabled = false }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

  const toggleMenu = () => {
    if (!disabled) setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='sticky top-0 left-0 z-20 w-full bg-zinc-50/55 backdrop-blur-md backdrop-brightness-100 border-b-2 border-dashed border-blue-200'>
      <div className='mx-auto flex container items-center justify-between p-4 sm:px-6 lg:px-8  '>
        <Logo />
        <div className='hidden xl:block'>
          <ul className='inline-flex space-x-4'>
            {!disabled && menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className='text-xl font-semibold p-3 hover:bg-blue-800 hover:text-white rounded-md text-blue-800'
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className='hidden xl:flex'>
          <a
            href='#hireme'
            className='rounded-md mx-4 flex transition-all scale-95 hover:scale-105 bg-blue-800 hover:bg-slate-100 p-4 text-md text-white hover:text-blue-800 shadow-md shadow-blue-200 font-bold ring-2 ring-blue-400 ring-offset-1'
          >
            <DollarSign className='mx-1' /> Hire Me
          </a>

          <a
            href={url}
            target='_blank'
            className='rounded-md flex transition-all scale-95 hover:scale-105 bg-orange-50 hover:bg-orange-600 p-4 text-md text-orange-600 hover:text-white shadow-md shadow-orange-200 font-bold ring-2 ring-orange-400 ring-offset-2'
            download={'Gaurav_Sahitya_2YOE_Backend_CV.pdf'}
          >
            <Download className='mx-1' /> Resume
          </a>
        </div>
        <div className='xl:hidden'>
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
                        className='flex items-center border-t-2 border-l-2 border-indigo-800 shadow-sm shadow-violet-400 rounded-md p-2 font-semibold outline-none'
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className='ml-3 font-bold text-lg'>{item.name?.toUpperCase()}</span>
                      </a>
                    ))}
                  </nav>
                </div>
                <div className='grid grid-cols-2 gap-x-4 mt-4 p-2'>
                  <a
                    href='#hireme'
                    className='flex items-center justify-center text-center rounded-md bg-blue-800 px-3 py-2 text-lg font-semibold text-white shadow-sm ring-2 ring-offset-2 ring-blue-400'
                  >
                    <DollarSign className='mx-1' />
                    Hire Me
                  </a>
                  <a
                    href={url}
                    target='_blank'
                    className='flex items-center justify-center text-center rounded-md bg-orange-600 px-3 py-2 text-lg font-semibold text-white shadow-sm ring-2 ring-offset-2 ring-orange-400'
                    download={'Gaurav_Sahitya_2YOE_Backend_CV.pdf'}
                  >
                    <Download className='mx-1' />
                    Resume
                  </a>
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
