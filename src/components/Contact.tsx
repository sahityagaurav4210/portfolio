import { CircleCheck, Contact2, Headphones, Loader2, RefreshCcw } from 'lucide-react';
import Heading from './Heading';
import React, { useEffect, useState } from 'react';
import { IContract, IContractProps } from '../interfaces/IContact';
import { toast } from 'react-toastify';
import Notes from './Notes';
import Progress from './Progressbar';
import { API_BASE_URL, HTTP_VERBS } from '../api';
import { IApiResponse } from '../interfaces';
import Validated from './Validated';

function Contact({ apiSignal, captchaData, setCaptchaData }: IContractProps) {
  const [contractDetails, setContractDetails] = useState<IContract>({
    first_name: '',
    last_name: '',
    email: '',
    message: '',
    captcha: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const [isValidated, setIsValidated] = useState<boolean>(false);

  let text = captchaData?.captcha || '';
  const utterance = new SpeechSynthesisUtterance();
  utterance.lang = 'hi-In';
  utterance.pitch = 1;
  utterance.rate = 1;
  utterance.volume = 1;
  utterance.text = text ? text[index] : '';

  function contractDetailsTextboxHandler(
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setContractDetails({ ...contractDetails, [event.target.id]: event.target.value });
  }

  async function loadCaptcha() {
    const controller = new AbortController();

    setIsLoading(true);
    try {
      const timerId = setTimeout(() => {
        controller.abort('Captcha api timeout');
      }, parseInt(import.meta.env.VITE_BACKEND_API_TIMEOUT) || 1000);

      const rawCaptchaResponse = await fetch(`${API_BASE_URL}/captcha`, {
        signal: controller.signal,
      });
      clearTimeout(timerId);
      const { data } = (await rawCaptchaResponse.json()) as IApiResponse;

      setCaptchaData(data);
    } catch (error: any) {
      toast.warning('Failed to refresh the data', { autoClose: 2000, theme: 'dark' });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isValidated) {
      toast.warning('Please verify your captcha first', { autoClose: 2000, theme: 'dark' });
      return;
    }

    const abortController = new AbortController();

    if (isLoading) {
      return;
    }

    if (contractDetails.message.length < 11) {
      toast.warning('Message is too short. It must be atleast 10 characters long.', { autoClose: 2000, theme: 'dark' });
      return;
    }

    if (contractDetails.email.length < 6) {
      toast.warning('Email is too short.It must be atleast 5 characters long.', { autoClose: 2000, theme: 'dark' });
      return;
    }

    if (contractDetails.first_name.length < 2) {
      toast.warning('First name is too short', { autoClose: 2000, theme: 'dark' });
      return;
    }

    if (contractDetails.last_name && contractDetails.last_name.length < 2) {
      toast.warning('Last name is too short', { autoClose: 2000, theme: 'dark' });
      return;
    }

    if (contractDetails.captcha !== captchaData.captcha) {
      toast.warning('Invalid captcha', { autoClose: 2000, theme: 'dark' });
      return;
    }

    setIsLoading(true);
    if (!apiSignal) {
      setIsLoading(false);
      toast.error("Sorry, our backend isn't responding, please refresh the page");
    } else {
      const timerId = setTimeout(() => {
        abortController.abort('Contract api timeout');
      }, parseInt(import.meta.env.VITE_BACKEND_API_TIMEOUT) || 1000);

      try {
        const apiRawResponse = await fetch(`${API_BASE_URL}/baas/contract/create`, {
          method: HTTP_VERBS.POST,
          headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': import.meta.env.VITE_BACKEND_TOKEN,
            Accept: '*/*',
          },
          body: JSON.stringify(contractDetails),
          signal: abortController.signal,
        });
        clearTimeout(timerId);

        const response = await apiRawResponse.json();

        if (apiRawResponse.ok) {
          toast.success(response.message, { autoClose: 2000, theme: 'dark' });
          setContractDetails({
            first_name: '',
            last_name: '',
            email: '',
            message: '',
            captcha: '',
          });
        } else toast.error(response.message, { autoClose: 2000, theme: 'dark' });
      } catch (error: unknown) {
        if (typeof error === 'string') console.log(error);
        else console.error('An error occured');
      } finally {
        setIsLoading(false);
        setIsValidated(false);
        await loadCaptcha();
      }
    }
  }

  async function handleCheckBoxOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();

    const captcha = contractDetails.captcha;
    const captchaToken = captchaData?.token;

    setIsLoading(true);

    const rawCaptchaValidateResponse = await fetch(
      `${API_BASE_URL}/captcha-validate?captcha=${captcha}&captchaToken=${captchaToken}`
    );
    const captchaValidateResponse = await rawCaptchaValidateResponse.json();

    if (rawCaptchaValidateResponse.ok && captchaValidateResponse.message == 'Captcha verified') {
      setIsLoading(false);
      setIsValidated(true);

      toast.success(captchaValidateResponse.message, { autoClose: 2000, theme: 'dark' });
    } else {
      setIsLoading(false);

      toast.error(captchaValidateResponse.message, { autoClose: 2000, theme: 'dark' });
    }
  }

  async function refreshCaptcha(event: any) {
    event.preventDefault();
    await loadCaptcha();
  }

  useEffect(() => {
    if (index > 0 && index < text.length) {
      setTimeout(() => {
        utterance.text = text[index];
        window.speechSynthesis.speak(utterance);
        setIndex(index + 1);
      }, 500);
    }

    if (index >= text.length) setIndex(0);
  }, [index]);

  return (
    <>
      <Heading headingName='Contact Me' className='mb-5 text-3xl lg:text-7xl' />

      <section className='container mx-auto min-h-96'>
        <p className='text-sm lg:text-lg px-2 font-roboto'>Have something in mind, contact me.</p>
        <form
          className='p-4 mb-2 shadow-md shadow-gray-400 border-2 my-2 mx-2 border-dashed font-roboto'
          onSubmit={(event) => handleSubmit(event)}
        >
          {/* {Name} */}
          <div className='grid lg:grid-cols-2 gap-6 mb-4'>
            {/* {FirstName} */}
            <fieldset className='border rounded-sm border-blue-400 outline-none px-2 text-sm lg:text-lg ring-2 ring-offset-1 ring-blue-200 transistion-all min-w-full placeholder:text-orange-400 placeholder:font-bold scale-95 focus-within:scale-100'>
              <legend className='px-2 text-blue-800 bg-white font-bold'>
                First Name <span className='text-red-600'>*</span>
              </legend>
              <input
                type='text'
                id='first_name'
                placeholder='First Name'
                minLength={2}
                inputMode='text'
                className='p-2 min-h-10 min-w-full outline-none placeholder:text-orange-400 placeholder:font-bold'
                required
                value={contractDetails.first_name}
                onChange={(event) => contractDetailsTextboxHandler(event)}
                pattern='^[a-zA-Z]{2,}$'
              />
            </fieldset>

            {/* {LastName} */}
            <fieldset className='border rounded-sm border-blue-400 outline-none px-2 text-sm lg:text-lg ring-2 ring-offset-1 ring-blue-200 transistion-all min-w-full scale-95 focus-within:scale-100'>
              <legend className='px-2 text-blue-800 bg-white font-bold'>Last Name</legend>
              <input
                type='text'
                id='last_name'
                placeholder='Last Name'
                minLength={2}
                inputMode='text'
                className='p-2 min-h-10 min-w-full outline-none placeholder:text-orange-400 placeholder:font-bold'
                value={contractDetails.last_name}
                onChange={(event) => contractDetailsTextboxHandler(event)}
                pattern='^[a-zA-Z]{2,}$'
              />
            </fieldset>
          </div>

          {/* {Email & Message} */}
          <div className='grid lg:grid-cols-2 mb-4 gap-6'>
            <fieldset className='border rounded-sm border-blue-400 outline-none px-2 text-sm lg:text-lg ring-2 ring-offset-1 ring-blue-200 transistion-all min-w-full scale-95 focus-within:scale-100'>
              <legend className='px-2 text-blue-800 bg-white font-bold'>
                Email <span className='text-red-500'>*</span>
              </legend>
              <input
                type='email'
                placeholder='Email'
                minLength={2}
                inputMode='email'
                className='min-h-10 p-2 outline-none w-full placeholder:text-orange-400 placeholder:font-bold'
                required
                id='email'
                value={contractDetails.email}
                onChange={(event) => contractDetailsTextboxHandler(event)}
              />
            </fieldset>

            <fieldset className='border rounded-sm border-blue-400 outline-none px-2 text-sm lg:text-lg ring-2 ring-offset-1 ring-blue-200 transistion-all min-w-full scale-95 focus-within:scale-100'>
              <legend className='px-2 text-blue-800 bg-white font-bold'>
                Message <span className='text-red-500'>*</span>
              </legend>
              <textarea
                id='message'
                required
                placeholder='Your message...'
                value={contractDetails.message}
                onChange={(event) => contractDetailsTextboxHandler(event)}
                className='outline-none p-2 w-full resize-none placeholder:text-orange-400 placeholder:font-bold'
              ></textarea>
            </fieldset>
          </div>

          {/* {Captcha} */}
          <div className='grid grid-cols-12 gap-2 min-h-20 mb-4'>
            <div className='col-span-8 lg:col-span-2 border border-dotted border-gray-400 rounded-md pointer-events-none flex items-center justify-center font-cookie text-5xl bg-cyan-950 text-gray-600 p-1'>
              {captchaData?.captchaArray?.map((data: any, index: number) => {
                return (
                  <p className={`inline-block ${data?.degree} mx-1`} key={index}>
                    {data.letter}
                  </p>
                );
              })}
            </div>
            <div className='col-span-4 lg:col-span-1 flex items-center justify-center gap-2'>
              {!isLoading ? (
                <button
                  className='border transition-all p-2 rounded-md bg-orange-900 border-orange-500 border-spacing-2 ring-1 ring-offset-1 ring-orange-400 cursor-pointer focus:outline-dotted outline-orange-300 scale-95 focus-within:scale-100'
                  type='button'
                  disabled={isValidated}
                  onClick={(event) => refreshCaptcha(event)}
                >
                  <RefreshCcw className='text-white' />
                </button>
              ) : (
                <Progress />
              )}

              {!index ? (
                <button
                  className='transition-all border p-2 rounded-md bg-blue-900 border-blue-500 border-spacing-2 ring-1 ring-offset-1 ring-blue-400 cursor-pointer focus:outline-dotted outline-blue-400 scale-95 focus-within:scale-100'
                  disabled={!!index || isValidated}
                  onClick={(event) => {
                    event.preventDefault();

                    if ('speechSynthesis' in window) {
                      window.speechSynthesis.speak(utterance);
                      setIndex(index + 1);
                    } else {
                      alert('Text-to-speech is not supported in this browser.');
                    }
                  }}
                >
                  <Headphones className='text-white' />
                </button>
              ) : (
                <Progress />
              )}
            </div>
            <div className='col-span-6 lg:col-span-7'>
              <fieldset className='border rounded-sm border-blue-400 outline-none px-2 text-sm lg:text-lg ring-2 ring-offset-1 ring-blue-200 transistion-all scale-95 focus-within:scale-100 min-w-full'>
                <legend className='px-2 text-blue-800 bg-white font-bold'>
                  Captcha <span className='text-red-500'>*</span>
                </legend>
                <input
                  type='text'
                  placeholder='Captcha'
                  minLength={2}
                  readOnly={isValidated}
                  inputMode='text'
                  className='min-h-10 p-2 outline-none w-full placeholder:text-orange-400 placeholder:font-bold'
                  required
                  id='captcha'
                  value={contractDetails.captcha}
                  onChange={(event) => contractDetailsTextboxHandler(event)}
                />
              </fieldset>
            </div>

            <div className='col-span-6 lg:col-span-2 flex items-center justify-center'>
              {!isValidated ? (
                <>
                  {!isLoading ? (
                    <>
                      <div className='relative flex items-center justify-center'>
                        <input
                          type='checkbox'
                          id='validate'
                          className='appearance-none text-blue-500 transition-all border border-blue-500 border-spacing-4 ring-1 ring-offset-1 ring-blue-400 scale-95 rounded-md mx-2 h-8 w-8 checked:bg-blue-700 checked:scale-100 checked:before:content'
                          onChange={handleCheckBoxOnChange}
                        />{' '}
                        <CircleCheck className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white' />
                      </div>
                      <label htmlFor='validate' className='cursor-pointer text-sm lg:text-lg font-bold font-roboto'>
                        I'm not a robot
                      </label>
                    </>
                  ) : (
                    <Progress />
                  )}
                </>
              ) : (
                <Validated />
              )}
            </div>
          </div>

          {/* {Notes} */}
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
                <p className='text-xs text-justify'>
                  You will be contacted within 48 hours after filling up this form.
                </p>
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
            {!isLoading ? (
              <button
                disabled={isLoading || !isValidated}
                type='submit'
                className='border-2 border-dashed border-blue-400 transition-transform scale-95 duration-500 inline-flex p-4 outline-none bg-blue-900 disabled:bg-blue-700 text-white rounded-lg font-bold focus:scale-100 shadow-lg ring-2 ring-offset-1 ring-blue-400 shadow-blue-400'
              >
                {!isLoading ? (
                  <>
                    <Contact2 className='mx-2' /> Contact Me
                  </>
                ) : (
                  <>
                    <Loader2 className='mx-2' /> Loading, please wait...
                  </>
                )}
              </button>
            ) : (
              <Progress />
            )}
          </div>
        </form>
      </section>
    </>
  );
}

export default React.memo(Contact);
