import { Contact2 } from 'lucide-react';
import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { IContract } from '../interfaces/IContact';
import { toast } from 'react-toastify';
import Notes from '../components/Notes';
import Progress from '../components/Progressbar';
import { API_BASE_URL, ApiController, ApiStatus, getApiHeaders } from '../api';
import { IApiResponse } from '../interfaces';
import Captcha from '../components/Captcha';
import { getAppToastConfig } from '../config';
import SimpleHeading from '../components/SimpleHeading';
import Divider from '../components/Divider';
import useAppHelperFn from '../hooks/AppHelperFn';
import InputHelperTxt from '../components/InputHelperTxt';

function Contact(): ReactNode {
  const { loadCaptchaAudio } = useAppHelperFn();
  const [captchaData, setCaptchaData] = useState<string>();
  const [captchaId, setCaptchaId] = useState();
  const [captchaAudioUrl, setCaptchaAudioUrl] = useState<string>();
  const [contractDetails, setContractDetails] = useState<IContract>({
    first_name: '',
    last_name: '',
    email: '',
    message: '',
    captcha: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isValidated, setIsValidated] = useState<boolean>(false);
  const charsLeft = useMemo(() => 254 - contractDetails.message.length, [contractDetails]);

  function contractDetailsTextboxHandler(
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setContractDetails({ ...contractDetails, [event.target.id]: event.target.value });
  }

  async function loadCaptcha() {
    const controller = new AbortController();

    setIsLoading(true);
    try {
      const timerId = setTimeout(
        () => {
          controller.abort('Captcha api timeout');
        },
        Number.parseInt(import.meta.env.VITE_BACKEND_API_TIMEOUT) || 1000
      );

      const rawCaptchaResponse = await fetch(`${API_BASE_URL}/captcha`, {
        signal: controller.signal,
        headers: getApiHeaders(),
      });

      const { data } = (await rawCaptchaResponse.json()) as IApiResponse;
      const rawCaptchaBlobResponse = await fetch(`${API_BASE_URL}${data.url}`, {
        signal: controller.signal,
        headers: getApiHeaders(),
      });
      const blob = await rawCaptchaBlobResponse.blob();

      setCaptchaData(URL.createObjectURL(blob));
      setCaptchaId(data.captchaId);
      clearTimeout(timerId);

      setCaptchaAudioUrl(await loadCaptchaAudio(data.captchaId));
    } catch {
      toast.warning('Failed to refresh the data', getAppToastConfig());
    } finally {
      setIsLoading(false);
    }
  }

  async function reloadCaptcha() {
    const controller = new AbortController();
    setIsLoading(true);

    try {
      const timerId = setTimeout(
        () => {
          controller.abort('Captcha api timeout');
        },
        Number.parseInt(import.meta.env.VITE_BACKEND_API_TIMEOUT) || 1000
      );

      const rawCaptchaResponse = await fetch(`${API_BASE_URL}/ref-captcha?captchaId=${captchaId}`, {
        signal: controller.signal,
        headers: getApiHeaders(),
      });

      const { data } = (await rawCaptchaResponse.json()) as IApiResponse;
      const rawCaptchaBlobResponse = await fetch(`${API_BASE_URL}${data.url}`, {
        signal: controller.signal,
        headers: getApiHeaders(),
      });
      const blob = await rawCaptchaBlobResponse.blob();

      setCaptchaData(URL.createObjectURL(blob));
      clearTimeout(timerId);

      setCaptchaAudioUrl(await loadCaptchaAudio(data.captchaId));
    } catch {
      toast.warning('Failed to refresh the data', getAppToastConfig());
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isLoading) return;

    if (!event.isTrusted) {
      toast.error('Unauthoritive submit, please try again!!!', getAppToastConfig());
      return;
    }

    if (!isValidated) {
      toast.warning('Please verify your captcha first', getAppToastConfig());
      return;
    }

    if (contractDetails.message.length < 10) {
      toast.warning('Message is too short. It must be at least 10 characters long.', getAppToastConfig());
      return;
    }

    if (contractDetails.message.length > 255) {
      toast.warning('Message is too long.', getAppToastConfig());
      return;
    }

    if (contractDetails.email.length < 5) {
      toast.warning('Email is too short. It must be at least 5 characters long.', getAppToastConfig());
      return;
    }

    if (contractDetails.first_name.length < 2) {
      toast.warning('First name is too short', getAppToastConfig());
      return;
    }

    if (contractDetails.last_name && contractDetails.last_name.length < 2) {
      toast.warning('Last name is too short', getAppToastConfig());
      return;
    }

    setIsLoading(true);

    const payload = { ...contractDetails, captchaId, captcha: undefined };
    const controller = new ApiController();

    const contractApiResponse = await controller.POST('baas/contract/create', payload);

    if (contractApiResponse.status === ApiStatus.SUCCESS)
      toast.success(contractApiResponse.message, getAppToastConfig());
    else toast.error(contractApiResponse.message, getAppToastConfig());

    setContractDetails({
      first_name: '',
      last_name: '',
      email: '',
      message: '',
      captcha: '',
    });

    setIsLoading(false);
    setIsValidated(false);
    await loadCaptcha();
  }

  async function handleCheckBoxOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();

    if (isLoading || !event.isTrusted || isValidated || !captchaId) return;

    const captcha = contractDetails.captcha;
    const controller = new ApiController();

    setIsLoading(true);

    const captchaValidateResponse = await controller.GET(`captcha-validate?captcha=${captcha}&captchaId=${captchaId}`);

    if (captchaValidateResponse.status === ApiStatus.SUCCESS && captchaValidateResponse.message == 'Captcha verified') {
      setIsLoading(false);
      setIsValidated(true);
      toast.success(captchaValidateResponse.message, getAppToastConfig());
      return;
    }

    if (captchaValidateResponse.status === ApiStatus.ERROR || captchaValidateResponse.status === ApiStatus.EXCEPTION) {
      await loadCaptcha();
    }

    setIsLoading(false);
    toast.error(captchaValidateResponse.message, getAppToastConfig());
  }

  async function refreshCaptcha() {
    await reloadCaptcha();
  }

  function intervalHandler(): void {
    reloadCaptcha();
  }

  useEffect(() => {
    loadCaptcha();
  }, []);

  useEffect(() => {
    let id: NodeJS.Timeout;

    if (!isValidated) {
      id = setInterval(intervalHandler, Number(import.meta.env.VITE_CAPTCHA_TIMEOUT) * 60 * 1000);
    }

    return function () {
      if (id) clearInterval(id);
    };
  }, [isValidated]);

  return (
    <div className='container mx-auto min-h-96'>
      <SimpleHeading headingName='Contact Me' />

      <div className='my-2'>
        <p className='text-sm lg:text-lg px-2 font-roboto text-justify'>
          Feel free to reach out for collaboration, project inquiries, or any opportunities. I’m always open to
          connecting and discussing new ideas. You can contact me by filling up the form given below.
        </p>
      </div>

      <Divider />

      <form
        className='px-4 py-2 mb-2 shadow-md shadow-gray-400 border-2 my-2 mx-2 border-dashed border-orange-400 rounded-md font-roboto'
        onSubmit={handleSubmit}
      >
        <div className='my-2'>
          <h1 className='text-center text-4xl font-bold underline underline-offset-4 decoration-dashed text-orange-500'>
            Contact Form
          </h1>
        </div>

        <div className='grid lg:grid-cols-2 gap-6 mb-4'>
          <div className='relative w-full'>
            <input
              type='text'
              id='first_name'
              value={contractDetails.first_name}
              required
              placeholder=' '
              className='peer h-10 w-full rounded-[4px] border border-gray-400 bg-white px-3 text-sm text-gray-900 placeholder-transparent focus:border-2 focus:border-blue-600 focus:outline-none disabled:bg-gray-100'
              onChange={contractDetailsTextboxHandler}
              autoComplete='off'
              autoCapitalize='on'
              autoFocus
            />
            <label
              htmlFor='first_name'
              className='pointer-events-none absolute left-3 top-2 origin-[0] -translate-y-4 scale-75 transform bg-white px-1 text-sm text-gray-500 duration-200 peer-placeholder-shown:top-1/3 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:bg-white'
            >
              First Name<sup className='text-red-500 text-xs'>*</sup>
            </label>

            <InputHelperTxt text='Only alphabets are allowed.' />
          </div>

          <div className='relative w-full'>
            <input
              type='text'
              id='last_name'
              value={contractDetails.last_name}
              placeholder=' '
              className='peer h-10 w-full rounded-[4px] border border-gray-400 bg-white px-3 text-sm text-gray-900 placeholder-transparent focus:border-2 focus:border-blue-600 focus:outline-none disabled:bg-gray-100'
              onChange={contractDetailsTextboxHandler}
              autoComplete='off'
              autoCapitalize='on'
            />
            <label
              htmlFor='last_name'
              className='pointer-events-none absolute left-3 top-2 origin-[0] -translate-y-4 scale-75 transform bg-white px-1 text-sm text-gray-500 duration-200 peer-placeholder-shown:top-1/3 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:bg-white'
            >
              Last Name
            </label>
            <InputHelperTxt text='Only alphabets are allowed.' />
          </div>
        </div>

        <div className='relative w-full my-2'>
          <input
            type='email'
            id='email'
            value={contractDetails.email}
            required
            placeholder=' '
            className='peer h-10 w-full rounded-[4px] border border-gray-400 bg-white px-3 text-sm text-gray-900 placeholder-transparent focus:border-2 focus:border-blue-600 focus:outline-none disabled:bg-gray-100'
            onChange={contractDetailsTextboxHandler}
            autoComplete='off'
            autoCapitalize='on'
          />
          <label
            htmlFor='email'
            className='pointer-events-none absolute left-3 top-2 origin-[0] -translate-y-4 scale-75 transform bg-white px-1 text-sm text-gray-500 duration-200 peer-placeholder-shown:top-1/3 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:bg-white'
          >
            Email<sup className='text-red-500 text-xs'>*</sup>
          </label>

          <InputHelperTxt text='Please enter a valid email address.' />
        </div>

        <div className='relative w-full'>
          <textarea
            id='message'
            value={contractDetails.message}
            placeholder=' '
            rows={2}
            className='peer p-2 min-h-10 w-full rounded-[4px] border border-gray-400 bg-white px-3 text-sm text-gray-900 placeholder-transparent focus:border-2 focus:border-blue-600 focus:outline-none disabled:bg-gray-100 resize-y'
            onChange={contractDetailsTextboxHandler}
            autoComplete='off'
          />
          <label
            htmlFor='message'
            className='pointer-events-none absolute left-3 top-2 origin-[0] -translate-y-4 scale-75 transform bg-white px-1 text-sm text-gray-500 duration-200 peer-placeholder-shown:top-1/3 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:bg-white'
          >
            Message<sup className='text-red-500 text-xs'>*</sup>
          </label>

          <InputHelperTxt text='Please enter your message. It should be atleast of 10 characters and can be of atmost 254 characters.' />
        </div>

        <div className='flex items-center justify-end'>
          <p className='text-caption text-blue-400 font-bold'>{charsLeft} characters left</p>
        </div>

        <p className='text-sm lg:text-base text-justify leading-10 uppercase text-blue-700 font-extrabold underline underline-offset-2 my-1'>
          Please prove your identity
        </p>

        <Captcha
          captchaData={captchaData}
          contractDetails={contractDetails}
          contractDetailsTextboxHandler={contractDetailsTextboxHandler}
          handleCheckBoxOnChange={handleCheckBoxOnChange}
          isLoading={isLoading}
          isValidated={isValidated}
          refreshCaptcha={refreshCaptcha}
          captchaAudioUrl={captchaAudioUrl}
        />

        <div className='flex flex-col justify-center mb-4'>
          <Notes
            note={
              <p className='text-xs text-justify'>
                All fields marked with asterik <span className='text-red-500 font-bold'>(*)</span> are mandatory to
                fill.
              </p>
            }
          />
          <Notes note={<p className='text-xs text-justify'>Please do not send unnecessary and clumsy messages.</p>} />
          <Notes note={<p className='text-xs text-justify'>Your message must be atleast 10 characters long.</p>} />
          <Notes
            note={
              <p className='text-xs text-justify'>You will be contacted within 48 hours after filling up this form.</p>
            }
          />
          <Notes
            note={
              <p className='text-xs text-justify'>
                Please provide a valid email address as it would be used for further communication purposes.
              </p>
            }
          />
        </div>

        <div className='flex items-center mt-4'>
          <button
            disabled={isLoading || !isValidated || !captchaId || charsLeft < 0 || contractDetails.message.length < 10}
            type='submit'
            className='min-w-28 transition-transform duration-500 mt-2 inline-flex items-center px-2 py-3.5 border-2 border-dashed border-blue-400 border-spacing-2 justify-center font-bold text-white bg-blue-800 rounded-lg ring-2 ring-offset-1 ring-blue-400 scale-95 focus:scale-100 outline-none text-sm lg:text-base shadow-md shadow-blue-800 disabled:bg-slate-700 disabled:border-slate-600 disabled:ring-slate-400'
          >
            {isLoading ? (
              <>
                <Progress />
                <span>Loading, please wait...</span>
              </>
            ) : (
              <>
                <Contact2 className='mx-2' />
                <span>Contact Me</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default React.memo(Contact);
