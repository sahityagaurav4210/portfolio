import { ReactNode } from 'react';

export interface IHeadingProps {
  headingName: string;
  className?: string;
}
export interface IHeroProps {
  url?: string;
}
export enum HiringType {
  PART_TIME = 'part time',
  FULL_TIME = 'full time',
}

export interface ITagsProps {
  labelName: string;
  content: string | ReactNode;
}

export interface IExperienceCardProps {
  companyLogo: string;
  tags: ITagsProps[];
  description?: string;
  isCurrent?: boolean;
}
