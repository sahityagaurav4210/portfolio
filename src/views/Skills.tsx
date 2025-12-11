import React, { ReactNode, useEffect, useState } from 'react';
import SkillsCards from '../components/SkillsCard';
import { ApiController, ApiStatus, } from '../api';
import SkillImg from '../assets/skill.avif';
import { skills } from '../data';
import SimpleHeading from '../components/SimpleHeading';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const Skills = (): ReactNode => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [apiSignal, setApiSignal] = useState<boolean | null>(null);
  const [skillDetails, setSkillsDetails] = useState<Array<Record<string, any>>>(skills);
  const [apiResponses, setApiResponses] = useState({
    pingApi: false,
    updateWebsiteViewsApi: false,
  });

  const navigate = useNavigate();

  async function updateWebsiteViews() {
    const controller = new ApiController();

    try {
      const response = await controller.POST("baas/website");
      if (response.status === ApiStatus.SUCCESS) {
        setApiSignal(true);
        setApiResponses({ ...apiResponses, updateWebsiteViewsApi: false });
      } else {
        setApiSignal(false);
        setApiResponses({ ...apiResponses, updateWebsiteViewsApi: true });
      }
    } catch (error) {
      setApiSignal(false);
      setApiResponses((prev) => ({ ...prev, updateWebsiteViewsApi: true }));
    }
  }

  async function ping() {
    const controller = new ApiController();

    try {
      const response = await controller.GET("ping");

      if (response.message === 'Pong') {
        setIsLoaded(true);
        setApiResponses({ ...apiResponses, pingApi: false });
      } else {
        setIsLoaded(false);
        setApiResponses({ ...apiResponses, pingApi: true });
      }
    } catch (error: any) {
      setIsLoaded(false);
      setApiSignal(false);
      setApiResponses((prev) => ({ ...prev, pingApi: true }));
    }
  }

  async function getDetails() {
    const controller = new ApiController();
    const details = await controller.GET(`baas/portfolio/all`);

    if (details.status === ApiStatus.SUCCESS) {
      if (typeof details?.data?.skillSection === 'object')
        setSkillsDetails(details.data.skillSection || skills);
      else if (Array.isArray(details?.data?.skillSection))
        setSkillsDetails(details.data[0].skillSection || skills);
    }
  }

  useEffect(() => {
    Promise.all([ping(), updateWebsiteViews(), getDetails()]);
  }, []);

  if (!isLoaded && apiSignal === null) return <Loader />;

  if (apiResponses.pingApi && apiResponses.updateWebsiteViewsApi) {
    navigate("/offline");
    return;
  }

  return (
    <div>
      <SimpleHeading headingName='Skills' className='my-4' />

      <div className='container mx-auto mb-4'>
        <p className='font-roboto text-sm lg:text-lg px-2 text-justify text-balance'>
          Here’s a quick look at the tools and technologies I’ve worked with. From backend frameworks to databases and deployment tools, each skill listed below reflects my experience and the stack I’m most comfortable building with. I’m always exploring new tech to stay sharp and deliver better solutions.
        </p>
        <hr />
      </div>

      <div className='flex flex-wrap items-center justify-center mb-5'>
        {
          skillDetails.map((project: Record<string, any>, index: number) => (
            <SkillsCards
              name={project.name}
              text={project.description || project.text}
              picture={project.picture || project.url || SkillImg}
              key={`SKILL-CARD-${index}`}
              experience={typeof project.experience === 'number' ? `${project.experience} years` : project.experience}
            />
          ))
        }
      </div>
    </div>
  );
};

export default React.memo(Skills);
