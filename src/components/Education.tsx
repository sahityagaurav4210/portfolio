import React, { ReactNode } from 'react';
import Heading from './Heading';

import ExperienceCard from './ExperienceCard';
import { IEducationProps } from '../interfaces/IProps';
import TextContainer from './TextContainer';

function Education({ education }: Readonly<IEducationProps>): ReactNode {
  return (
    <>
      <Heading headingName='Education' />

      <section className='container mx-auto p-4'>
        <TextContainer>
          <p className='px-2 text-sm lg:text-lg my-2 font-roboto text-justify'>
            <span className='text-lg lg:text-4xl font-bold font-bookman text-blue-800'>I</span> have pursued my studies
            with a strong focus on <strong>science and technology</strong>, building a solid foundation in analytical
            thinking and <strong>problem-solving</strong>. My educational journey reflects continuous growth and
            curiosity toward learning, with the following details presented in <strong>reverse chronological</strong>{' '}
            order.
          </p>
        </TextContainer>

        <div className='flex items-center justify-center gap-1 flex-wrap'>
          {education.map((item) => (
            <ExperienceCard
              companyLogo={item.companyLogo}
              tags={item.tags}
              key={item.id}
              isCurrent={item.isCurrent}
              width='w-[20rem]'
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default React.memo(Education);
