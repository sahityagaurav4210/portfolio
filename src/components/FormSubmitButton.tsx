import React, { ReactNode } from 'react';
import Progress from './Progressbar';

export interface FormSubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
  loadingText?: string;
  children: ReactNode;
  icon?: ReactNode;
}

export function FormSubmitButton({
  isLoading,
  loadingText = 'Loading...',
  children,
  icon,
  className = '',
  ...rest
}: FormSubmitButtonProps): ReactNode {
  return (
    <button
      type='submit'
      className={`min-w-28 transition-transform duration-500 mt-2 inline-flex items-center px-2 py-3.5 border-2 border-dashed border-blue-400 border-spacing-2 justify-center font-bold text-white bg-blue-800 rounded-lg ring-2 ring-offset-1 ring-blue-400 scale-95 focus:scale-100 outline-none text-sm lg:text-base shadow-md shadow-blue-800 disabled:bg-slate-700 disabled:border-slate-600 disabled:ring-slate-400 ${className}`}
      {...rest}
    >
      {isLoading ? (
        <>
          <Progress />
          <span>{loadingText}</span>
        </>
      ) : (
        <>
          {icon}
          <span>{children}</span>
        </>
      )}
    </button>
  );
}

const MemoizedFormSubmitButton = React.memo(FormSubmitButton);
export default MemoizedFormSubmitButton;
