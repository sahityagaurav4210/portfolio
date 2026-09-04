import { ReactNode, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
import Support from '../components/Support';

import { API_BASE_URL, ApiController, ApiStatus, downloadMedia, getApiHeaders, HTTP_VERBS } from '../api';
import { IApisResponse, IHeroSectionPayload } from '../interfaces';
import { menuItems } from '../data';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import BackToTopButton from '../components/core/BackToTopButton';

function HomePage(): ReactNode {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [apiSignal, setApiSignal] = useState<boolean | null>(null);
  const [lastModifiedDate, setLastModifiedDate] = useState<string | number>();
  const [heroSection, setHeroSection] = useState<IHeroSectionPayload>();
  const [apiResponses, setApiResponses] = useState<IApisResponse>({
    pingApi: false,
    updateWebsiteViewsApi: false,
    getWebsiteUpdateDetailsApi: false,
    getPhotoUrl: false,
    heroSectionApi: false,
  });
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const navigate = useNavigate();
  const { ref, inView } = useInView({ threshold: 0.4 });

  async function loadApis() {
    const controller = new AbortController();
    const timeOut = Number.parseInt(import.meta.env.VITE_BACKEND_API_TIMEOUT) || 1000;

    const timerId = setTimeout(() => {
      controller.abort('Update website view api timeout');
    }, timeOut);

    async function updateWebsiteViews() {
      try {
        const rawWebsiteViewsResponse = await fetch(`${API_BASE_URL}/baas/website/`, {
          signal: controller.signal,
          headers: getApiHeaders(),
          method: HTTP_VERBS.POST,
        });

        if (rawWebsiteViewsResponse.ok) {
          setApiSignal(true);
          setApiResponses({ ...apiResponses, updateWebsiteViewsApi: false });
        } else {
          setApiSignal(false);
          setApiResponses({ ...apiResponses, updateWebsiteViewsApi: true });
        }
      } catch {
        setApiSignal(false);
        setApiResponses((prev) => ({ ...prev, updateWebsiteViewsApi: true }));
      }
    }

    async function ping() {
      try {
        const rawPingResponse = await fetch(`${API_BASE_URL}/ping`, {
          signal: controller.signal,
          headers: getApiHeaders(),
        });

        const pingResponse = await rawPingResponse.json();

        if (rawPingResponse.ok && pingResponse.message === 'Pong') {
          setIsLoaded(true);
          setApiResponses({ ...apiResponses, pingApi: false });
        } else {
          setIsLoaded(false);
          setApiResponses({ ...apiResponses, pingApi: true });
        }
      } catch {
        console.log('Error in ping api.');
        setIsLoaded(false);
        setApiSignal(false);
        setApiResponses((prev) => ({ ...prev, pingApi: true }));
      }
    }

    async function getWebsiteUpdateDetails() {
      try {
        const controller = new ApiController();
        const websiteUpdateResponse = await controller.GET(
          `baas/website/last-modified-date?portfolio_url=${import.meta.env.VITE_LIVE_URL}`
        );

        if (websiteUpdateResponse.status === ApiStatus.SUCCESS && websiteUpdateResponse.data?.lastModifiedAt) {
          setLastModifiedDate(websiteUpdateResponse.data?.lastModifiedAt);
          setApiResponses({ ...apiResponses, getWebsiteUpdateDetailsApi: false });
        } else {
          setLastModifiedDate(Date.now());
          setApiResponses((prev) => ({ ...prev, getWebsiteUpdateDetailsApi: true }));
        }
      } catch {
        setLastModifiedDate(Date.now());
        setApiResponses((prev) => ({ ...prev, getWebsiteUpdateDetailsApi: true }));
      }
    }

    async function getPhotoUrl() {
      try {
        const photo = await downloadMedia(`${API_BASE_URL}/baas/files/download-photo`, controller.signal);

        if (timerId) clearTimeout(timerId);
        if (photo) {
          localStorage.setItem('photo-url', photo);
          setPhotoUrl(photo);
          setApiResponses((prev) => ({ ...prev, getPhotoUrl: false }));
        } else {
          setApiResponses((prev) => ({ ...prev, getPhotoUrl: true }));
        }
      } catch {
        setApiResponses((prev) => ({ ...prev, getPhotoUrl: true }));
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

    await Promise.allSettled([ping(), getWebsiteUpdateDetails(), getPhotoUrl(), updateWebsiteViews(), fetchHeroSection()]);
  }

  useEffect(() => {
    loadApis();
  }, []);

  if (!isLoaded && apiSignal === null) return <Loader />;
  else if (
    apiResponses.getWebsiteUpdateDetailsApi &&
    apiResponses.pingApi &&
    apiResponses.updateWebsiteViewsApi &&
    apiResponses.getPhotoUrl &&
    apiResponses.heroSectionApi
  ) {
    navigate('/offline');
    return;
  } else
    return (
      <>
        <div id='home'>
          <Navbar menuItems={menuItems} heroSection={heroSection} />

          <section>
            <Hero url={photoUrl} heroSection={heroSection} />
          </section>
        </div>

        <section id='support'>
          <Support lastModifiedDate={lastModifiedDate || Date.now()} />
        </section>

        <div ref={ref}>
          <Footer />
        </div>

        <BackToTopButton isVisible={inView} uri='/#home' />
      </>
    );
}

export default HomePage;
