import React, { ReactNode } from 'react';
import { IBacktoTopButtonProp } from '../../interfaces';
import { FaArrowUp } from 'react-icons/fa';

function BackToTopButton({ isVisible, uri }: Readonly<IBacktoTopButtonProp>): ReactNode {
  return (
    <button
      type='button'
      className={
        isVisible
          ? 'min-w-14 min-h-14 p-4 fixed rounded-full items-center justify-center bottom-8 right-4 bg-orange-400 opacity-55 focus:opacity-100 cursor-pointer ring-orange-600 ring-2 ring-offset-2 flex'
          : 'min-w-14 min-h-14 p-4 fixed rounded-full items-center justify-center bottom-8 right-4 bg-orange-400 opacity-55 focus:opacity-100 cursor-pointer hidden'
      }
      onClick={() => (window.location.href = uri ?? '/#home')}
    >
      <FaArrowUp />
    </button>
  );
}

export default React.memo(BackToTopButton);
