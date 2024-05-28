import React from 'react';
import { ISkills, ISkillsProps } from '../interfaces/ISkills';
import SkillsCards from './SkillsCard';

const Skills: React.FC<ISkillsProps> = ({ skills }) => {
  return (
    <div className='bg-slate-50'>
      <h1 className='text-4xl sm:text-center lg:text-start font-bold p-6 mb-3 font-cookie tracking-wider'>Skills</h1>
      <div className='flex flex-wrap items-center justify-center mb-5'>
        {skills.map((project: ISkills) => (
          <SkillsCards name={project.name} text={project.text} picture={project.picture} />
        ))}
      </div>
    </div>
  );
};

export default Skills;
