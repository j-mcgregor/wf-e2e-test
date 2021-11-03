/* eslint-disable security/detect-non-literal-require */
import React from 'react';

interface IframeProps {
  title: string;
  src: string;
}

const Iframe = ({ title, src }: IframeProps) => {
  return (
    <div className={'relative overflow-hidden w-full pt-[100%]'}>
      <iframe
        className={'absolute top-0 left-0 bottom-0 right-0 w-full h-full'}
        title={title}
        src={src}
      />
    </div>
  );
};
export default Iframe;
