import React, { ReactNode } from 'react';
import { ITextContainerProp } from '../interfaces/ITextContainer';

function TextContainer({ children, applyMy }: Readonly<ITextContainerProp>): ReactNode {
  const marginY = applyMy ? 'my-2' : '';

  return <div className={`container mx-auto ${marginY} p-4`}>{children}</div>;
}

export default React.memo(TextContainer);
