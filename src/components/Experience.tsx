import React, { ReactNode } from 'react';
import Heading from './Heading';
import ExperienceCard from './ExperienceCard';

import { IExperienceProps } from '../interfaces/IProps';
import TextContainer from './TextContainer';

function Experience({ experience }: Readonly<IExperienceProps>): ReactNode {
  return (
    <>
      <Heading headingName='Experience' className='mt-4 mb-1' />
      <section className='container mx-auto p-2'>
        <TextContainer>
          <p className='px-2 text-sm lg:text-lg my-2 font-roboto text-justify'>
            <span className='text-lg lg:text-4xl font-bold font-bookman text-blue-800'>I</span> have more than{' '}
            <span className='font-bold'>2.5</span> years of experience in software development. Following are my
            experience details in reverse chronological manner i.e., starting from latest to previous one. Please note
            that this section shows my overall work experience, for skill-wise experience go{' '}
            <a href='#skills' className='text-blue-800 underline underline-offset-4 decoration-dashed font-bold'>
              SKILL
            </a>{' '}
            section.
          </p>
        </TextContainer>

        <div className='flex items-center justify-center flex-wrap gap-2'>
          {experience.map((item, index: number) => (
            <ExperienceCard
              companyLogo={item.companyLogo}
              tags={item.tags}
              description={item.description}
              isCurrent={item.isCurrent}
              key={`${item.companyLogo}${index}`}
              responsibilities={item?.responsibilities}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default React.memo(Experience);
