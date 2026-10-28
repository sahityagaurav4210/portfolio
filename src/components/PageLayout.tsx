import React, { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import Navbar from './Navbar';
import Footer from './Footer';
import Loader from './Loader';
import BackToTopButton from './core/BackToTopButton';
import { menuItems } from '../data';
import usePages from '../hooks/usePages';
import { IHeroSectionPayload } from '../interfaces';
import { ISkillsPageState } from '../interfaces/ISkills';
import { UseStateFunction } from '../types';

export interface PageLayoutRenderProps {
  apiResponses: ISkillsPageState;
  setApiResponses: UseStateFunction<ISkillsPageState>;
  heroSection?: IHeroSectionPayload;
}

export interface PageLayoutProps {
  uri: string;
  children: ReactNode | ((props: PageLayoutRenderProps) => ReactNode);
  onInit?: (setApiResponses: UseStateFunction<ISkillsPageState>) => Promise<unknown> | void;
}

function PageLayout({ uri, children, onInit }: PageLayoutProps): ReactNode {
  const { ref, inView } = useInView({ threshold: 0.4 });
  const [apiSignal, setApiSignal] = useState<boolean | null>(null);
  const [apiResponses, setApiResponses] = useState<ISkillsPageState>({
    pingApi: false,
    updateWebsiteViewsApi: false,
    heroSectionApi: false,
    projectsApi: false,
  });
  const [heroSection, setHeroSection] = useState<IHeroSectionPayload>();
  const navigate = useNavigate();
  const { fetchHeroSection, ping, updateWebsiteViews } = usePages();

  useEffect(() => {
    const promises: Promise<unknown>[] = [
      ping(setApiSignal, setApiResponses),
      updateWebsiteViews(setApiSignal, setApiResponses),
      fetchHeroSection(setApiResponses, setHeroSection),
    ];

    if (onInit) {
      const extraPromise = onInit(setApiResponses);
      if (extraPromise instanceof Promise) {
        promises.push(extraPromise);
      }
    }

    Promise.all(promises);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (apiSignal === null) return <Loader />;
  if (apiResponses.pingApi && apiResponses.updateWebsiteViewsApi && apiResponses.heroSectionApi) {
    navigate('/offline');
    return null;
  }

  return (
    <>
      <Navbar menuItems={menuItems} heroSection={heroSection} />

      {typeof children === 'function'
        ? children({ apiResponses, setApiResponses, heroSection })
        : children}

      <div ref={ref} className='w-full'>
        <Footer />
      </div>

      <BackToTopButton isVisible={inView} uri={uri} />
    </>
  );
}

const MemoizedPageLayout = React.memo(PageLayout);
export default MemoizedPageLayout;
