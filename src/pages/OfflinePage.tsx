import { ReactNode } from 'react';
import Navbar from '../components/Navbar';
import { menuItems } from '../data';
import Socket from '../assets/socket.webp';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { useInView } from 'react-intersection-observer';
import BackToTopButton from '../components/core/BackToTopButton';

function OfflinePage(): ReactNode {
  const { ref, inView } = useInView({ threshold: 0.4 });
  const navigate = useNavigate();
  return (
    <div className='min-h-screen flex flex-col bg-gray-100 text-gray-800'>
      {/* Navbar */}
      <Navbar menuItems={menuItems} />

      {/* Main Content */}
      <div className='flex-grow flex items-center justify-center'>
        <div className='text-center font-roboto  p-8 max-w-xs lg:max-w-lg'>
          <h1 className='font-roboto text-2xl lg:text-4xl font-extrabold text-red-500 mb-4 underline underline-offset-4 decoration-dashed'>
            CONNECTION LOST
          </h1>
          <img
            src={Socket}
            alt='Fallback text'
            className='my-4 cursor-none pointer-events-none rounded-lg shadow-lg shadow-zinc-800'
          ></img>
          <p className='text-xs text-justify text-gray-600 mb-6'>
            Ah, we lost connection from our backend servers. We kindly request you to please click on the button below
            once. We're sorry for the inconvenience caused to you.
          </p>
          <button
            onClick={() => navigate('/')}
            className='rounded-md transition-all scale-95 hover:scale-100 bg-orange-50 hover:bg-orange-600 focus:bg-orange-600 focus:scale-100 focus:text-white outline-none p-2 text-md text-orange-600 hover:text-white shadow-md shadow-orange-200 font-bold ring-2 ring-orange-400 ring-offset-2'
          >
            Reload Page
          </button>
        </div>
      </div>

      <div ref={ref}>
        <Footer />
      </div>

      <BackToTopButton isVisible={inView} uri='/offline' />
    </div>
  );
}

export default OfflinePage;
