export interface INavbar {
  name?: string;
  href?: string;
}

export interface INavbarProps {
  menuItems: INavbar[];
  url: string;
}

export interface ILogo {
  logoSize: number;
}
