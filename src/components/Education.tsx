import React, { ReactNode } from 'react';
import EducationCard from './EducationCard';
import { IEducationProps } from '../interfaces/IProps';
import TextContainer from './TextContainer';
import SimpleHeading from './SimpleHeading';

function Education({ education }: Readonly<IEducationProps>): ReactNode {
  return (
    <>
      <SimpleHeading headingName='Education' />

      <section className='container mx-auto p-4'>
        <TextContainer>
          <p className='px-2 text-sm lg:text-lg my-2 font-roboto text-justify'>
            <span className='text-lg lg:text-4xl font-bold font-bookman text-blue-800'>I</span> have pursued my studies with a strong focus
            on <strong>science and technology</strong>, building a solid foundation in analytical thinking and{' '}
            <strong>problem-solving</strong>. My educational journey reflects continuous growth and curiosity toward learning, with the
            following details presented in <strong>reverse chronological</strong> order.
          </p>
        </TextContainer>

        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch max-w-7xl mx-auto my-6 px-2'>
          {education.map((item) => (
            <EducationCard
              companyLogo={item.companyLogo}
              tags={item.tags}
              key={item.id}
              description={item.description}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default React.memo(Education);
