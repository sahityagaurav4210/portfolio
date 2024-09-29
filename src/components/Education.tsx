import React, { ReactNode } from 'react';
import Heading from './Heading';

import ExperienceCard from './ExperienceCard';
import { IEducationProps } from '../interfaces/IProps';

function Education({ education }: IEducationProps): ReactNode {
  return (
    <>
      <Heading headingName='Education' />
      <section className='container mx-auto p-4'>
        <p className='text-sm lg:text-lg font-roboto my-2 px-2'>
          Following are my education details in reverse chronological manner.
        </p>
        <div className='flex items-center justify-center gap-2 flex-wrap'>
          {education.map((item) => (
            <ExperienceCard companyLogo={item.companyLogo} tags={item.tags} key={item.id} isCurrent={item.isCurrent} />
          ))}
        </div>
        {/* <table className='border border-b-2 border-black w-full mt-4'>
          <thead>
            <tr className='text-xl bg-black text-white h-20'>
              <th className='p-2 min-w-96'>School/College name</th>
              <th className='p-2 min-w-40'>Course name</th>
              <th className='p-2 min-w-40'>Passing year</th>
              <th className='p-2 min-w-40'>Score</th>
            </tr>
          </thead>

          <tbody>
            {education?.map((item, index) => (
              <tr key={index} className='h-20'>
                <td className='text-center text-sm lg:text-lg min-w-96'>{item.name}</td>
                <td className='text-center text-sm lg:text-lg min-w-40'>{item.course_name}</td>
                <td className='text-center min-w-40 text-sm lg:text-lg'>
                  <span className='inline-block border p-2 rounded-full min-w-10 bg-emerald-200 border-emerald-400 ring-2 ring-offset-1 ring-emerald-500'>
                    {item.passing_year}
                  </span>
                </td>
                <td className='text-center text-sm lg:text-lg min-w-40'>{item.score}</td>
              </tr>
            ))}
          </tbody>
        </table> */}
      </section>
    </>
  );
}

export default React.memo(Education);
