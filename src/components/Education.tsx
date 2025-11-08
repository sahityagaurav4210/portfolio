import React, { ReactNode } from 'react';
import Heading from './Heading';

import ExperienceCard from './ExperienceCard';
import { IEducationProps } from '../interfaces/IProps';

function Education({ education }: IEducationProps): ReactNode {
  return (
    <>
      <Heading headingName='Education' />
      <section className='container mx-auto p-4'>
        <p className='px-2 text-sm lg:text-lg my-2 font-roboto text-justify'>
          I have pursued my studies with a strong focus on <strong>science and technology</strong>, building a solid foundation in analytical thinking and <strong>problem-solving</strong>. My educational journey reflects continuous growth and curiosity toward learning, with the following details presented in <strong>reverse chronological</strong> order.
        </p>

        <div className='flex items-center justify-center gap-1 flex-wrap'>
          {education.map((item) => (
            <ExperienceCard companyLogo={item.companyLogo} tags={item.tags} key={item.id} isCurrent={item.isCurrent} width='w-[20rem]' />
          ))}
        </div>
      </section>
    </>
  );
}

export default React.memo(Education);
