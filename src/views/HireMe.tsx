import React, { ReactNode, useCallback, useMemo, useState } from 'react';
import { IndianRupee } from 'lucide-react';
import { IHireme } from '../interfaces/IHireme';
import { Currencies, HiringType } from '../interfaces';
import { toast } from 'react-toastify';
import { HIRING_FULL_TIME_MSG, HIRING_PART_TIME_MSG } from '../constants';
import { API_BASE_URL, getApiHeaders, HTTP_VERBS } from '../api';
import { getAppToastConfig } from '../config';
import SimpleHeading from '../components/SimpleHeading';
import Divider from '../components/Divider';
import { initialHireMeFormData } from '../data';
import useCaptcha from '../hooks/useCaptcha';
import { FloatingInput, FloatingTextarea } from '../components/FloatingInput';
import FormNotes from '../components/FormNotes';
import CaptchaSection from '../components/CaptchaSection';
import FormSubmitButton from '../components/FormSubmitButton';
import InputHelperTxt from '../components/InputHelperTxt';

function HireMe(): ReactNode {
  const {
    captchaData,
    captchaId,
    isLoading,
    setIsLoading,
    isValidated,
    setIsValidated,
    loadCaptcha,
    refreshCaptcha,
    handleCaptchaAudioBtnClick,
    handleCheckBoxOnChange,
  } = useCaptcha();

  const [hiremeDetails, setHiremeDetails] = useState<IHireme>(initialHireMeFormData);

  const projectDescCharRemaining = useMemo(
    () => 254 - (hiremeDetails.project_desc ? hiremeDetails.project_desc.length : 0),
    [hiremeDetails.project_desc]
  );

  const handleInputOnChange = useCallback(function (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    event.preventDefault();
    setHiremeDetails((prev) => ({ ...prev, [event.target.id]: event.target.value }));
  }, []);

  const handleSwitchOnChange = useCallback(function (event: React.ChangeEvent<HTMLInputElement>) {
    setHiremeDetails((prev) => ({ ...prev, [event.target.id]: event.target.checked }));
  }, []);

  const contractDetailsTextboxHandler = useCallback(function (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setHiremeDetails((prev) => ({ ...prev, [event.target.id]: event.target.value }));
  }, []);

  const onCaptchaCheckboxChange = useCallback(
    function (event: React.ChangeEvent<HTMLInputElement>) {
      return handleCheckBoxOnChange(hiremeDetails.captcha, event);
    },
    [handleCheckBoxOnChange, hiremeDetails.captcha]
  );

  async function handleSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();

    if (!event.isTrusted) {
      toast.error('Unauthoritive submit, please try again!!!', getAppToastConfig());
      return;
    }

    if (!hiremeDetails.tenure && hiremeDetails.hiring_type === HiringType.PART_TIME) {
      toast.warning('Please enter valid contract period.', getAppToastConfig());
      return;
    }

    if (!hiremeDetails.terms) {
      toast.warning('Please accept our declaration.', getAppToastConfig());
      return;
    }

    if (!isValidated) {
      toast.warning("Please prove you're human by solving the captcha.", getAppToastConfig());
      return;
    }

    let message = '';

    if (hiremeDetails.hiring_type === HiringType.FULL_TIME) {
      message = HIRING_FULL_TIME_MSG.replace(/:client-name/gi, hiremeDetails.client_name);
      message = message.replace(/:client-email/, hiremeDetails.client_email);
      message = message.replace(/:client-project-name/, hiremeDetails.client_project_name);
      message = message.replace(/:budget/, hiremeDetails.budget);
      message = message.replace(/:hiring-type/, hiremeDetails.hiring_type);
      message = message.replace(/:currency/, hiremeDetails.currency_type);
    } else {
      message = HIRING_PART_TIME_MSG.replace(/:client-name/gi, hiremeDetails.client_name);
      message = message.replace(/:client-email/, hiremeDetails.client_email);
      message = message.replace(/:client-project-name/, hiremeDetails.client_project_name);
      message = message.replace(/:budget/, hiremeDetails.budget);
      message = message.replace(/:hiring-type/, hiremeDetails.hiring_type);
      message = message.replace(/:tenure/, hiremeDetails.tenure?.toString() || '');
      message = message.replace(/:currency/, hiremeDetails.currency_type);
    }

    const payload = {
      ...hiremeDetails,
      message,
      budget: `${hiremeDetails.currency_type} ${hiremeDetails.budget}/-`,
      currency_type: undefined,
      captchaId,
      captcha: undefined,
    };

    if (payload.client_name.length < 2) {
      toast.warning('Client name is too short. It must be atleast 2 characters long.', {
        autoClose: 2000,
        theme: 'dark',
      });
      return;
    }

    if (payload.client_email.length < 5) {
      toast.warning('Client email address is too short. It must be atleast 5 characters long.', {
        autoClose: 2000,
        theme: 'dark',
      });
      return;
    }

    if (payload.client_project_name.length < 2) {
      toast.warning('Client project name is too short. It must be atleast 2 characters long.', {
        autoClose: 2000,
        theme: 'dark',
      });
      return;
    }

    if (!/^[0-9.]+$/g.test(hiremeDetails.budget)) {
      toast.warning('Please enter your budget amount in numbers or decimal.', {
        autoClose: 2000,
        theme: 'dark',
      });
      return;
    }

    setIsLoading(true);
    const abortController = new AbortController();
    const timerId = setTimeout(
      () => {
        abortController.abort('Timeout');
      },
      Number.parseInt(import.meta.env.VITE_BACKEND_API_TIMEOUT) || 1000
    );

    try {
      const apiRawResponse = await fetch(`${API_BASE_URL}/baas/hiring/add`, {
        method: HTTP_VERBS.POST,
        headers: { ...getApiHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: abortController.signal,
      });
      clearTimeout(timerId);

      const response = await apiRawResponse.json();

      if (apiRawResponse.ok) {
        toast.success(response.message, getAppToastConfig());
      } else {
        toast.error(response.message, getAppToastConfig());
      }
    } catch (error: unknown) {
      toast.error((error as Error)?.message || 'An error occured', getAppToastConfig());
    } finally {
      await loadCaptcha();
      setHiremeDetails(initialHireMeFormData);
      setIsValidated(false);
      setIsLoading(false);
    }
  }

  return (
    <div className='container mx-auto'>
      <SimpleHeading headingName='Hire Me' />

      <p className='text-sm lg:text-lg my-2 mx-2 xl:mx-1 font-roboto text-justify'>
        I hope you've liked my projects which I have worked on. I also do side projects and if there's a project for me
        then you can directly hire me as a freelance software developer. Please fill the form to do so.
      </p>

      <Divider />

      <form className='p-4 my-4 border-2 font-roboto border-dashed rounded-md flex flex-col justify-center mx-2 xl:mx-1 shadow-md shadow-gray-400 border-orange-300'>
        <h1 className='text-center text-4xl font-bold underline underline-offset-4 decoration-dashed text-orange-500'>
          Hiring Form
        </h1>

        <div className='grid grid-cols-12 my-2'>
          <div className='col-span-12 lg:col-span-4 flex items-center'>
            <label htmlFor='hiring_type' className='font-bold'>
              Hiring Type
            </label>
            <select
              className='p-2 bg-transparent outline-none m-2 min-w-20 border-2 border-dashed border-slate-400 focus:border-blue-800 text-align-center'
              id='hiring_type'
              value={hiremeDetails.hiring_type}
              onChange={(event) => setHiremeDetails({ ...hiremeDetails, [event.target.id]: event.target.value })}
            >
              <option value={HiringType.FULL_TIME}>Full time</option>
              <option value={HiringType.PART_TIME}>Part time</option>
            </select>
          </div>

          {hiremeDetails.hiring_type === HiringType.PART_TIME && (
            <div className='col-span-12 lg:col-span-5 flex items-center'>
              <FloatingInput
                type='number'
                id='tenure'
                value={hiremeDetails.tenure}
                onChange={handleInputOnChange}
                autoComplete='off'
                label='Tenure (in months)'
                helperText='Please enter the contract period in months.'
              />
            </div>
          )}
        </div>

        <div className='my-2'>
          <div className='grid grid-cols-12 gap-2 mb-2'>
            <div className='col-span-12 lg:col-span-6'>
              <FloatingInput
                type='text'
                id='client_name'
                value={hiremeDetails.client_name}
                isRequired
                required
                onChange={handleInputOnChange}
                autoComplete='off'
                autoCapitalize='on'
                label='Client Name'
                helperText='Only alphabets, spaces and punctuations like comma, period, dash, parenthesis and forward slash are allowed.'
              />
            </div>

            <div className='col-span-12 lg:col-span-6'>
              <FloatingInput
                type='text'
                id='client_project_name'
                value={hiremeDetails.client_project_name}
                isRequired
                onChange={handleInputOnChange}
                autoComplete='off'
                label='Project Name'
                helperText='Only alphabets, spaces and punctuations like comma, period, dash, parenthesis and forward slash are allowed.'
              />
            </div>
          </div>

          <div className='grid grid-cols-12 gap-2 mb-2'>
            <div className='col-span-12 lg:col-span-6 flex items-center'>
              <FloatingInput
                type='email'
                id='client_email'
                inputMode='email'
                value={hiremeDetails.client_email}
                isRequired
                onChange={handleInputOnChange}
                autoComplete='off'
                label='Client Email'
                helperText='Please enter a valid email address.'
              />
            </div>

            <div className='col-span-12 lg:col-span-6 flex items-center'>
              <div className='flex items-center'>
                <select
                  className='p-2 bg-transparent outline-none m-2 min-w-5 border-2 border-dashed border-blue-800 text-align-center text-blue-800'
                  id='currency_type'
                  value={hiremeDetails.currency_type}
                  onChange={(event) => setHiremeDetails({ ...hiremeDetails, [event.target.id]: event.target.value })}
                >
                  <option value={Currencies.INR}>INR (₹)</option>
                  <option value={Currencies.USD}>USD ($)</option>
                  <option value={Currencies.EUR}>EURO (€)</option>
                  <option value={Currencies.GBP}>GBP (£)</option>
                  <option value={Currencies.AUD}>AUD ($)</option>
                </select>
              </div>

              <div className='flex items-center w-full'>
                <div className='relative w-full'>
                  <input
                    type='number'
                    id='budget'
                    inputMode='decimal'
                    value={hiremeDetails.budget}
                    placeholder=' '
                    className='peer h-10 w-full rounded-[4px] border border-gray-400 bg-white px-3 text-sm text-gray-900 placeholder-transparent focus:border-2 focus:border-blue-600 focus:outline-none disabled:bg-gray-100'
                    onChange={handleInputOnChange}
                    autoComplete='off'
                  />
                  <label
                    htmlFor='budget'
                    className='pointer-events-none absolute left-3 top-2 origin-[0] -translate-y-4 scale-75 transform bg-white px-1 text-sm text-gray-500 duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:bg-white'
                  >
                    Budget<sup className='text-red-500 text-xs'>*</sup>
                  </label>

                  <InputHelperTxt text='Please enter a valid budget amount.' />
                </div>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-12'>
            <div className='col-span-12'>
              <FloatingTextarea
                id='project_desc'
                value={hiremeDetails.project_desc}
                rows={2}
                onChange={handleInputOnChange}
                autoComplete='off'
                label='Project Description'
                isRequired
                helperText='Please enter your project description. It can be of atmost 254 characters.'
              />

              <div className='flex items-center justify-end'>
                <p className='text-xs font-bold text-blue-400'>{projectDescCharRemaining} characters remaining</p>
              </div>
            </div>
          </div>
        </div>

        <p className='text-sm lg:text-base text-justify leading-10 uppercase text-blue-700 font-extrabold underline underline-offset-2'>
          Declarations
        </p>

        <ol className='text-sm list-inside list-decimal lg:text-base text-justify leading-10 font-bold mb-2'>
          <li className='text-wrap'>
            I/We acknowledge that before the commencement of work, a formal{' '}
            <span className='text-blue-700'>Business Requirements Specification (BRS)</span> document will be shared.
            This BRS shall serve as the sole, authoritative reference and proof of all requirements requested by the
            Client for the Project. The BRS shall be provided by the Client; however, if the Client does not provide
            this document, the Service Provider (Contractor) shall prepare and submit the BRS for the Client's formal
            approval.
          </li>

          <li className='text-wrap'>
            I/We acknowledge and agree that upon the formal freezing of the project requirements, as defined by the
            approved BRS, any subsequent request for modifications, particularly those resulting in a significant,
            breaking change to the established architecture or scope of work, shall be treated as a separate engagement
            and will incur additional professional service fees calculated on a charged basis, to be mutually agreed
            upon prior to implementation.
          </li>
        </ol>

        <CaptchaSection
          captchaData={captchaData}
          contractDetails={hiremeDetails}
          contractDetailsTextboxHandler={contractDetailsTextboxHandler}
          handleCheckBoxOnChange={onCaptchaCheckboxChange}
          isLoading={isLoading}
          isValidated={isValidated}
          refreshCaptcha={refreshCaptcha}
          handleCaptchaAudioBtnClick={handleCaptchaAudioBtnClick}
        />

        <label className='flex items-center cursor-pointer my-2 flex-wrap'>
          <input
            type='checkbox'
            id='terms'
            className='sr-only peer'
            checked={hiremeDetails.terms}
            onChange={handleSwitchOnChange}
          />

          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-800"></div>

          <span className='ms-3 text-sm font-extrabold text-gray-900 text-justify my-1 sm:my-0'>
            I have read and understood the above declaration, and I accept its terms.
          </span>
        </label>

        <FormNotes
          customNotes={[
            <p key='note-project' className='text-xs text-justify'>
              Project name must be atleast 2 characters long.
            </p>,
            <p key='note-captcha' className='text-xs text-justify'>
              Captcha is mandatory to fill.
            </p>,
          ]}
        />

        <FormSubmitButton
          isLoading={isLoading}
          disabled={!isValidated || !hiremeDetails.terms || isLoading || !captchaId || projectDescCharRemaining < 0}
          onClick={handleSubmit}
          icon={<IndianRupee size={16} absoluteStrokeWidth className='mr-1' />}
        >
          Hire Me
        </FormSubmitButton>
      </form>
    </div>
  );
}

const MemoizedHireMe = React.memo(HireMe);
export default MemoizedHireMe;
