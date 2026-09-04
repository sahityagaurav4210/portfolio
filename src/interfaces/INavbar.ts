import { IHeroSectionPayload } from '.';

export interface INavbar {
  name?: string;
  href?: string;
}

export interface INavbarProps {
  menuItems: INavbar[];
  heroSection?: IHeroSectionPayload;
}

export interface ILogo {
  logoSize: number;
}
