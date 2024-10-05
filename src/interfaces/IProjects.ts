export interface IProjects {
  name: string;
  text: string;
  tech_stack: string[];
  disabled?: boolean;
  codeLink?: string;
  liveLink?: string;
  documentation_link?: string;
  ongoing?: boolean;
}

export interface IProjectsProps {
  projects: IProjects[];
  personal_projects: IProjects[];
}
