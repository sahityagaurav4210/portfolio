import { Contact2, Loader2 } from 'lucide-react';
import Heading from './Heading';
import React, { useState } from 'react';
import { IContract, IContractProps } from '../interfaces/IContact';
import { toast } from 'react-toastify';
import Notes from './Notes';
import Progress from './Progressbar';

function Contact({ apiSignal }: IContractProps) {
  const [contractDetails, setContractDetails] = useState<IContract>({
    first_name: '',
    last_name: '',
    email: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function contractDetailsTextboxHandler(
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setContractDetails({ ...contractDetails, [event.target.id]: event.target.value });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const abortController = new AbortController();

    if (isLoading) {
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
        const apiRawResponse = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/baas/contract/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            x_api_key: import.meta.env.VITE_BACKEND_TOKEN,
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
          });
        } else toast.error(response.message, { autoClose: 2000, theme: 'dark' });
      } catch (error: unknown) {
        if (typeof error === 'string') console.log(error);
        else console.error('An error occured');
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <>
      <Heading headingName='Contact Me' className='mb-5 text-3xl lg:text-7xl' />

      <section className='container mx-auto min-h-96'>
        <p className='text-sm lg:text-lg px-2'>Have something in mind, contact me</p>
        <form className='p-4 mb-2 shadow-sm border-2 my-2 mx-1 border-dashed' onSubmit={(event) => handleSubmit(event)}>
          <div className='grid lg:grid-cols-2 gap-6 mb-4'>
            <fieldset className='border rounded-sm border-blue-400 outline-none px-2 text-sm lg:text-lg ring-2 ring-offset-1 ring-blue-200 transistion-all focus-within:scale-105 min-w-full placeholder:text-orange-400 placeholder:font-bold'>
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

            <fieldset className='border rounded-sm border-blue-400 outline-none px-2 text-sm lg:text-lg ring-2 ring-offset-1 ring-blue-200 transistion-all focus-within:scale-105 min-w-full'>
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

          <div className='grid lg:grid-cols-2 mb-4 gap-6'>
            <fieldset className='border rounded-sm border-blue-400 outline-none px-2 text-sm lg:text-lg ring-2 ring-offset-1 ring-blue-200 transistion-all focus-within:scale-105 min-w-full'>
              <legend className='px-2 text-blue-800 bg-white font-bold'>
                Email <span className='text-red-500'>*</span>
              </legend>
              <input
                type='text'
                placeholder='Email'
                minLength={2}
                inputMode='text'
                className='min-h-10 p-2 outline-none w-full placeholder:text-orange-400 placeholder:font-bold'
                required
                id='email'
                value={contractDetails.email}
                onChange={(event) => contractDetailsTextboxHandler(event)}
              />
            </fieldset>

            <fieldset className='border rounded-sm border-blue-400 outline-none px-2 text-sm lg:text-lg ring-2 ring-offset-1 ring-blue-200 transistion-all focus-within:scale-105 min-w-full'>
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

          <div className='flex flex-col justify-center mb-4'>
            <Notes
              note={
                <p className='text-xs text-justify'>
                  All fields marked with asterik <span className='text-red-500'>(*)</span> are mandatory to fill.
                </p>
              }
            />
            <Notes note={<p className='text-xs text-justify'>Please do not send unnecessary and clumsy messages.</p>} />
          </div>

          <div className='flex items-center mt-4'>
            {!isLoading ? (
              <button
                disabled={isLoading}
                type='submit'
                className='border transition-all scale-95 inline-flex p-4 outline-none bg-blue-800 text-white rounded-lg font-bold focus:scale-105 shadow-lg shadow-blue-300 border-blue-200 ring-2 ring-offset-1 ring-blue-300'
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

export default Contact;
