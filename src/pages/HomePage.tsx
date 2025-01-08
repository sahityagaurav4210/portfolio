import { ReactNode, useEffect, useState } from 'react';
import Education from '../components/Education';
import Experience from '../components/Experience';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Loader from '../components/Loader';
import Contact from '../components/Contact';
import HireMe from '../components/HireMe';
import Support from '../components/Support';

import { API_BASE_URL } from '../api';
import { IApiResponse, IApisResponse } from '../interfaces';
import { education, experience, menuItems, personal_projects, projects, skills } from '../data';
import { useNavigate } from 'react-router-dom';

function HomePage(): ReactNode {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [apiSignal, setApiSignal] = useState<boolean | null>(null);
  const [captcha, setCaptcha] = useState<IApiResponse>();
  const [lastModifiedDate, setLastModifiedDate] = useState<string | number>();
  const [apiResponses, setApiResponses] = useState<IApisResponse>({
    pingApi: false,
    captchaApi: false,
    updateWebsiteViewsApi: false,
    getWebsiteUpdateDetailsApi: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const timeOut = parseInt(import.meta.env.VITE_BACKEND_API_TIMEOUT) || 1000;

    const timerId = setTimeout(() => {
      controller.abort('Update website view api timeout');
    }, timeOut);

    async function updateWebsiteViews() {
      try {
        const rawWebsiteViewsResponse = await fetch(`${API_BASE_URL}/baas/website/`, {
          signal: controller.signal,
          headers: {
            'x-api-key': import.meta.env.VITE_BACKEND_TOKEN,
          },
          method: 'POST',
        });

        if (timerId) clearTimeout(timerId);

        if (rawWebsiteViewsResponse.ok) {
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
      try {
        const rawPingResponse = await fetch(`${API_BASE_URL}/ping`, {
          signal: controller.signal,
        });

        if (timerId) clearTimeout(timerId);
        const pingResponse = await rawPingResponse.json();

        if (rawPingResponse.ok && pingResponse.message === 'Pong') {
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
    async function captcha() {
      try {
        const rawCaptchaResponse = await fetch(`${API_BASE_URL}/captcha`, {
          signal: controller.signal,
        });

        if (timerId) clearTimeout(timerId);

        if (rawCaptchaResponse.ok) {
          const { data } = (await rawCaptchaResponse.json()) as IApiResponse;
          setCaptcha(data);
          setApiResponses({ ...apiResponses, captchaApi: false });
        } else {
          setApiResponses({ ...apiResponses, captchaApi: true });
        }
      } catch (error: any) {
        setApiSignal(false);
        setApiResponses((prev) => ({ ...prev, captchaApi: true }));
      }
    }
    async function getWebsiteUpdateDetails() {
      try {
        const rawWebsiteUpdatesResponse = await fetch(
          `${API_BASE_URL}/baas/website/last-modified-date?portfolio_url=https://gaurav-sahitya.netlify.app`,
          {
            signal: controller.signal,
            headers: {
              'x-api-key': import.meta.env.VITE_BACKEND_TOKEN,
            },
          }
        );

        if (timerId) clearTimeout(timerId);
        const websiteUpdateResponse = (await rawWebsiteUpdatesResponse.json()) as IApiResponse;

        if (rawWebsiteUpdatesResponse.ok) {
          setLastModifiedDate(websiteUpdateResponse.data?.lastModifiedAt);
          setApiResponses({ ...apiResponses, getWebsiteUpdateDetailsApi: false });
        } else {
          setLastModifiedDate(Date.now());
          setApiResponses({ ...apiResponses, getWebsiteUpdateDetailsApi: true });
        }
      } catch (error: any) {
        setLastModifiedDate(Date.now());
        setApiResponses((prev) => ({ ...prev, getWebsiteUpdateDetailsApi: true }));
      }
    }

    Promise.allSettled([ping(), captcha(), getWebsiteUpdateDetails(), updateWebsiteViews()]);
  }, []);

  if (!isLoaded && apiSignal === null) return <Loader />;
  else if (
    apiResponses.captchaApi &&
    apiResponses.getWebsiteUpdateDetailsApi &&
    apiResponses.pingApi &&
    apiResponses.updateWebsiteViewsApi
  ) {
    navigate('/offline');
    return;
  } else
    return (
      <>
        <Navbar menuItems={menuItems} url={`${import.meta.env.VITE_BACKEND_BASE_URL}/baas/files/download-cv`} />

        <section id='home'>
          <Hero url={`${import.meta.env.VITE_BACKEND_BASE_URL}/baas/files/download-photo`} />
        </section>

        <section id='projects'>
          <Projects projects={projects} personal_projects={personal_projects} />
        </section>

        <section id='experience'>
          <Experience experience={experience} />
        </section>

        <section id='education'>
          <Education education={education} />
        </section>

        <section id='skills'>
          <Skills skills={skills} />
        </section>

        <section id='contact'>
          <Contact apiSignal={apiSignal} captchaData={captcha} setCaptchaData={setCaptcha} />
        </section>

        <section id='hireme'>
          <HireMe />
        </section>

        <section id='support'>
          <Support lastModifiedDate={lastModifiedDate || Date.now()} />
        </section>

        <Footer />
      </>
    );
}

export default HomePage;
