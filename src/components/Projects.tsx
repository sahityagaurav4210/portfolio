import React from 'react';
import Cards from './Cards';
import { IProjects, IProjectsProps } from '../interfaces/IProjects';

const Projects: React.FC<IProjectsProps> = ({ projects, personal_projects }) => {
  return (
    <div className='bg-slate-50'>
      <h1 className='text-4xl sm:text-center lg:text-start font-bold font-cookie tracking-wider p-6 mb-3'>
        Personal Projects
      </h1>
      <div className='flex flex-wrap items-center justify-center mb-5'>
        {personal_projects.map((project: IProjects) => (
          <Cards name={project.name} text={project.text} tech_stack={project.tech_stack} disabled={project.disabled} codeLink={project.codeLink} liveLink={project.liveLink} />
        ))}
      </div>

      <h1 className='text-4xl sm:text-center lg:text-start font-bold font-cookie tracking-wider p-6 mb-3'>
        Company Projects
      </h1>
      <div className='flex flex-wrap items-center justify-center'>
        {projects.map((project: IProjects) => (
          <Cards name={project.name} text={project.text} tech_stack={project.tech_stack} disabled={project.disabled} codeLink={project.codeLink} liveLink={project.liveLink} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
