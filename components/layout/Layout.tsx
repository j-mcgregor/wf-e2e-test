import { useRouter } from 'next/router';

import Nav from './Nav';
import Seo from './Seo';

// type LayoutProps = {
//   children: React.ReactNode
//   noNav?: boolean | undefined
//   title?: string
//   description?: string
// }

const Layout = ({ children, noNav, title, description }: LayoutProps) => {
  const router = useRouter();
  const path: string = router.pathname;

  return (
    <div>
      <Seo title={title} description={description} path={path} />
      {!noNav && <Nav path={path} />}
      <main className="relative">{children}</main>
    </div>
  );
};

export default Layout;
