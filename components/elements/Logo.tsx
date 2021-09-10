import Image from 'next/image';

import WiserfundingLogo from '../../public/images/logos/wiserfunding-logo-dark.png';

const Logo = () => {
  return (
    <Image
      src={WiserfundingLogo}
      // so, interesting point here https://stackoverflow.com/questions/66784795/nextjs-image-issue-with-src-and-default-external-image-url
      // TLDR next/image needs either layout="fill" OR height & width.
      // test breaks otherwise; problem with next/image, not Jest
      // layout="fill"
      width={200}
      height={50}
      alt="Wiserfunding Logo"
      objectFit="contain"
      placeholder="blur"
      blurDataURL="/blur"
    />
  );
};

export default Logo;
