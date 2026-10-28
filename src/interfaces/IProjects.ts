import { UseStateFunction } from '../types';
import { ISkillsPageState } from './ISkills';

export interface IProjects {
  name: string;
  text: string;
  tech_stack: string[];
  disabled?: boolean;
  codeLink?: string;
  liveLink?: string;
  documentation_link?: string;
  ongoing?: boolean;
  note?: string;
  showDivider?: boolean;
  cardImage?: string;
  type: string;
  projectDomain?: string;
}

export interface IProjectsProps {
  projects: IProjects[];
  fetchProjects?: (
    setApiResponses: UseStateFunction<ISkillsPageState> | undefined,
    setProjects: UseStateFunction<Array<IProjects>> | undefined,
    type?: string | null
  ) => Promise<void> | void;
  setProjects?: UseStateFunction<Array<IProjects>>;
  setApiResponses?: UseStateFunction<ISkillsPageState>;
}
