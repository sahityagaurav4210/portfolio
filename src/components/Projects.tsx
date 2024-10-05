import React from 'react';
import Cards from './Cards';
import { IProjects, IProjectsProps } from '../interfaces/IProjects';
import Heading from './Heading';

const Projects: React.FC<IProjectsProps> = ({ projects, personal_projects }) => {
  return (
    <>
      <Heading headingName='Projects' />
      <div>
        <h1 className='text-4xl lg:text-5xl text-blue-800 sm:text-center lg:text-start italic underline underline-offset-8 decoration-dashed decoration-blue-800/55 font-roboto p-6 mb-3'>
          Personal <span className='text-blue-800/75 font-semibold'>Projects</span>
        </h1>
        <div className='flex flex-wrap items-center justify-center mb-5'>
          {personal_projects.map((project: IProjects) => (
            <Cards
              key={project.name}
              name={project.name}
              text={project.text}
              tech_stack={project.tech_stack}
              disabled={project.disabled}
              codeLink={project.codeLink}
              liveLink={project.liveLink}
              documentation_link={project.documentation_link}
              ongoing={project.ongoing}
            />
          ))}
        </div>

        <h1 className='text-4xl lg:text-5xl text-blue-800 sm:text-center lg:text-start italic underline underline-offset-8 decoration-dashed decoration-blue-800/55 font-roboto p-6 mb-3'>
          Company <span className='text-blue-800/75 font-semibold'>Projects</span>
        </h1>
        <div className='flex flex-wrap items-center justify-center'>
          {projects.map((project: IProjects) => (
            <Cards
              name={project.name}
              text={project.text}
              tech_stack={project.tech_stack}
              disabled={project.disabled}
              codeLink={project.codeLink}
              liveLink={project.liveLink}
              key={project.name}
              ongoing={project.ongoing}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default React.memo(Projects);
