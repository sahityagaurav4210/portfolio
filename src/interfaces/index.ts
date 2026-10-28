import { ReactNode } from 'react';

export interface IHeadingProps {
  headingName: string;
  className?: string;
}
export interface IHeroProps {
  url?: string;
  heroSection?: IHeroSectionPayload;
}

export enum HiringType {
  PART_TIME = 'part time',
  FULL_TIME = 'full time',
}

export enum Currencies {
  USD = 'USD',
  INR = 'INR',
  EUR = 'EUR',
  GBP = 'GBP',
  AUD = 'AUD',
  CAD = 'CAD',
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
  responsibilities?: string[];
  width?: string;
}

export interface IAnalytics {
  totalGithubContributions: number;
  questionSolved: number;
  experience: number;
  projects: number;
}

export interface IApiResponse {
  status: string;
  message: string;
  entry_by: string;
  data: any;
}

export interface IApisResponse {
  pingApi: boolean;
  updateWebsiteViewsApi: boolean;
  getWebsiteUpdateDetailsApi: boolean;
  getPhotoUrl: boolean;
  heroSectionApi: boolean;
}

export interface ISupport {
  lastModifiedDate: string | number;
}
export interface IImageSuspenseProps {
  url: string;
}

export interface IHeroSectionPayload {
  displayName: string;
  about: string;
  activeGithubContributions: number;
  codingQuestionSolved: number;
  designation: string;
  experience: number;
  hackerrankUrl?: string;
  leetcodeUrl?: string;
  linkedInUrl?: string;
  projectsDelivered: number;
  specialization: Array<string>;
  twitterUrl?: string;
  tags?: Array<string>;
}

export interface ILogo {
  displayName?: string;
  designation?: string;
}

export interface ICodingProfileBanner {
  hackerrankUrl?: string;
  linkedInUrl?: string;
}

export interface IBacktoTopButtonProp {
  isVisible: boolean;
  uri?: string;
}
