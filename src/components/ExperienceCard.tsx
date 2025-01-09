import React from 'react';
import Tags from './Tags';
import { IExperienceCardProps } from '../interfaces';

const ExperienceCard: React.FC<IExperienceCardProps> = ({ companyLogo, tags, description, isCurrent = false, responsibilities = [], width = "" }) => {
  return (
    <div className={`transition-all relative ${width || 'w-[25rem]'} min-h-[800px] lg:min-h-[450px] rounded-md border-2 border-dashed border-blue-600 ring-1 ring-offset-1 ring-blue-400 mx-2 mb-5 shadow-md shadow-blue-400 overflow-hidden`}>
      <div className='min-h-[200px] mb-5 flex justify-center items-center bg-blue-50'>
        <img src={companyLogo} alt='Company Logo' className='aspect-square object-contain mix-blend-multiply' />
      </div>

      <div className='p-4 text-black'>
        <div className='flex items-center justify-between gap-2'>
          <fieldset className='border-2 p-2 text-xl border-dashed border-gray-400 rounded-md'>
            <legend className='text-blue-800 font-bold font-roboto'>Overview</legend>

            <div className='flex items-center gap-4 flex-wrap'>
              {tags?.map((tag) => (
                <Tags labelName={tag.labelName} content={tag.content} key={tag.labelName} />
              ))}
            </div>
          </fieldset>
        </div>

        {description && (
          <div className='my-2'>
            <p className='font-bold underline decoration-dashed text-base lg:text-lg font-roboto text-justify text-blue-800'>Description:-</p>
            <p className='px-1 text-base lg:text-lg font-roboto text-justify'>{description}</p>
          </div>
        )}
        {responsibilities.length ? (
          <>
            <p className='font-roboto text-base lg:text-lg font-bold underline decoration-dashed text-blue-800'>Responsibilities:-</p>
            <ul className='font-roboto marker:font-bold marker:text-blue-800 marker:underline list-inside list-decimal px-1 text-justify'>
              {responsibilities.map((responsibility: string) => <li>{responsibility}</li>)}
            </ul>
          </>
        ) : <></>}
      </div>

      {isCurrent && (
        <div className='absolute top-6 left-2 min-w-12 p-2 bg-orange-700 text-white rounded-lg font-roboto font-extrabold z-10 shadow-md shadow-orange-400 animate-bounce'>
          <p className='text-lg lg:text-xl'>CURRENT</p>
        </div>
      )}
    </div>
  );
};

export default ExperienceCard;
