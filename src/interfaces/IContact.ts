import { ReactNode } from 'react';
import { IApiResponse } from '.';

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

export interface IContractProps {
  apiSignal: boolean | null;
  captchaData: any;
  setCaptchaData: React.Dispatch<React.SetStateAction<IApiResponse | undefined>>;
}
