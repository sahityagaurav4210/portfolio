import { ReactNode, useState, memo, useEffect } from 'react'
import { IImageSuspenseProps } from '../interfaces';
import ComponentLoader from './ComponentLoader';

function ImageSuspense({ url }: IImageSuspenseProps): ReactNode {
  const [isPhotoLoaded, setIsPhotoLoaded] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0);
  const [fallBackImgUrl, setFallbackImgUrl] = useState<string | null>(null);

  useEffect(() => {
    async function loadImg() {
      const image = (await import('../assets/skills.png')).default as string;
      setFallbackImgUrl(image);
    }

    loadImg();

    return () => {
      setIsPhotoLoaded(false);
      setCounter(0);
      setFallbackImgUrl(null);
    }
  }, []);

  return (
    <div className='relative flex flex-col items-center justify-center'>
      <img
        src={fallBackImgUrl || url}
        alt='photo'
        onLoad={(e) => {
          e.preventDefault();
          setFallbackImgUrl(null);
          if (counter == 1) {
            setIsPhotoLoaded(prev => !prev);
          };
          setCounter((prev) => ++prev);
        }}
        className={`w-full min-h-56 max-h-60 rounded-t-md object-cover aspect-square ${!isPhotoLoaded ? 'opacity-60' : 'opacity-100'
          }`}
      />
      {!isPhotoLoaded && (
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10'>
          <ComponentLoader />
        </div>
      )}
    </div>
  )
}

export default memo(ImageSuspense);