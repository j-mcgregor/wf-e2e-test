import { useState } from 'react';
import Image from 'next/image';

interface FaviconWithFallbackProps {
  src: string;
  fallbackLetter: string;
  alt: string;
}

const FaviconWithFallback = ({
  src,
  fallbackLetter,
  alt
}: FaviconWithFallbackProps) => {
  // if image component fails to load, fallback to letter
  const [error, setError] = useState(false);

  return (
    <>
      {!error ? (
        <Image
          src={src}
          alt={alt}
          onError={() => setError(true)}
          objectFit="contain"
          layout="fill"
        />
      ) : (
        <div className="h-10 w-10 bg-primary text-white flex items-center justify-center text-sm">
          <p>{fallbackLetter}</p>
        </div>
      )}
    </>
  );
};

export default FaviconWithFallback;
