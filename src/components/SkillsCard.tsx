import React from 'react';
import { ISkills } from '../interfaces/ISkills';

const SkillsCards: React.FC<ISkills> = ({ name, text, picture }) => {
  return (
    <div className='transition-all w-96 min-h-[300px] lg:min-h-[450px] border-black rounded-md border mx-2 mb-5 shadow-sm shadow-blue-400'>
      <img src={picture} alt='Laptop' className='h-[200px] w-full rounded-t-md object-cover' />
      <div className='p-4 text-black'>
        <h1 className='inline-flex items-center font-bold font-roboto text-lg border-r-2 border-b-2 border-blue-950 p-2 shadow-sm shadow-blue-600 rounded-md italic'>
          {name}
        </h1>
        <p className='mt-3 text-sm lg:text-xl text-gray-800 text-justify min-h-[100px]'>{text}</p>
      </div>
    </div>
  );
};

export default SkillsCards;
