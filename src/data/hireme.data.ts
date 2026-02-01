import { Currencies, HiringType } from '../interfaces';
import { IHireme } from '../interfaces/IHireme';

export const initialHireMeFormData: IHireme = {
  client_email: '',
  client_name: '',
  client_project_name: '',
  tenure: 0,
  budget: '',
  hiring_type: HiringType.PART_TIME,
  message: '',
  currency_type: Currencies.INR,
  captcha: '',
  project_desc: '',
  terms: false,
};
