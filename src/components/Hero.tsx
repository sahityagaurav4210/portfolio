import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { IAnalytics, IHeroProps } from '../interfaces';
import { SKILLS } from '../constants';
import Typewriter from 'typewriter-effect';
import { BookUser, BriefcaseBusiness } from 'lucide-react';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ComponentLoader from './ComponentLoader';
import CodingProfileBanner from './CodingProfileBanner';
import { profile } from '../data';

function Hero({ url }: Readonly<IHeroProps>): ReactNode {
  const nameRef = useRef<HTMLHeadingElement | null>(null);
  const [isPhotoLoaded, setIsPhotoLoaded] = useState<boolean>(false);
  const [fallBackImgUrl, setFallBackImgUrl] = useState<string | null>();
  const [counter, setCounter] = useState<number>(0);
  const [analytics, setAnalytics] = useState<IAnalytics>({
    totalGithubContributions: 0,
    questionSolved: 0,
    experience: 0,
    projects: 0,
  });

  useGSAP(() => {
    gsap.from(nameRef.current, { opacity: 0, delay: 0.218, duration: 5 });
    gsap.from('.hand', { rotate: 60, delay: 0.218, duration: 1.56 });
  });

  useEffect(() => {
    const intervalHandle = setInterval(() => {
      if (
        analytics.experience <= 3 ||
        analytics.projects <= 5 ||
        analytics.questionSolved <= 300 ||
        analytics.totalGithubContributions <= 352
      )
        setAnalytics((previous) => ({
          totalGithubContributions:
            previous.totalGithubContributions < 352 ? previous.totalGithubContributions + 1 : 352,
          questionSolved: previous.questionSolved < 300 ? previous.questionSolved + 1 : 300,
          experience: previous.experience < 3 ? previous.experience + 1 : 3,
          projects: previous.projects < 5 ? previous.projects + 1 : 5,
        }));
      else clearInterval(intervalHandle);
    }, 10);

    async function loadImg() {
      const image = (await import('../assets/user.png')).default;
      setFallBackImgUrl(image);
    }

    loadImg();
    return () => clearInterval(intervalHandle);
  }, []);

  return (
    <div className='container mx-auto py-10'>
      <div className='flex items-center w-full flex-col'>
        <div>
          <div className='relative flex flex-col items-center justify-center'>
            <img
              src={fallBackImgUrl || url}
              alt='dp'
              onLoad={(e) => {
                e.preventDefault();
                setFallBackImgUrl(null);
                if (counter === 1) setIsPhotoLoaded(true);
                setCounter((prev) => ++prev);
              }}
              className={`rounded-full object-cover aspect-square mb-5 w-64 h-64 border-2 border-blue-400 ring-2 ring-offset-1 ring-blue-500 shadow-inner scale-95 hover:scale-105 ${
                isPhotoLoaded ? 'opacity-100' : 'opacity-60'
              }`}
            />
            {!isPhotoLoaded && (
              <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10'>
                <ComponentLoader />
              </div>
            )}
          </div>

          <h1 className='text-3xl lg:text-6xl font-bold font-roboto text-black sm:text-6xl text-center lg:leading-relaxed leading-snug tracking-tighter'>
            Hello <span className='hand inline-block'>👋</span> , I am{' '}
            <span className='text-blue-800 font-bold' ref={nameRef} id='name'>
              {profile.name}
            </span>
          </h1>

          <div className='w-full flex justify-center items-center'>
            {profile.tags.map((tag: string) => (
              <span
                key={tag}
                className='font-arial text-gray-800 shadow-sm shadow-black mb-2 mx-1 inline-block rounded-sm bg-neutral-200 p-1 text-sm font-semibold text-center max-w-40'
              >
                {tag}
              </span>
            ))}
          </div>

          <div className='flex justify-center text-lg lg:text-xl my-2 font-roboto font-bold'>
            <p>experienced in</p>
            <span className='mx-2 font-bold italic text-orange-600'>
              <Typewriter options={{ strings: SKILLS, autoStart: true, loop: true }} />
            </span>
          </div>
          <div className='mx-4'>
            <p className='text-base font-arial text-justify lg:text-center text-orange-600 font-bold underline underline-offset-4 decoration-dotted decoration-blue-600 italic'>
              {profile.introduction}
            </p>
          </div>
          <div className='flex items-center justify-center md:hidden'>
            <CodingProfileBanner />
          </div>
          <div className='mt-5 flex items-center justify-center gap-x-2 flex-wrap'>
            <a
              href='/contact-me'
              className='rounded-md inline-flex transition-all bg-blue-800 p-4 text-md font-semibold text-white shadow-sm shadow-blue-200 ring-2 ring-offset-1 ring-blue-500 mx-4 scale-95 hover:scale-105 hover:bg-white hover:text-blue-800 outline-none mb-4 min-w-30 lg:min-w-44 border-2 border-dashed border-blue-400 justify-center font-roboto'
            >
              <BookUser className='mx-1' /> Contact Me
            </a>
            <a
              href='#projects'
              className='inline-flex rounded-md transition-all bg-orange-100 p-4 text-md font-semibold text-orange-800 shadow-sm shadow-orange-400 ring-2 ring-offset-1 ring-orange-400 focus-within:scale-95 hover:bg-orange-800 hover:text-white scale-95 hover:scale-105 mb-4 min-w-30 lg:min-w-44 justify-center border-2 border-dashed border-orange-400 font-roboto'
            >
              <BriefcaseBusiness className='mx-1' /> View my work
            </a>
          </div>
        </div>

        <div className='my-2'>
          <div className='flex gap-4 flex-wrap items-center justify-center w-full'>
            <div className='flex items-center'>
              <div className='min-h-16 min-w-10 border-2 border-dashed ring-1 ring-offset-2 ring-orange-400 p-4 bg-orange-800 rounded-xl shadow-md shadow-orange-500'>
                <p className='text-center text-9xl font-roboto font-extrabold text-white'>{analytics.experience}</p>
                <p className='text-white font-bold font-roboto text-center'> years of experience</p>
              </div>
            </div>

            <div className='flex items-center flex-wrap'>
              <div className='min-h-16 min-w-10 border-2 border-dashed ring-1 ring-offset-2 ring-orange-400 p-4 bg-orange-800 rounded-xl shadow-md shadow-orange-500'>
                <p className='text-center text-9xl font-roboto font-extrabold text-white'>
                  {analytics.projects === 5 ? '5+' : analytics.projects}
                </p>
                <p className='text-white font-bold font-roboto text-center'> projects delivered</p>
              </div>
            </div>

            <div className='flex items-center'>
              <div className='min-h-16 min-w-10 border-2 border-dashed ring-1 ring-offset-2 ring-orange-400 p-4 bg-orange-800 rounded-xl shadow-md shadow-orange-500'>
                <p className='text-center text-9xl font-roboto font-extrabold text-white'>
                  {analytics.questionSolved === 300 ? '300+' : analytics.questionSolved}
                </p>
                <p className='text-white font-bold font-roboto text-center'> coding questions solved</p>
              </div>
            </div>

            <div className='flex items-center'>
              <div className='min-h-16 min-w-10 border-2 border-dashed ring-1 ring-offset-2 ring-orange-400 p-4 bg-orange-800 rounded-xl shadow-md shadow-orange-500'>
                <p className='text-center text-9xl font-roboto font-extrabold text-white'>
                  {analytics.totalGithubContributions}
                </p>
                <p className='text-white font-bold font-roboto text-center'> active github contributions</p>
              </div>
            </div>
          </div>

          <div className='hidden lg:flex mt-4 items-center justify-center text-gray-700'>
            <CodingProfileBanner />
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Hero);
