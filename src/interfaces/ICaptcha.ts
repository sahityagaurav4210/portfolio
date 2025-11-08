import { IContract } from "./IContact";

export interface ICaptchaProps {
  captchaData: any;
  isLoading: boolean;
  isValidated: boolean;
  refreshCaptcha(event: any): Promise<void>;
  contractDetails: IContract;
  contractDetailsTextboxHandler(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>): void;
  handleCheckBoxOnChange(event: React.ChangeEvent<HTMLInputElement>): Promise<void>
}