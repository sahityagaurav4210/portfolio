import { ApiController, ApiStatus } from '../api';
import { ISkillsPageState } from '../interfaces/ISkills';
import { UseStateFunction } from '../types';

function usePages() {
  async function updateWebsiteViews(setApiSignal: UseStateFunction<boolean | null>, setter: UseStateFunction<ISkillsPageState>) {
    const controller = new ApiController();

    try {
      const rawWebsiteViewsResponse = await controller.POST('baas/website');

      if (rawWebsiteViewsResponse.status === ApiStatus.SUCCESS) {
        setApiSignal(true);
      } else {
        setApiSignal(false);
        setter((prev) => ({ ...prev, updateWebsiteViewsApi: true }));
      }
    } catch {
      setApiSignal(false);
      setter((prev) => ({ ...prev, updateWebsiteViewsApi: true }));
    }
  }

  async function ping(setApiSignal: UseStateFunction<boolean | null>, setter: UseStateFunction<ISkillsPageState>) {
    const controller = new ApiController();

    try {
      const response = await controller.GET('ping');

      if (response.status === ApiStatus.SUCCESS) {
        setApiSignal(true);
      } else {
        setApiSignal(false);
        setter((prev) => ({ ...prev, pingApi: true }));
      }
    } catch {
      setApiSignal(false);
      setter((prev) => ({ ...prev, pingApi: true }));
    }
  }

  async function fetchHeroSection(setter: UseStateFunction<ISkillsPageState>, setHeroSection: UseStateFunction<any>) {
    try {
      const controller = new ApiController();
      const heroSectionResponse = await controller.GET(`baas/home/get`);

      setHeroSection(heroSectionResponse.data);
      setter((prev) => ({ ...prev, heroSectionApi: false }));
    } catch {
      setter((prev) => ({ ...prev, heroSectionApi: true }));
    }
  }

  async function fetchProjects(
    setter?: UseStateFunction<ISkillsPageState>,
    setProject?: UseStateFunction<any>,
    type?: string | null
  ) {
    try {
      const controller = new ApiController();
      const endpoint = type ? `baas/projects/list?type=${type}` : `baas/projects/list`;
      const projectResponse = await controller.GET(endpoint);

      setProject?.(projectResponse.data);
      setter?.((prev) => ({ ...prev, projectsApi: false }));
    } catch {
      setter?.((prev) => ({ ...prev, projectsApi: true }));
    }
  }

  return { updateWebsiteViews, ping, fetchHeroSection, fetchProjects };
}

export default usePages;
