import React from 'react';
import { ITagsProps } from '../interfaces';
import Divider from './Divider';

export interface IEducationCardProps {
  companyLogo: string;
  tags: ITagsProps[];
  description?: string;
}

const EducationCard: React.FC<IEducationCardProps> = ({
  companyLogo,
  tags,
  description,
}) => {
  const getTagContent = (label: string) => tags?.find((t) => t.labelName === label)?.content || '';

  const schoolName = getTagContent('School/College Name');
  const courseName = getTagContent('Course Name');
  const passingYear = getTagContent('Passing Year');
  const score = getTagContent('Score');
  const boardName = getTagContent('Board/ University Name');

  return (
    <div className='transition-all duration-300 w-full h-full flex flex-col justify-between rounded-md border-2 border-dashed border-blue-500 ring-1 ring-offset-1 ring-blue-400 shadow-md shadow-blue-300 hover:shadow-xl hover:shadow-blue-400 bg-white overflow-hidden'>
      {/* Uniform logo container */}
      <div className='h-48 w-full flex items-center justify-center p-4 bg-gradient-to-b from-blue-50/50 to-transparent border-b-2 border-dashed border-blue-200'>
        <img
          src={companyLogo}
          alt={typeof schoolName === 'string' ? schoolName : 'School Logo'}
          className='max-h-32 max-w-[80%] object-contain mix-blend-multiply transition-transform duration-300 hover:scale-105'
        />
      </div>

      {/* Content body */}
      <div className='p-4 flex-1 flex flex-col justify-between space-y-4'>
        {/* School / College Name */}
        <div>
          <p className='text-sm px-2 mb-1 text-blue-800 font-roboto font-bold'>School/College Name</p>
          <h1 className='font-bold font-roboto text-base lg:text-lg border-r-2 border-b-2 border-blue-950 p-2 shadow-sm shadow-blue-600 rounded-md text-orange-600 min-h-[3.75rem] flex items-center'>
            {schoolName}
          </h1>
        </div>

        {/* Course Name */}
        <div>
          <p className='text-sm px-2 mb-1 text-blue-800 font-roboto font-bold'>Course Name</p>
          <div className='font-bold font-roboto text-sm lg:text-base border-r-2 border-b-2 border-blue-950 p-2 shadow-sm shadow-blue-600 rounded-md text-orange-600 min-h-[4.25rem] flex items-center'>
            {courseName}
          </div>
        </div>

        {/* Passing Year & Score */}
        <div className='grid grid-cols-2 gap-3'>
          <div>
            <p className='text-sm px-2 mb-1 text-blue-800 font-roboto font-bold'>Passing Year</p>
            <div className='font-bold font-roboto text-sm lg:text-base border-r-2 border-b-2 border-blue-950 p-2 shadow-sm shadow-blue-600 rounded-md text-orange-600 text-center'>
              {passingYear}
            </div>
          </div>

          <div>
            <p className='text-sm px-2 mb-1 text-blue-800 font-roboto font-bold'>Score</p>
            <div className='font-bold font-roboto text-sm lg:text-base border-r-2 border-b-2 border-blue-950 p-2 shadow-sm shadow-blue-600 rounded-md text-orange-600 text-center'>
              {score}
            </div>
          </div>
        </div>

        {/* Board / University Name */}
        <div>
          <p className='text-sm px-2 mb-1 text-blue-800 font-roboto font-bold'>Board/ University Name</p>
          <div className='font-bold font-roboto text-sm lg:text-base border-r-2 border-b-2 border-blue-950 p-2 shadow-sm shadow-blue-600 rounded-md text-orange-600 min-h-[3.75rem] flex items-center'>
            {boardName}
          </div>
        </div>

        {/* Divider */}
        {description && <Divider color='bg-blue-200' />}

        {/* Description */}
        {description && (
          <div className='flex-1 flex flex-col justify-start'>
            <p className='font-bold underline decoration-dashed text-base font-roboto text-blue-800 underline-offset-2 mb-1'>
              Description:-
            </p>
            <p className='px-1 text-sm lg:text-base font-roboto text-justify leading-relaxed text-gray-800'>
              {description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(EducationCard);
