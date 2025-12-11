import React from 'react';
import Cards from './Cards';
import { IProjects, IProjectsProps } from '../interfaces/IProjects';
import Heading from './Heading';
import { Link } from 'react-router-dom';
import { SquareArrowOutUpRight } from 'lucide-react';

const Projects: React.FC<IProjectsProps> = ({ projects, personal_projects }) => {
  return (
    <>
      <Heading headingName='Projects' />

      <div>
        <h1 className='text-4xl lg:text-5xl text-blue-800 sm:text-center lg:text-start italic underline underline-offset-8 decoration-dashed decoration-blue-800/55 font-roboto p-6 mb-3'>
          Personal <span className='text-blue-800/95 font-bold'>Projects</span>
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
              note={project.note}
              showDivider={project.showDivider}
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
              note={project.note}
              showDivider={project.showDivider}
              cardImage={project.cardImage}
            />
          ))}
        </div>
      </div>

      <div className='container my-2 mx-auto p-4'>
        <p className="text-sm lg:text-lg font-roboto text-justify">I hope you've liked my projects which I have worked on. I also do side projects and if there's a project for me then you can directly <span className="font-bold">hire me</span> as a freelance software developer. Please fill the form by clicking on the button given below.</p>
      </div>

      <div className="container mx-auto">
        <div className='max-w-max'>
          <Link
            to='/hiring'
            className='rounded-md mx-2 flex transition-all scale-95 hover:scale-100 bg-blue-800 hover:bg-slate-100 p-4 text-md text-white hover:text-blue-800 shadow-md shadow-blue-200 font-bold ring-2 ring-blue-400 ring-offset-1'
          >
            <SquareArrowOutUpRight absoluteStrokeWidth className='mx-1' /> Hire Me
          </Link>
        </div>
      </div>
    </>
  );
};

export default React.memo(Projects);
