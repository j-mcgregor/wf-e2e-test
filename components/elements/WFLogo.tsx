import Image from 'next/image';
import React from 'react';

import WiserfundingLogo from '../../public/images/logos/wiserfunding-logo.svg';
import WFLogoSmall from '../../public/images/logos/wf-logo.svg';

const WFLogo = () => {
  return (
    <>
      <div className="hidden lg:block">
        <Image
          alt={'Wiserfunding Logo'}
          layout="fill"
          objectFit="contain"
          src={WiserfundingLogo}
        />
      </div>
      <div className="lg:hidden">
        <Image
          alt={'Wiserfunding Logo'}
          layout="fill"
          objectFit="contain"
          src={WFLogoSmall}
        />
      </div>
    </>
  );
};

export default WFLogo;
