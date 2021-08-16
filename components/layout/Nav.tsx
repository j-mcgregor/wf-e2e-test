import Image from 'next/image';
import WFLogo from '../../public/images/logos/wiserfunding-logo.svg'

type NavProps = {
  path: string 
}

const Nav = ({ path }: NavProps) => {
  return (
    <nav>
      <div>
          <Image
            alt={'Wiserfunding Logo'}
            width="300"
            layout="fixed"
            height="100"
            src={WFLogo}
          />
      </div>
    </nav>
  );
};

export default Nav;
