import { ReactNode } from 'react';
import Heading from './Heading';

import GneLogo from '../assets/gndeclogo.jpeg';
import SchoolLogo from '../assets/uspclogo.png';
import ExperienceCard from './ExperienceCard';

function Education(): ReactNode {
  const education = [
    {
      companyLogo: GneLogo,
      tags: [
        {
          labelName: 'School/College Name',
          content: 'Guru Nanak Dev Engineering College',
        },
        {
          labelName: 'Course Name',
          content: 'BTech in Electronics and Communication Engineering',
        },
        {
          labelName: 'Passing Year',
          content: 'July 2022',
        },
        {
          labelName: 'Score',
          content: '7.38 CGPA',
        },
      ],
      isCurrent: true,
    },
    {
      companyLogo: SchoolLogo,
      tags: [
        {
          labelName: 'School/College Name',
          content: 'U.S.P.C Jain Public School',
        },
        {
          labelName: 'Course Name',
          content: 'All India Senior School Secondary Examination (12th) from CBSE',
        },
        {
          labelName: 'Passing Year',
          content: 'May 2018',
        },
        {
          labelName: 'Score',
          content: '63.4%',
        },
      ],
    },
    {
      companyLogo: SchoolLogo,
      tags: [
        {
          labelName: 'School/College Name',
          content: 'U.S.P.C Jain Public School',
        },
        {
          labelName: 'Course Name',
          content: 'Senior School Examination (10th) from CBSE',
        },
        {
          labelName: 'Passing Year',
          content: 'May 2016',
        },
        {
          labelName: 'Score',
          content: '8.60 CGPA',
        },
      ],
    },
  ];

  return (
    <>
      <Heading headingName='Education' />
      <section className='container mx-auto p-4'>
        <p className='text-sm lg:text-lg font-roboto my-2 px-2'>
          Following are my education details in reverse chronological manner.
        </p>
        <div className='flex items-center justify-center gap-2 flex-wrap'>
          {education.map((item) => (
            <ExperienceCard
              companyLogo={item.companyLogo}
              tags={item.tags}
              key={item.companyLogo}
              isCurrent={item.isCurrent}
            />
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

export default Education;
