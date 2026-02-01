import React, { ReactNode } from 'react';
import { IInputHelperTxtProps } from '../interfaces/IInputHelperTxt';

function InputHelperTxt({ text }: Readonly<IInputHelperTxtProps>): ReactNode {
  return <p className='text-caption pl-1 text-zinc-500 text-justify'>{text}</p>;
}

export default React.memo(InputHelperTxt);
