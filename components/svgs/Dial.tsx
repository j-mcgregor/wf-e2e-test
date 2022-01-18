import React from 'react';
import dial from '../../images/icons/dial.png';
import Image from 'next/image';

const Dial = ({
  className,
  reverseX
}: {
  className?: string;
  reverseX?: boolean;
}) => {
  return (
    <div className={className}>
      <Image
        src={dial}
        alt=""
        height={200}
        width={200}
        priority={true}
        className={reverseX ? '-scale-x-100' : ''}
      />
    </div>
  );
};

export default Dial;
