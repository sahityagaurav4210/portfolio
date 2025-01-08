import React, { ReactNode } from 'react';

function ComponentLoader(): ReactNode {
  return (
    <div className='w-16 h-16 border-4 bg-transparent border-blue-500 border-dashed rounded-full animate-spin'></div>
  );
}

export default React.memo(ComponentLoader);
