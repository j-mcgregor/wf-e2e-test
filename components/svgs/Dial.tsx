import React from 'react';
import dial from '../../images/icons/dial.png';
import Image from 'next/image';

const Dial = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <Image src={dial} alt="" height={200} width={200} priority={true} />
    </div>
  );
};

export default Dial;
