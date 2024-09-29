import React, { ReactNode } from 'react';
import { ISkills, ISkillsProps } from '../interfaces/ISkills';
import SkillsCards from './SkillsCard';
import Heading from './Heading';

const Skills: React.FC<ISkillsProps> = ({ skills }): ReactNode => {
  return (
    <div>
      <Heading headingName='Skills' className='m-6' />
      <div className='container mx-auto mb-2'>
        <p className='font-roboto text-sm lg:text-lg px-2 text-justify'>
          Following are my list of skills that I have used in different projects.
        </p>
        <hr className='mt-1 mx-2' />
      </div>
      <div className='flex flex-wrap items-center justify-center mb-5'>
        {skills.map((project: ISkills) => (
          <SkillsCards
            name={project.name}
            text={project.text}
            picture={project.picture}
            key={project.name}
            experience={project.experience}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(Skills);
