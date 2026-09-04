import React, { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiController, ApiStatus } from '../api';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import { menuItems } from '../data';
import Footer from '../components/Footer';
import Projects from '../components/Projects';
import { IHeroSectionPayload } from '../interfaces';
import { IProjects } from '../interfaces/IProjects';
import { useInView } from 'react-intersection-observer';
import BackToTopButton from '../components/core/BackToTopButton';

function ProjectPage(): ReactNode {
  const { ref, inView } = useInView({ threshold: 0.4 });
  const [apiSignal, setApiSignal] = useState<boolean | null>(null);
  const [apiResponses, setApiResponses] = useState({
    pingApi: false,
    updateWebsiteViewsApi: false,
    heroSectionApi: false,
    projectsApi: false,
  });
  const [heroSection, setHeroSection] = useState<IHeroSectionPayload>();
  const [project, setProject] = useState<Array<IProjects>>([]);
  const navigate = useNavigate();

  async function updateWebsiteViews() {
    const controller = new ApiController();

    try {
      const rawWebsiteViewsResponse = await controller.POST('baas/website');

      if (rawWebsiteViewsResponse.status === ApiStatus.SUCCESS) {
        setApiSignal(true);
      } else {
        setApiSignal(false);
        setApiResponses((prev) => ({ ...prev, updateWebsiteViewsApi: true }));
      }
    } catch {
      setApiSignal(false);
      setApiResponses((prev) => ({ ...prev, updateWebsiteViewsApi: true }));
    }
  }

  async function ping() {
    const controller = new ApiController();

    try {
      const response = await controller.GET('ping');

      if (response.status === ApiStatus.SUCCESS) {
        setApiSignal(true);
      } else {
        setApiSignal(false);
        setApiResponses((prev) => ({ ...prev, pingApi: true }));
      }
    } catch {
      setApiSignal(false);
      setApiResponses((prev) => ({ ...prev, pingApi: true }));
    }
  }

  async function fetchHeroSection() {
    try {
      const controller = new ApiController();
      const heroSectionResponse = await controller.GET(`baas/home/get`);

      setHeroSection(heroSectionResponse.data);
      setApiResponses({ ...apiResponses, heroSectionApi: false });
    } catch {
      setApiResponses((prev) => ({ ...prev, heroSectionApi: true }));
    }
  }

  async function fetchProjects(type?: string | null) {
    try {
      const controller = new ApiController();
      const endpoint = type ? `baas/projects/list?type=${type}` : `baas/projects/list`;
      const projectResponse = await controller.GET(endpoint);
      console.log(projectResponse.data, 'projects');

      setProject(projectResponse.data);
      setApiResponses((prev) => ({ ...prev, projectsApi: false }));
    } catch {
      setApiResponses((prev) => ({ ...prev, projectsApi: true }));
    }
  }

  useEffect(() => {
    Promise.all([ping(), updateWebsiteViews(), fetchHeroSection(), fetchProjects()]);
  }, []);

  if (apiSignal === null) return <Loader />;
  else if (apiResponses.pingApi && apiResponses.updateWebsiteViewsApi && apiResponses.heroSectionApi) navigate('/offline');
  else
    return (
      <>
        <Navbar menuItems={menuItems} heroSection={heroSection} />

        <Projects projects={project} fetchProjects={fetchProjects} />

        <div ref={ref} className='w-full'>
          <Footer />
        </div>

        <BackToTopButton isVisible={inView} uri='/projects' />
      </>
    );
}

export default React.memo(ProjectPage);
