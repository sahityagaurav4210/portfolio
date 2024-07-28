import { ReactNode } from 'react';
import Heading from './Heading';

const people = [
  {
    name: 'Rocky Mountain Technologies India Pvt Ltd',
    title: 'Software Developer',
    department: 'Backend development',
    duration: 'Apr 2024 - Present',
    role: 'Backend Developer',
  },
  {
    name: 'Creative Line International Pvt Ltd',
    title: 'Software Developer',
    department: 'Software development',
    duration: 'Dec 2023 - Mar 2024',
    role: 'Full Stack Developer',
  },
  {
    name: 'Digimantra Labs',
    title: 'Associate Web Developer',
    department: 'Backend development',
    duration: 'Aug 2022 - Nov 2023',
    role: 'Backend Developer',
  },
];

function Experience(): ReactNode {
  return (
    <>
      <Heading headingName='Experience' className='mt-4 mb-1' />
      <section className='container mx-auto px-4 py-4 overflow-x-auto divide-y-2'>
        <table className='border border-b-2 border-black w-full mt-4'>
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
        </table>
      </section>
    </>
  );
}

export default Experience;
