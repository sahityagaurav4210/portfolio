function Logo() {
  return (
    <div className='flex flex-col items-center'>
      <a
        href='/#home'
        className='font-bold font-roboto italic text-3xl md:text-4xl text-blue-800 cursor-pointer underline decoration-dashed underline-offset-8 decoration-blue-900/75'
      >
        Gaurav <span className='text-blue-800/75'>S.</span>
      </a>
      <span className='font-bookman font-bold mt-2 tracking-widest text-xs text-orange-700'>FULL-STACK DEVELOPER</span>
    </div>
  );
}

export default Logo;
