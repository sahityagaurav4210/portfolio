import { ReactNode } from 'react';
import Heading from './Heading';

function Education(): ReactNode {
  const education = [
    {
      name: 'Guru Nanak Dev Engineering College',
      course_name: 'BTech in Electronics and Communication Engineering',
      passing_year: 'July 2022',
      score: '7.38 CGPA',
    },
    {
      name: 'U.S.P.C Jain Public School',
      course_name: 'Intermediate Science (12th) from CBSE ',
      passing_year: 'June 2018',
      score: '63.4%',
    },
    {
      name: 'U.S.P.C Jain Public School',
      course_name: 'Matriculation (10th) from CBSE',
      passing_year: 'June 2016',
      score: '8.6 CGPA',
    },
  ];

  return (
    <>
      <Heading headingName='Education' />
      <section className='container mx-auto px-4 py-4 overflow-x-auto divide-y-2'>
        <table className='border border-b-2 border-black w-full mt-4'>
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
        </table>
      </section>
    </>
  );
}

export default Education;
