import React from 'react';
import { ISkills } from '../interfaces/ISkills';

const SkillsCards: React.FC<ISkills> = ({ name, text, picture }) => {
  return (
    <div className='hover:scale-105 transition-all w-[350px]  min-h-[300px] rounded-md border m-1 mb-3'>
      <img
        src={picture}
        alt='Laptop'
        className='h-[200px] w-full rounded-t-md object-cover'
      />
      <div className='p-4 bg-slate-800 text-white'>
        <h1 className='inline-flex items-center font-bold font-cookie text-2xl tracking-widest'>{name}</h1>
        <p className='mt-3 text-sm text-gray-400 text-justify min-h-[100px]'>{text}</p>
      </div>
    </div>
  );
};

export default SkillsCards;
