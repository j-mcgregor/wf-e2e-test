import Image from 'next/image';
import linkedInLogo from '../../public/images/logos/linkedin-icon.png';

const LinkedinLogo = () => {
  return (
    <div data-testid="icon-linkedin" className="h-8 w-8 relative">
      <Image
        src={linkedInLogo}
        alt="Linkedin icon"
        layout="fill"
        objectFit="contain"
      />
    </div>
  );
};

export default LinkedinLogo;
