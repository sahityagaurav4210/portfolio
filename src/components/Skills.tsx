import React, { ReactNode, useEffect, useState } from 'react';
import SkillsCards from './SkillsCard';
import Heading from './Heading';
import { ApiController, ApiStatus } from '../api';
import SkillImg from '../assets/skill.avif';
import { skills } from '../data';

const Skills = (): ReactNode => {
  const [skillDetails, setSkillsDetails] = useState<Array<Record<string, any>>>(skills);

  useEffect(() => {
    async function getDetails() {
      const controller = new ApiController();
      const details = await controller.GET(`baas/portfolio/all`);

      if (details.status === ApiStatus.SUCCESS) {
        if (typeof details?.data?.skillSection === 'object')
          setSkillsDetails(details.data.skillSection || skills);
        else if(Array.isArray(details?.data?.skillSection))
          setSkillsDetails(details.data[0].skillSection || skills);
      }
    }

    getDetails();
  }, []);

  return (
    <div>
      <Heading headingName='Skills' className='m-6' />
      <div className='container mx-auto mb-4'>
        <p className='font-roboto text-sm lg:text-lg px-2 text-justify text-balance'>
          Here’s a quick look at the tools and technologies I’ve worked with. From backend frameworks to databases and deployment tools, each skill listed below reflects my experience and the stack I’m most comfortable building with. I’m always exploring new tech to stay sharp and deliver better solutions.
        </p>
        <hr />
      </div>


      <div className='flex flex-wrap items-center justify-center mb-5'>
        {skillDetails.map((project: Record<string, any>, index: number) => (
          <SkillsCards
            name={project.name}
            text={project.description || project.text}
            picture={project.picture || project.url || SkillImg}
            key={`SKILL-CARD-${index}`}
            experience={typeof project.experience === 'number' ? `${project.experience} years` : project.experience}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(Skills);
