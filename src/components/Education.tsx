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
      </section>
    </>
  );
}

export default React.memo(Education);
