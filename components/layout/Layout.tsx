import { useRouter } from 'next/router';

import Nav from './Nav';


type LayoutProps = {
  children: React.ReactNode,
  noNav: boolean
}

const Layout = ({ children, noNav }: LayoutProps) => {
  const router = useRouter();
  const path: string  = router.pathname

  return (
    <div>
      { !noNav && <Nav path={path} /> }
      <main className="relative">{children}</main>;
    </div>
  );
};

export default Layout;
