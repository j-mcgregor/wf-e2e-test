import Image from 'next/image';
import WiserfundingLogo from '../../public/images/logos/wiserfunding-logo-dark.png';
const Logo = () => {
  return (
    <Image
      src={WiserfundingLogo}
      // layout="fill"
      alt="Wiserfunding Logo"
      objectFit="contain"
      placeholder="blur"
    />
  );
};

export default Logo;
