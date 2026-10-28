import React, { ReactNode } from 'react';
import InputHelperTxt from './InputHelperTxt';

export interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  helperText?: string;
  isRequired?: boolean;
}

export const FloatingInput = React.memo(function FloatingInput({
  id,
  label,
  helperText,
  isRequired,
  className = '',
  ...rest
}: FloatingInputProps): ReactNode {
  return (
    <div className='relative w-full'>
      <input
        id={id}
        placeholder=' '
        className={`peer h-10 w-full rounded-[4px] border border-gray-400 bg-white px-3 text-sm text-gray-900 placeholder-transparent focus:border-2 focus:border-blue-600 focus:outline-none disabled:bg-gray-100 ${className}`}
        {...rest}
      />
      <label
        htmlFor={id}
        className='pointer-events-none absolute left-3 top-2 origin-[0] -translate-y-4 scale-75 transform bg-white px-1 text-sm text-gray-500 duration-200 peer-placeholder-shown:top-1/3 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:bg-white'
      >
        {label}
        {isRequired && <sup className='text-red-500 text-xs'>*</sup>}
      </label>
      {helperText && <InputHelperTxt text={helperText} />}
    </div>
  );
});

export interface FloatingTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
  helperText?: string;
  isRequired?: boolean;
}

export const FloatingTextarea = React.memo(function FloatingTextarea({
  id,
  label,
  helperText,
  isRequired,
  className = '',
  ...rest
}: FloatingTextareaProps): ReactNode {
  return (
    <div className='relative w-full'>
      <textarea
        id={id}
        placeholder=' '
        className={`peer p-2 min-h-10 w-full rounded-[4px] border border-gray-400 bg-white px-3 text-sm text-gray-900 placeholder-transparent focus:border-2 focus:border-blue-600 focus:outline-none disabled:bg-gray-100 resize-y ${className}`}
        {...rest}
      />
      <label
        htmlFor={id}
        className='pointer-events-none absolute left-3 top-2 origin-[0] -translate-y-4 scale-75 transform bg-white px-1 text-sm text-gray-500 duration-200 peer-placeholder-shown:top-1/3 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:bg-white'
      >
        {label}
        {isRequired && <sup className='text-red-500 text-xs'>*</sup>}
      </label>
      {helperText && <InputHelperTxt text={helperText} />}
    </div>
  );
});
