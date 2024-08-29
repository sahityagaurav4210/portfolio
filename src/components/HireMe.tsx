import React, { ReactNode, useState } from 'react';
import Heading from './Heading';
import { Send } from 'lucide-react';
import Notes from './Notes';
import { IHireme } from '../interfaces/IHireme';
import { HiringType } from '../interfaces';
import Progress from './Progressbar';
import { toast } from 'react-toastify';
import { HIRING_FULL_TIME_MSG, HIRING_PART_TIME_MSG } from '../constants';
import { API_BASE_URL, HTTP_VERBS } from '../api';

function HireMe(): ReactNode {
  const [hiremeDetails, setHiremeDetails] = useState<IHireme>({
    client_email: '',
    client_name: '',
    client_project_name: '',
    tenure: 0,
    budget: '',
    hiring_type: HiringType.PART_TIME,
    message: '',
  });
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    setLoading(true);

    if (!hiremeDetails.tenure && hiremeDetails.hiring_type === HiringType.PART_TIME) {
      toast.warning('Please enter valid contract period.', { autoClose: 2000, theme: 'dark' });
      setLoading(false);
      return;
    }

    let message = '';

    if (hiremeDetails.hiring_type === HiringType.FULL_TIME) {
      message = HIRING_FULL_TIME_MSG.replace(/:client-name/gi, hiremeDetails.client_name);
      message = message.replace(/:client-email/, hiremeDetails.client_email);
      message = message.replace(/:client-project-name/, hiremeDetails.client_project_name);
      message = message.replace(/:budget/, hiremeDetails.budget);
      message = message.replace(/:hiring-type/, hiremeDetails.hiring_type);
    } else {
      message = HIRING_PART_TIME_MSG.replace(/:client-name/gi, hiremeDetails.client_name);
      message = message.replace(/:client-email/, hiremeDetails.client_email);
      message = message.replace(/:client-project-name/, hiremeDetails.client_project_name);
      message = message.replace(/:budget/, hiremeDetails.budget);
      message = message.replace(/:hiring-type/, hiremeDetails.hiring_type);
      message = message.replace(/:tenure/, hiremeDetails.tenure?.toString() || '');
    }

    const payload = { ...hiremeDetails, message, budget: `${hiremeDetails.budget}USD` };
    const abortController = new AbortController();
    const timerId = setTimeout(() => {
      abortController.abort('Timeout');
    }, parseInt(import.meta.env.VITE_BACKEND_API_TIMEOUT) || 1000);

    try {
      const apiRawResponse = await fetch(`${API_BASE_URL}/baas/hiring/add`, {
        method: HTTP_VERBS.POST,
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': import.meta.env.VITE_BACKEND_TOKEN,
          Accept: '*/*',
        },
        body: JSON.stringify(payload),
        signal: abortController.signal,
      });
      clearTimeout(timerId);

      const response = await apiRawResponse.json();

      if (apiRawResponse.ok) {
        toast.success(response.message, { autoClose: 2000, theme: 'dark' });
      } else {
        toast.error(response.message, { autoClose: 2000, theme: 'dark' });
      }
    } catch (error: any) {
      toast.error(error?.message || 'An error occured', { autoClose: 2000, theme: 'dark' });
    } finally {
      setHiremeDetails({
        client_email: '',
        client_name: '',
        client_project_name: '',
        budget: '',
        hiring_type: HiringType.PART_TIME,
        message: '',
        tenure: 0,
      });
      setLoading(false);
    }
  }

  return (
    <>
      <Heading headingName='Hire Me' className='mb-4' />
      <div className='container mx-auto'>
        <p className='text-sm lg:text-lg my-2 mx-2 lg:mx-0 font-roboto text-justify'>
          I hope you have liked my skills and experience. If in case you have a project for me in your mind then kindly
          fill up this form to hire me.
        </p>
        <form className='p-4 mb-4 border-2 font-roboto border-dashed rounded-md min-h-[30rem] flex flex-col justify-center mx-1 lg:mx-0'>
          <h1 className='text-center text-4xl font-bold underline underline-offset-4 decoration-dashed text-orange-500'>
            Form
          </h1>
          <p className='text-sm lg:text-xl text-justify leading-10 font-bold mb-2'>
            Hello my name is{' '}
            <input
              type='text'
              className='border-b-2 m-2 p-2 outline-none bg-transparent border-blue-800 text-center font-bold text-blue-800'
              placeholder='your name'
              required
              id='client_name'
              value={hiremeDetails.client_name}
              onChange={(event) =>
                setHiremeDetails({ ...hiremeDetails, [event.target.id]: event.target.value?.toLowerCase() })
              }
              autoComplete='off'
            />{' '}
            <sup className='mr-2 text-red-500'>*</sup>. I have seen your portfolio and found that you would be a great
            fit for my project,{' '}
            <input
              type='text'
              className='border-b-2 m-2 p-2 outline-none bg-transparent border-blue-800 text-center font-bold text-blue-800'
              placeholder='project name'
              required
              id='client_project_name'
              value={hiremeDetails.client_project_name}
              onChange={(event) => setHiremeDetails({ ...hiremeDetails, [event.target.id]: event.target.value })}
              autoComplete='off'
            />{' '}
            <sup className='mr-2 text-red-500'>*</sup>
            and would like to hire you as a{' '}
            <select
              className='p-2 bg-transparent outline-none m-2 min-w-40 border-2 border-dashed border-blue-800 text-align-center text-blue-800'
              id='hiring_type'
              value={hiremeDetails.hiring_type}
              onChange={(event) => setHiremeDetails({ ...hiremeDetails, [event.target.id]: event.target.value })}
            >
              <option value={HiringType.FULL_TIME}>Full time</option>
              <option value={HiringType.PART_TIME} selected>
                Part time
              </option>
            </select>{' '}
            <sup className='mr-2 text-red-500'>*</sup>
            freelance developer. My budget is{' '}
            <input
              type='text'
              className='border-b-2 m-2 p-2 outline-none bg-transparent border-blue-800 text-center font-bold text-blue-800'
              placeholder='price'
              id='budget'
              autoComplete='off'
              value={hiremeDetails.budget}
              onChange={(event) =>
                setHiremeDetails({ ...hiremeDetails, [event.target.id]: event.target.value?.toLowerCase() })
              }
            />{' '}
            <sup className='mr-2 text-red-500'>*</sup>
            USD.
            {hiremeDetails.hiring_type === HiringType.PART_TIME && (
              <>
                Your contract period will be of{' '}
                <input
                  type='number'
                  className='border-b-2 m-2 p-2 outline-none bg-transparent border-blue-800 text-center font-bold text-blue-800'
                  placeholder='tenure in months'
                  required
                  id='tenure'
                  autoComplete='off'
                  value={hiremeDetails.tenure}
                  onChange={(event) => setHiremeDetails({ ...hiremeDetails, [event.target.id]: event.target.value })}
                />{' '}
                months.
              </>
            )}
          </p>

          <p className='text-sm lg:text-xl text-justify leading-10 font-bold mb-2'>
            Please contact me on{' '}
            <input
              type='email'
              className='border-b-2 m-2 p-2 outline-none bg-transparent border-blue-800 text-center font-bold text-blue-800'
              placeholder='your email'
              required
              id='client_email'
              autoComplete='off'
              value={hiremeDetails.client_email}
              onChange={(event) =>
                setHiremeDetails({ ...hiremeDetails, [event.target.id]: event.target.value?.toLowerCase() })
              }
            />{' '}
            <sup className='mr-2 text-red-500'>*</sup>
            to discuss more about this project.
          </p>

          <p className='text-sm lg:text-xl text-justify leading-10 font-bold mb-2'>
            <Notes
              note={
                <p className='text-xs my-1'>
                  All fields marked with asterik <span className='text-red-500'>(*)</span> are mandatory to fill.
                </p>
              }
            />
          </p>

          {!loading ? (
            <>
              <button
                type='submit'
                className='w-40 lg:w-48 transition-all mt-2 inline-flex items-center p-4 border border-blue-800 font-bold text-white bg-blue-800 rounded-lg ring-2 ring-offset-1 ring-blue-400 scale-95 focus:scale-105 outline-none text-sm lg:text-lg shadow-md shadow-blue-800'
                onClick={handleSubmit}
              >
                <Send className='mx-2' size={24} /> Submit form
              </button>
            </>
          ) : (
            <Progress />
          )}
        </form>
      </div>
    </>
  );
}

export default React.memo(HireMe);
