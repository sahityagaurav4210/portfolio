import React from 'react';
import { IProjects } from '../interfaces/IProjects';
import { ArrowUpRight } from 'lucide-react';

const Cards: React.FC<IProjects> = ({ name, text, tech_stack, disabled, codeLink, liveLink }) => {
  return (
    <div className='transition-all w-96 min-h-[700px] rounded-md border mx-2 mb-3'>
      <img
        src='https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60'
        alt='Laptop'
        className='min-h-[200px] w-full rounded-t-md object-cover'
      />
      <div className='p-4'>
        <h1 className='inline-flex items-center font-bold font-roboto text-lg border-r-2 border-b-2 border-blue-950 p-2 shadow-sm shadow-blue-600 rounded-md italic'>
          {name}
        </h1>
        <p className='mt-3 text-sm lg:text-lg text-gray-800 text-justify min-h-[100px]'>{text}</p>

        <div className='my-4 text-center font-semibold border border-b-2 border-blue-300 ring-1 ring-offset-1 ring-blue-400 bg-blue-800 shadow-inner shadow-blue-300 text-white rounded-sm px-2 py-2 w-1/3'>
          <p className='text-sm'>TECH STACK</p>
        </div>
        <div className='mt-2'>
          {tech_stack.map((stack, index) => (
            <span
              key={index}
              className='mb-2 mr-2 inline-block rounded-full bg-gray-700 text-white px-4 py-3 text-sm font-semibold text-center'
            >
              {stack}
            </span>
          ))}
        </div>

        <div className='flex flex-col'>
          <button
            type='button'
            disabled={disabled}
            onClick={() => codeLink && window.open(codeLink)}
            className='mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'
          >
            View code <ArrowUpRight className='inline-block font-bold' />
          </button>

          <button
            type='button'
            disabled={disabled}
            onClick={() => liveLink && window.open(liveLink)}
            className='mt-4 w-full rounded-sm bg-slate-950 px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'
          >
            Preview <ArrowUpRight className='inline-block font-bold' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
