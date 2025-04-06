import React, { ReactNode, useEffect, useState } from 'react';
import SkillsCards from './SkillsCard';
import Heading from './Heading';
import { ApiController, ApiStatus } from '../api';
import SkillImg from '../assets/skill.avif';
import { skills } from '../data';

const Skills = (): ReactNode => {
  const [skillDetails, setSkillsDetails] = useState<Array<Record<string, any>>>([]);
  useEffect(() => {
    async function getDetails() {
      const controller = new ApiController();
      const details = await controller.GET(`baas/portfolio/all`);

      if (details.status === ApiStatus.SUCCESS) {
        setSkillsDetails(details?.data?.skillSection || skills);
      }
    }

    getDetails();
  }, []);


  return (
    <div>
      <Heading headingName='Skills' className='m-6' />
      <div className='container mx-auto mb-2'>
        <p className='font-roboto text-sm lg:text-lg px-2 text-justify text-balance'>
          Below is my list of skills that I have used in various projects. I have also mentioned my experience with each skill.
        </p>
      </div>
      <div className='flex flex-wrap items-center justify-center mb-5'>
        {skillDetails.map((project: Record<string, any>, index: number) => (
          <SkillsCards
            name={project.name}
            text={project.description}
            picture={project.url || SkillImg}
            key={`SKILL-CARD-${index}`}
            experience={`${project.experience} years`}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(Skills);
