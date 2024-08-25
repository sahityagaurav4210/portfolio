import { ReactNode } from 'react';
import Heading from './Heading';
import ExperienceCard from './ExperienceCard';

import DigiLogo from '../assets/digilogo.webp';
import CreativeLogo from '../assets/creativelogo.png';
import RockyLogo from '../assets/rockylogo.jpeg';

const experience = [
  {
    companyLogo: RockyLogo,
    tags: [
      {
        labelName: 'Company Name',
        content: 'Rocky Mountain Technologies India Pvt Ltd',
      },
      {
        labelName: 'Designation',
        content: 'Backend developer',
      },
      {
        labelName: 'Department',
        content: 'Software development',
      },
      {
        labelName: 'From',
        content: 'Apr 2024',
      },
      { labelName: 'To', content: 'Present' },
    ],
    description:
      'I am working as a backend developer for more that 4 months now. During this, i have worked upon 2 projects. ',
    isCurrent: true,
  },
  {
    companyLogo: CreativeLogo,
    tags: [
      {
        labelName: 'Company Name',
        content: 'Creative Line International Private Limited',
      },
      {
        labelName: 'Designation',
        content: 'Full stack developer',
      },
      {
        labelName: 'Department',
        content: 'Software development',
      },
      {
        labelName: 'From',
        content: 'Nov 2023',
      },
      { labelName: 'To', content: 'Mar 2024' },
    ],
    description:
      'I have worked here as a full stack developer for more than 3 months. During this period, i have developed the inventory and stock management website from scratch by myself only. Apart from this I have setup and maintained the linux server from scratch.',
  },
  {
    companyLogo: DigiLogo,
    tags: [
      {
        labelName: 'Company Name',
        content: 'Digimantra Labs',
      },
      {
        labelName: 'Designation',
        content: 'Associate Web Developer',
      },
      {
        labelName: 'Department',
        content: 'Backend development',
      },
      {
        labelName: 'From',
        content: 'Aug 2022',
      },
      { labelName: 'To', content: 'Nov 2023' },
    ],
    description:
      'I have worked here as a backend developer for more that a year. During this, i have worked upon more than 2 projects. I have also worked on a live project called EarthLink.',
  },
];

function Experience(): ReactNode {
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

export default Experience;
