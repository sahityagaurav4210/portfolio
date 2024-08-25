import React, { ReactNode } from 'react';
import { ISkills, ISkillsProps } from '../interfaces/ISkills';
import SkillsCards from './SkillsCard';
import Heading from './Heading';

const Skills: React.FC<ISkillsProps> = ({ skills }): ReactNode => {
  return (
    <div>
      <Heading headingName='Skills' className='m-6' />
      <div className='flex flex-wrap items-center justify-center mb-5'>
        {skills.map((project: ISkills) => (
          <SkillsCards name={project.name} text={project.text} picture={project.picture} key={project.name} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(Skills);
