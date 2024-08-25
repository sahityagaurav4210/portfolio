import React, { ReactNode, useEffect, useState } from 'react';
import User from '../assets/user.png';
import { IAnalytics, IHeroProps } from '../interfaces';
import { SKILLS } from '../constants';
import Typewriter from 'typewriter-effect';
import { BookUser, BriefcaseBusiness } from 'lucide-react';

import HackerrankLogo from '../assets/hackerrank.png';
import LinkedinLogo from '../assets/linkedin.png';
import GithubLogo from '../assets/github.png';

function Hero({ url }: IHeroProps): ReactNode {
  const [analytics, setAnalytics] = useState<IAnalytics>({
    totalGithubContributions: 0,
    questionSolved: 0,
    experience: 0,
    projects: 0,
  });

  useEffect(() => {
    setAnalytics((previous) => ({
      totalGithubContributions: previous.totalGithubContributions < 352 ? previous.totalGithubContributions + 1 : 352,
      questionSolved: previous.questionSolved < 300 ? previous.questionSolved + 1 : 300,
      experience: previous.experience < 2 ? previous.experience + 1 : 2,
      projects: previous.projects < 5 ? previous.projects + 1 : 5,
    }));
  }, [analytics.questionSolved, analytics.totalGithubContributions, analytics.experience]);

  return (
    <>
      <div className='container mx-auto py-10'>
        <div className='flex items-center w-full flex-col lg:flex-row lg:divide-x-4 divide-blue-700 divide-dotted'>
          <div className='lg:w-1/2 mb-5'>
            <div className='flex items-center justify-center'>
              {!url ? (
                <img
                  src={User}
                  alt='photo'
                  className='rounded-full object-cover aspect-square mb-5 w-64 h-64'
                  loading='lazy'
                />
              ) : (
                <img
                  src={url}
                  alt='photo'
                  className='rounded-full object-cover aspect-square mb-5 w-64 h-64 border-2 border-blue-400 ring-2 ring-offset-1 ring-blue-500 shadow-inner scale-95 hover:scale-105'
                />
              )}
            </div>
            <h1 className='text-3xl lg:text-6xl font-bold font-roboto text-black sm:text-6xl text-center lg:leading-relaxed leading-snug'>
              Hello 👋, I am
              <span className='text-blue-800 font-bold'> Gaurav Sahitya.</span>
            </h1>
            <p className='flex justify-center text-lg lg:text-2xl my-2 font-roboto'>
              skilled in{' '}
              <span className='mx-2 font-bold italic'>
                <Typewriter options={{ strings: SKILLS, autoStart: true, loop: true }} />
              </span>
            </p>
            <div className='flex items-center justify-center md:hidden'>
              <p className='font-roboto p-2'>Find me on </p>
              <span className='flex items-center gap-x-2 cursor-pointer'>
                <img
                  src={HackerrankLogo}
                  className='rounded-full'
                  title='Hackerrank'
                  onClick={(_) => window.open('https://hackerrank.com/sahityagaurav_41', '_blank')}
                />
                <img
                  src={LinkedinLogo}
                  className='rounded-full'
                  title='Linkedin'
                  onClick={(_) => window.open('https://linkedin.com/in/sahityagaurav4210', '_blank')}
                />
                <img
                  src={GithubLogo}
                  className='rounded-full'
                  title='Github'
                  onClick={(_) => window.open('https://github.com/sahityagaurav4210', '_blank')}
                />
              </span>
            </div>
            <div className='mt-5 flex items-center justify-center gap-x-2 flex-wrap'>
              <a
                href='#contact'
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

          <div className='lg:w-1/2 '>
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
              <p className='font-roboto p-2'>Find me on </p>
              <span className='flex items-center gap-x-2 cursor-pointer'>
                <img
                  src={HackerrankLogo}
                  className='rounded-full'
                  title='Hackerrank'
                  onClick={(_) => window.open('https://hackerrank.com/sahityagaurav_41', '_blank')}
                />
                <img
                  src={LinkedinLogo}
                  className='w-8 h-8 rounded-full'
                  title='Linkedin'
                  onClick={(_) => window.open('https://linkedin.com/in/sahityagaurav4210', '_blank')}
                />
                <img
                  src={GithubLogo}
                  className='w-8 h-8 rounded-full'
                  title='Github'
                  onClick={(_) => window.open('https://github.com/sahityagaurav4210', '_blank')}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(Hero);
