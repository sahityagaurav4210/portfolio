import React, { ReactNode } from 'react';
import Heading from './Heading';
import ExperienceCard from './ExperienceCard';

import { IExperienceProps } from '../interfaces/IProps';

function Experience({ experience }: IExperienceProps): ReactNode {
  return (
    <>
      <Heading headingName='Experience' className='mt-4 mb-1' />
      <section className='container mx-auto p-4'>
        <p className='px-2 text-sm lg:text-lg my-2 font-roboto text-justify'>
          I have almost 2 years of experience in backend development and 6 months of experience in full stack
          development. Following are my experience details in reverse chronological manner i.e., starting from latest to
          previous one.
        </p>
        <div className='flex items-center justify-center flex-wrap gap-2'>
          {experience.map((item) => (
            <ExperienceCard
              companyLogo={item.companyLogo}
              tags={item.tags}
              description={item.description}
              isCurrent={item.isCurrent}
              key={item.companyLogo}
            />
          ))}
        </div>

        {/* <table className='border border-b-2 border-black w-full mt-4'>
          <thead>
            <tr className='text-xl bg-black text-white h-20'>
              <th className='p-2 min-w-96'>Company Name</th>
              <th className='p-2 min-w-40'>Title</th>
              <th className='p-2 min-w-40'>Duration</th>
              <th className='p-2 min-w-40'>Role</th>
            </tr>
          </thead>

          <tbody>
            {people?.map((item) => (
              <tr key={item.name} className='h-20'>
                <td className='text-center text-sm lg:text-lg min-w-96'>{item.name}</td>
                <td className='text-center text-sm lg:text-lg min-w-40'>{item.title}</td>
                <td className='text-center min-w-40 text-sm lg:text-lg'>
                  <span className='inline-block border p-2 mx-4 lg:mx-0 rounded-full min-w-10 bg-emerald-200 border-emerald-400 ring-2 ring-offset-1 ring-emerald-500'>
                    {item.duration}
                  </span>
                </td>
                <td className='text-center text-sm lg:text-lg min-w-40'>{item.role}</td>
              </tr>
            ))}
          </tbody>
        </table> */}
      </section>
    </>
  );
}

export default React.memo(Experience);
