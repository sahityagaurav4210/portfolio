import React, { ReactNode, useState } from 'react';
import { DollarSign } from 'lucide-react';
import Notes from './Notes';
import { IHireme } from '../interfaces/IHireme';
import { HiringType } from '../interfaces';
import Progress from './Progressbar';
import { toast } from 'react-toastify';
import { HIRING_FULL_TIME_MSG, HIRING_PART_TIME_MSG } from '../constants';
import { API_BASE_URL, getApiHeaders, HTTP_VERBS } from '../api';

function HireMe(): ReactNode {
  const [hiremeDetails, setHiremeDetails] = useState<IHireme>({
    client_email: '',
    client_name: '',
    client_project_name: '',
    tenure: 0,
    budget: '',
    hiring_type: HiringType.PART_TIME,
    message: '',
    currency_type: 'INR'
  });
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();

    if (!hiremeDetails.tenure && hiremeDetails.hiring_type === HiringType.PART_TIME) {
      toast.warning('Please enter valid contract period.', { autoClose: 2000, theme: 'dark' });
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

    const payload = { ...hiremeDetails, message, budget: `${hiremeDetails.budget} ${hiremeDetails.currency_type}` };

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

    if(!/^[0-9\.]+$/g.test(payload.budget)){
      toast.warning('Please enter your budget amount in numbers or decimal.', {
        autoClose: 2000,
        theme: 'dark',
      });
      return;
    }

    setLoading(true);
    const abortController = new AbortController();
    const timerId = setTimeout(() => {
      abortController.abort('Timeout');
    }, parseInt(import.meta.env.VITE_BACKEND_API_TIMEOUT) || 1000);

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
        currency_type: ''
      });
      setLoading(false);
    }
  }

  return (
    <>
      <div className='container mx-auto'>
        <p className='text-sm lg:text-lg my-2 mx-2 lg:mx-0 font-roboto text-justify'>
          I hope you have liked my skills and experience. If in case you have a project for me in your mind then kindly
          fill up this form to hire me.
        </p>

        <form className='p-4 mb-4 border-2 font-roboto border-dashed rounded-md min-h-[5rem] flex flex-col justify-center mx-2 lg:mx-0 shadow-md shadow-gray-400 border-orange-300'>
          <h1 className='text-center text-4xl font-bold underline underline-offset-4 decoration-dashed text-orange-500'>
            Form
          </h1>

          <p className='text-sm lg:text-base text-justify leading-5 font-bold mb-2'>
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
              <option value={HiringType.PART_TIME}>Part time</option>
            </select>{' '}
            <sup className='mr-2 text-red-500'>*</sup>
            freelance developer. My budget is{' '}
            <input
              type='number'
              className='border-b-2 m-2 p-2 outline-none bg-transparent border-blue-800 text-center font-bold text-blue-800'
              placeholder='price'
              id='budget'
              autoComplete='off'
              value={hiremeDetails.budget}
              onChange={(event) =>
                setHiremeDetails({ ...hiremeDetails, [event.target.id]: event.target.value?.toLowerCase() })
              }
              inputMode='numeric'
            />{' '}
            <sup className='mr-2 text-red-500'>*</sup>
            <select
              className='p-2 bg-transparent outline-none m-2 min-w-1 border-2 border-dashed border-blue-800 text-align-center text-blue-800'
              id='currency_type'
              value={hiremeDetails.currency_type}
              onChange={(event) => setHiremeDetails({ ...hiremeDetails, [event.target.id]: event.target.value })}
            >
              <option value="INR">INR (₹)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EURO (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="AUD">AUD ($)</option>
            </select>.

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

          <p className='text-sm lg:text-base text-justify leading-10 font-bold mb-2'>
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

          <Notes
            note={
              <p className='text-xs text-justify'>
                All fields marked with asterik <span className='text-red-500'>(*)</span> are mandatory to fill.
              </p>
            }
          />
          <Notes note={<p className='text-xs text-justify'>Project name must be atleast 2 characters long.</p>} />

          <Notes
            note={
              <p className='text-xs text-justify'>
                Please provide a valid email address as it would be used for further communication purposes.
              </p>
            }
          />

          <Notes
            note={
              <p className='text-xs text-justify'>You will be contacted within 48 hours after filling up this form.</p>
            }
          />

          {!loading ? (
            <>
              <button
                type='submit'
                className='w-28 transition-transform duration-500 mt-2 inline-flex items-center px-2 py-3.5 border-2 border-dashed border-blue-400 border-spacing-2 justify-center font-bold text-white bg-blue-800 rounded-lg ring-2 ring-offset-1 ring-blue-400 scale-95 focus:scale-100 outline-none text-sm lg:text-base shadow-md shadow-blue-800'
                onClick={handleSubmit}
              >
                <DollarSign /> Hire Me
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
