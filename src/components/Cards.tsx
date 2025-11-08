import React from 'react';
import { IProjects } from '../interfaces/IProjects';
import { ArrowUpRight } from 'lucide-react';
import Divider from './Divider';
import Warning from './Warning';

const Cards: React.FC<IProjects> = ({
  name,
  text,
  tech_stack,
  disabled,
  codeLink,
  liveLink,
  documentation_link,
  ongoing,
  note, showDivider, cardImage
}) => {
  return (
    <div className='transition-all w-96 min-h-[700px] rounded-md border-2 border-dashed border-blue-500 ring-1 ring-offset-1 ring-blue-400 mx-2 mb-3 relative'>
      <div className="m-1">
        <img
          src={cardImage || 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60'}
          alt='Laptop'
          className='rounded-md min-h-[250px] w-full object-cover flex justify-center'
        />
      </div>
      <div className='p-4'>
        <h1 className='inline-flex items-center font-bold font-roboto text-lg border-r-2 border-b-2 border-blue-950 p-2 shadow-sm shadow-blue-600 rounded-md italic'>
          {name}
        </h1>
        <p className='mt-3 text-sm lg:text-lg text-gray-800 text-justify min-h-[100px] font-roboto'>{text}</p>

        <div className='my-4 text-center font-semibold border border-b-2 border-blue-300 ring-1 ring-offset-1 ring-blue-400 bg-blue-800 shadow-inner shadow-blue-300 text-white rounded-sm px-2 py-2 w-1/3'>
          <p className='text-sm'>TECH STACK</p>
        </div>

        <div className='my-2'>
          {
            tech_stack.length ?
              tech_stack.map((stack, index) => (
                <span
                  key={index}
                  className='font-arial text-gray-800 shadow-sm shadow-black mb-2 mr-1 inline-block rounded-sm bg-neutral-200 p-1 text-sm font-semibold text-center'
                >
                  {stack}
                </span>
              )) :
              <Warning text='Due to some security reasons, tech stack of this project is not provided in the public domain.' />
          }
        </div>

        {showDivider && <Divider color='bg-blue-200' />}

        {note && <Warning text={note} />}

        {!disabled && (
          <div className='flex flex-col'>
            {codeLink && <button
              type='button'
              disabled={disabled}
              onClick={() => codeLink ? window.open(codeLink) : alert("Sorry, but code is not available at the moment.")}
              className='transistion-all mt-4 w-full rounded-sm bg-orange-800 px-2 py-1.5 text-sm font-bold text-white shadow-sm hover:bg-neutral-100 hover:text-orange-800 outline-none ring-1 ring-offset-1 ring-orange-500 border border-dashed border-orange-400 scale-95 focus-visible:scale-100 font-roboto'
            >
              View code <ArrowUpRight className='inline-block font-bold' />
            </button>}

            {liveLink && (
              <button
                type='button'
                disabled={disabled}
                onClick={() => liveLink ? window.open(liveLink) : alert("Sorry, but the preview is not available at the moment.")}
                className='transistion-all mt-4 w-full rounded-sm bg-orange-800 px-2 py-1.5 text-sm font-bold text-white shadow-sm hover:bg-neutral-100 hover:text-orange-800 outline-none ring-1 ring-offset-1 ring-orange-500 border border-dashed border-orange-400 scale-95 focus-visible:scale-100 font-roboto'
              >
                Preview <ArrowUpRight className='inline-block font-bold' />
              </button>
            )}

            {documentation_link && (
              <button
                type='button'
                disabled={disabled}
                onClick={() => documentation_link ? window.open(documentation_link) : alert("No docs are available for the selected project.")}
                className='transistion-all mt-4 w-full rounded-sm bg-orange-800 px-2 py-1.5 text-sm font-bold text-white shadow-sm hover:bg-neutral-100 hover:text-orange-800 outline-none ring-1 ring-offset-1 ring-orange-500 border border-dashed border-orange-400 scale-95 focus-visible:scale-100'
              >
                View docs <ArrowUpRight className='inline-block font-bold' />
              </button>
            )}
          </div>
        )}
      </div>

      {ongoing && (
        <div className='absolute top-6 left-2 min-w-12 p-2 bg-violet-800 text-white rounded-lg font-roboto font-extrabold z-10 shadow-md shadow-indigo-400 animate-bounce'>
          <p className='text-lg lg:text-xl'>ONGOING</p>
        </div>
      )}
    </div>
  );
};

export default Cards;
