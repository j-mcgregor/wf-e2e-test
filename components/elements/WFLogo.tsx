import Image  from 'next/image';
import React from 'react'

import WiserfundingLogo from '../../public/images/logos/wiserfunding-logo.svg';

const WFLogo = () => {
  return (
    <Image
    alt={'Wiserfunding Logo'}
    layout="fill"
    objectFit="contain"
    src={WiserfundingLogo}
  />
  )
}

export default WFLogo
