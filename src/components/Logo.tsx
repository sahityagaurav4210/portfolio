function Logo() {
  return (
    <>
      <div className='flex flex-col items-center'>
        <span
          className='font-bold font-roboto italic text-3xl md:text-5xl text-blue-800 cursor-pointer underline decoration-dashed underline-offset-8 decoration-blue-900/75'
          onClick={(_) => (window.location.href = '#home')}
        >
          Gaurav <span className='text-blue-800/75'>S.</span>
        </span>
        <span className='font-roman font-bold mt-2 tracking-wider text-xs text-orange-800'>MERN DEVELOPER</span>
      </div>
    </>
  );
}

export default Logo;
