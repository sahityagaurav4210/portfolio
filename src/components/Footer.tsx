import { Github } from 'lucide-react';
import { LinkedinIcon } from 'lucide-react';
import { Mail } from 'lucide-react';

function Footer() {
  return (
    <section className='relative overflow-hidden bg-black py-8'>
      <div className=' z-10 flex items-center justify-evenly'>
        <Github
          className='text-white cursor-pointer'
          onClick={() => window.open('https://www.github.com/sahityagaurav4210')}
        />
        <LinkedinIcon
          className='text-white cursor-pointer'
          onClick={() => window.open('https://www.linkedin.com/in/sahityagaurav4210')}
        />
        <Mail className='text-white cursor-pointer' onClick={()=>{window.open("mailto:sahityagaurav.41125@gmail.com")}}/>
      </div>
    </section>
  );
}

export default Footer;
