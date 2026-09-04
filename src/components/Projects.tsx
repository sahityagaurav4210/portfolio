import React, { useState } from 'react';
import Cards from './Cards';
import { IProjects, IProjectsProps } from '../interfaces/IProjects';
import { Link } from 'react-router-dom';
import { SquareArrowOutUpRight } from 'lucide-react';
import TextContainer from './TextContainer';
import SimpleHeading from './SimpleHeading';

const Projects: React.FC<IProjectsProps> = ({ projects, fetchProjects }) => {
  const [selectedType, setSelectedType] = useState<string>('all');

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedType(value);
    if (value === 'all') {
      fetchProjects?.(null);
    } else {
      fetchProjects?.(value);
    }
  };

  return (
    <>
      <SimpleHeading headingName='Projects' />

      <TextContainer applyMy>
        <p className='text-sm lg:text-lg font-roboto text-justify'>
          <span className='text-lg lg:text-4xl font-bold font-bookman text-blue-800'>I</span> have worked on diverse projects across both{' '}
          <span className='font-bold'>government</span> and <span className='font-bold'>private</span> sector organizations. These
          assignments involved designing, developing, and maintaining robust applications while collaborating with{' '}
          <span className='font-bold'>multidisciplinary</span> teams and adhering to <span className='font-bold'>strict regulatory</span>{' '}
          and business requirements. This experience has enhanced my adaptability, problem-solving skills, and understanding of varied
          operational environments. Below, I have listed my projects which I have worked on in a categorized manner.
        </p>
      </TextContainer>

      <div className='container mx-auto px-4 mb-4 flex justify-end items-center'>
        <div className='flex items-center gap-2'>
          <label htmlFor='project-type' className='text-sm font-semibold font-roboto text-blue-900'>
            Filter:
          </label>
          <select
            id='project-type'
            value={selectedType}
            onChange={handleTypeChange}
            className='p-2 bg-transparent outline-none min-w-36 border-2 border-dashed border-blue-800 text-blue-800 rounded-md font-semibold font-roboto text-sm focus:border-blue-950 cursor-pointer shadow-sm'
          >
            <option value='all'>All Projects</option>
            <option value='personal'>Personal Projects</option>
            <option value='professional'>Professional Projects</option>
          </select>
        </div>
      </div>

      <div className='container mx-auto'>
        <div className='flex flex-wrap items-center justify-center'>
          {projects && projects.length > 0 ? (
            projects.map((project: IProjects) => (
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
                type={project.type}
                documentation_link={project.documentation_link}
                projectDomain={project.projectDomain}
              />
            ))
          ) : (
            <div className='p-8 text-center text-gray-500 font-roboto text-lg'>No projects available for this category.</div>
          )}
        </div>
      </div>

      <TextContainer applyMy>
        <p className='text-sm lg:text-lg font-roboto text-justify'>
          I hope you've liked my projects which I have worked on. I also do side projects and if there's a project for me then you can
          directly <span className='font-bold'>hire me</span> as a freelance software developer. Please fill the form by clicking on the
          button given below.
        </p>
      </TextContainer>

      <div className='container mx-auto mb-2'>
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
