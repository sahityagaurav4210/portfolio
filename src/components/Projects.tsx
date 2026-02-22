import React from 'react';
import Cards from './Cards';
import { IProjects, IProjectsProps } from '../interfaces/IProjects';
import Heading from './Heading';
import { Link } from 'react-router-dom';
import { BriefcaseBusiness, Building2, SquareArrowOutUpRight } from 'lucide-react';
import TextContainer from './TextContainer';

const Projects: React.FC<IProjectsProps> = ({ projects, personal_projects }) => {
  return (
    <>
      <Heading headingName='Projects' />

      <TextContainer applyMy>
        <p className='text-sm lg:text-lg font-roboto text-justify'>
          <span className='text-lg lg:text-4xl font-bold font-bookman text-blue-800'>I</span> have worked on diverse
          projects across both <span className='font-bold'>government</span> and{' '}
          <span className='font-bold'>private</span> sector organizations. These assignments involved designing,
          developing, and maintaining robust applications while collaborating with{' '}
          <span className='font-bold'>multidisciplinary</span> teams and adhering to{' '}
          <span className='font-bold'>strict regulatory</span> and business requirements. This experience has enhanced
          my adaptability, problem-solving skills, and understanding of varied operational environments. Below, I have
          listed my projects which I have worked on in a categorized manner.
        </p>
      </TextContainer>

      <div className='container mx-auto'>
        <div className='flex items-center p-4 gap-2'>
          <Building2 size={48} className='text-orange-600' />
          <h1 className='text-4xl lg:text-5xl text-blue-800 sm:text-center lg:text-start font-roboto'>
            Company <span className='text-blue-800/95 font-bold'>PROJECTS</span>
          </h1>
        </div>

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

        <div className='flex items-center p-4 gap-2'>
          <BriefcaseBusiness size={48} className='text-orange-600' />
          <h1 className='text-4xl lg:text-5xl text-blue-800 sm:text-center lg:text-start font-roboto'>
            Personal <span className='text-blue-800/95 font-bold'>PROJECTS</span>
          </h1>
        </div>

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
      </div>

      <TextContainer applyMy>
        <p className='text-sm lg:text-lg font-roboto text-justify'>
          I hope you've liked my projects which I have worked on. I also do side projects and if there's a project for
          me then you can directly <span className='font-bold'>hire me</span> as a freelance software developer. Please
          fill the form by clicking on the button given below.
        </p>
      </TextContainer>

      <div className='container mx-auto'>
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
