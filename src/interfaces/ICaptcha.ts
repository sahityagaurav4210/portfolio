export interface ICaptchaProps {
  captchaData: any;
  isLoading: boolean;
  isValidated: boolean;
  refreshCaptcha(): Promise<void>;
  contractDetails: Record<string, any>;
  contractDetailsTextboxHandler(
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ): void;
  handleCheckBoxOnChange(event: React.ChangeEvent<HTMLInputElement>): Promise<void>;
  handleCaptchaAudioBtnClick?: () => Promise<string | null>;
}
