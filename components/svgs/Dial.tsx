import React from 'react';
import dial from '../../images/icons/dial.png'
import Image from 'next/image';

const Dial = ({ className }: { className?: string}) => {
  return (
    <div className={className} >
      <Image  src={dial} alt=""/>
    </div>
  );
}

export default Dial
