import React from 'react';
import { ISkills } from '../interfaces/ISkills';
import { BriefcaseBusiness } from 'lucide-react';
import ImageSuspense from './ImageSuspense';

const SkillsCards: React.FC<ISkills> = ({ name, text, picture, experience }) => {
  return (
    <div className='transition-all w-96 max-w-sm lg:max-w-lg min-h-[320px] border-2 border-dashed rounded-md mx-2 mb-5 shadow-md shadow-blue-800 border-orange-400 ring-2 ring-offset-1 ring-blue-500'>
      <ImageSuspense url={picture} />
      <div className='py-4 px-1 text-black'>
        <div className='flex justify-between flex-wrap w-full'>
          <h1 className='inline-flex items-center font-bold font-roboto text-base border-r-2 border-b-2 border-blue-950 p-2 shadow-sm shadow-blue-600 rounded-md'>
            {name}
          </h1>

          <span className='inline-flex items-center font-bold font-roboto text-lg border-r-2 border-b-2 border-orange-950 p-2 shadow-sm shadow-orange-600 rounded-md mt-2'>
            <BriefcaseBusiness className='mx-1' /> {experience}
          </span>
        </div>

        <div className="my-2 h-[1px] bg-blue-800"></div>

        <p className='mt-3 text-sm text-gray-800 text-justify min-h-[100px] font-roboto'>{text}</p>
      </div>
    </div>
  );
};

export default SkillsCards;
