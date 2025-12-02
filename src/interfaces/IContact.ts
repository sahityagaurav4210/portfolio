import { ReactNode } from 'react';

export interface IContract {
  first_name: string;
  last_name?: string;
  email: string;
  message: string;
  captcha: string;
}

export interface INoteProps {
  note: ReactNode;
}
