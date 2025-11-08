import React, { ReactNode, useEffect, useState } from 'react'
import Progress from './Progressbar';
import Validated from './Validated';
import { ICaptchaProps } from '../interfaces/ICaptcha';
import { CircleCheck, Headphones, RefreshCcw } from 'lucide-react';

function Captcha({ captchaData, isLoading, isValidated, refreshCaptcha, contractDetails, contractDetailsTextboxHandler, handleCheckBoxOnChange }: ICaptchaProps): ReactNode {
  const [index, setIndex] = useState<number>(0);

  let text = captchaData?.captcha || '';
  const utterance = new SpeechSynthesisUtterance();
  utterance.lang = 'hi-In';
  utterance.pitch = 1;
  utterance.rate = 1;
  utterance.volume = 1;
  utterance.text = text ? text[index] : '';

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

  console.log(captchaData?.captchaArray, "array")

  return (
    <div className='grid grid-cols-12 gap-2 min-h-20 mb-4'>
      <div className='col-span-8 lg:col-span-3 border border-dotted border-gray-400 rounded-md pointer-events-none flex items-center justify-center font-cookie text-5xl bg-cyan-950 text-gray-600 p-1 mx-2'>
        {
          captchaData?.captchaArray?.map((data: any, index: number) => {
            return (
              <p className={`inline-block ${data.degree || "rotate-45"} mx-1`} key={index}>
                {data.letter}
              </p>
            );
          })
        }
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

      <div className='col-span-6 lg:col-span-5'>
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

      <div className='col-span-6 lg:col-span-3 flex items-center justify-center'>
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
  )
}

export default React.memo(Captcha);