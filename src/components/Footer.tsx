import React from 'react';

function Footer() {
  return (
    <section className='relative overflow-hidden bg-gradient-to-tr from-indigo-950 to-blue-950 py-4 text-white text-xs lg:text-lg text-center px-1 font-bold font-roboto'>
      <p>Made with ❤️ by Gaurav Sahitya in India 🇮🇳.</p>
      <p className='mt-1 italic'>Content of this website is being owned and maintained by Gaurav Sahitya.</p>
    </section>
  );
}

export default React.memo(Footer);
