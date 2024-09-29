import React from 'react';
import { ISkills } from '../interfaces/ISkills';
import { BriefcaseBusiness } from 'lucide-react';

const SkillsCards: React.FC<ISkills> = ({ name, text, picture, experience }) => {
  return (
    <div className='transition-all w-96 max-w-sm lg:max-w-lg min-h-[320px] lg:min-h-[490px] border-2 border-dashed rounded-md mx-2 mb-5 shadow-md shadow-blue-800 border-orange-400 ring-2 ring-offset-1 ring-blue-500'>
      <img src={picture} alt='Laptop' className='bg-black w-full h-[200px] rounded-t-md object-cover' />
      <div className='py-4 px-1 text-black'>
        <div className='flex justify-between w-full'>
          <h1 className='inline-flex items-center font-bold font-roboto text-lg border-r-2 border-b-2 border-blue-950 p-2 shadow-sm shadow-blue-600 rounded-md italic'>
            {name}
          </h1>

          <span className='inline-flex items-center font-bold font-roboto text-lg border-r-2 border-b-2 border-orange-950 p-2 shadow-sm shadow-orange-600 rounded-md'>
            <BriefcaseBusiness className='mx-1' /> {experience}
          </span>
        </div>
        <p className='mt-3 text-sm lg:text-xl text-gray-800 text-justify min-h-[100px]'>{text}</p>
      </div>
    </div>
  );
};

export default SkillsCards;
