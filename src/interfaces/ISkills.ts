export interface ISkills {
  name: string;
  text: string;
  picture: string;
  experience?: string;
}

export interface ISkillsProps {
  skills: ISkills[];
}

export interface ISkillsPageState {
  pingApi: boolean;
  updateWebsiteViewsApi: boolean;
  heroSectionApi: boolean;
  projectsApi?: boolean;
}
