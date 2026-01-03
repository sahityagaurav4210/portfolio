import React from 'react';
import Tags from './Tags';
import { IExperienceCardProps, ITagsProps } from '../interfaces';
import Divider from './Divider';

const ExperienceCard: React.FC<IExperienceCardProps> = ({
  companyLogo,
  tags,
  description,
  isCurrent = false,
  responsibilities = [],
  width = '',
}) => {
  return (
    <div
      className={`transition-all relative ${
        width || 'w-[25rem]'
      } min-h-[800px] lg:min-h-[450px] rounded-md border-2 border-dashed border-blue-600 ring-1 ring-offset-1 ring-blue-400 mx-2 mb-5 shadow-md shadow-blue-400 overflow-hidden`}
    >
      <div className='min-h-[200px] flex justify-center items-center'>
        <img src={companyLogo} alt='Company Logo' className='aspect-square object-contain mix-blend-multiply' />
      </div>

      <div className='py-2 px-4 text-black'>
        <div className='flex items-center justify-between gap-2'>
          <div className='flex items-center gap-4 flex-wrap'>
            {tags?.map((tag: ITagsProps, index: number) => (
              <Tags labelName={tag.labelName} content={tag.content} key={`${tag.labelName}${index}`} />
            ))}
          </div>
        </div>

        {description && <Divider my={2} color='bg-orange-100' />}

        {description && (
          <div className='my-2'>
            <p className='font-bold underline decoration-dashed text-base font-roboto text-justify text-blue-800 underline-offset-2'>
              Description:-
            </p>
            <p className='px-1 text-base font-roboto text-justify'>{description}</p>
          </div>
        )}

        {responsibilities.length ? (
          <>
            <p className='font-roboto text-base font-bold underline decoration-dashed text-blue-800 underline-offset-2'>
              Responsibilities and archivements: -
            </p>
            <ul className='font-roboto marker:font-bold marker:text-blue-800 marker:underline list-inside list-decimal px-1 text-justify text-base'>
              {responsibilities.map((responsibility: string, index: number) => (
                <li key={`Resp-Key-${index}`}>{responsibility}</li>
              ))}
            </ul>
          </>
        ) : (
          <></>
        )}
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
