import React, { ReactNode, useCallback } from 'react';
import Progress from './Progressbar';
import Validated from './Validated';
import { ICaptchaProps } from '../interfaces/ICaptcha';
import { AudioWaveform, CircleCheck, RefreshCcw } from 'lucide-react';
import { toast } from 'react-toastify';
import { getAppToastConfig } from '../config';

function Captcha({
  captchaData,
  isLoading,
  isValidated,
  refreshCaptcha,
  contractDetails,
  contractDetailsTextboxHandler,
  handleCheckBoxOnChange,
  handleCaptchaAudioBtnClick,
}: Readonly<ICaptchaProps>): ReactNode {
  const playCaptchaAudio = useCallback(
    async function () {
      const audioUri = await handleCaptchaAudioBtnClick?.();

      if (!audioUri) {
        toast.error('Unable to fetch captcha audio. Please try again later.', getAppToastConfig());
        return;
      }

      const audio = new Audio();
      audio.src = audioUri;
      audio.play();
    },
    [handleCaptchaAudioBtnClick]
  );

  if (isValidated) return <Validated />;

  return (
    <div className='grid grid-cols-12 gap-2 min-h-20 mb-2'>
      <div className='col-span-12 lg:col-span-6 rounded-md'>
        <div className='w-full flex flex-col lg:flex-row items-center justify-evenly lg:justify-center flex-wrap'>
          <img src={captchaData} alt='Captcha' className='lg:mx-2' />

          {isLoading ? (
            <div className='w-12 h-12 bg-blue-800 rounded-md flex items-center justify-center ring-1 ring-offset-1 ring-blue-400 focus:outline-dotted outline-blue-300 scale-95 focus-within:scale-100'>
              <Progress />
            </div>
          ) : (
            <div className='mt-1 lg:mt-0'>
              <button
                className='border transition-all p-2 rounded-md bg-orange-900 border-orange-500 border-spacing-2 ring-1 ring-offset-1 ring-orange-400 cursor-pointer focus:outline-dotted outline-orange-300 scale-95 focus-within:scale-100'
                type='button'
                disabled={isValidated}
                onClick={refreshCaptcha}
              >
                <RefreshCcw className='text-white' onClick={refreshCaptcha} />
              </button>

              <button
                className='border transition-all p-2 rounded-md bg-orange-900 border-orange-500 border-spacing-2 ring-1 ring-offset-1 ring-orange-400 cursor-pointer focus:outline-dotted outline-orange-300 scale-95 focus-within:scale-100 mx-1'
                type='button'
                disabled={isValidated}
                onClick={playCaptchaAudio}
              >
                <AudioWaveform className='text-white' />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className='col-span-7 lg:col-span-3'>
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
            autoComplete='off'
            onChange={(event) => contractDetailsTextboxHandler(event)}
          />
        </fieldset>
      </div>

      <div className='col-span-5 lg:col-span-3'>
        <div className='flex items-center justify-evenly lg:justify-center h-full'>
          {isLoading ? (
            <Progress />
          ) : (
            <>
              <div className='relative flex items-center justify-center'>
                <input
                  type='checkbox'
                  id='validate'
                  className='appearance-none text-blue-500 transition-all border border-blue-500 border-spacing-4 ring-1 ring-offset-1 ring-blue-400 scale-95 rounded-md mx-2 h-8 w-8 checked:bg-blue-700 checked:scale-100 checked:before:content'
                  onChange={handleCheckBoxOnChange}
                />
                <CircleCheck className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white' />
              </div>

              <label htmlFor='validate' className='cursor-pointer text-sm lg:text-lg font-bold font-roboto'>
                I'm not a robot
              </label>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(Captcha);
