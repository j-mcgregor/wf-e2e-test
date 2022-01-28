import React, { SVGProps } from 'react';
import Image from 'next/image';
import ShareholderCardBGSvg from '../../../public/images/backgrounds/shareholderBG.svg';

const ShareholderCardBG = ({ className }: { className?: string }) => {
  return (
    <Image
      src={ShareholderCardBGSvg}
      alt="Shareholder bg"
      layout="fill"
      className={className}
      objectFit="cover"
      objectPosition="center"
    />
  );
};

export default ShareholderCardBG;
