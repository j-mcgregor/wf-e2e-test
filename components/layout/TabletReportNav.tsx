import { ArrowLeftIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { scroller } from 'react-scroll';
import { useReportNavItems } from '../../hooks/useNavigation';
import Button from '../elements/Button';
import SkeletonMenu from '../skeletons/SkeletonMenu';
import DownloadDoc from '../icons/DownloadDoc';
import DownloadFolder from '../icons/DownloadFolder';

interface ReportNavProps {
  companyName: string;
  loading?: boolean;
}

const ReportNav = ({ companyName, loading }: ReportNavProps) => {
  const navItems = useReportNavItems();
  const router = useRouter();

  const [activeItem, setActiveItem] = useState<string>('summary');

  const handleClick = (headerText: string) => {
    const path = router.asPath.replace(/#[\w+ -]+/, '');
    const snakedHeader = headerText.replace(/\s/g, '-').toLowerCase();
    setActiveItem(headerText);

    // handles the smooth scrolling
    scroller.scrollTo(`${snakedHeader}-id`, {
      duration: 400,
      delay: 0,
      smooth: true,
      // refers to the container in the secondary layout
      containerId: 'secondary-layout-container'
    });

    // shallow push to avoid forcing re-render
    return router.push(`${path}#${snakedHeader}`, undefined, { shallow: true });
  };

  // monitor the changes to the # path and update the menu based on the # path ids
  useEffect(() => {
    const dynamicPath = router.asPath.replace(/#[\w+ -]+/, '');

    const path = router.asPath.replace(`${dynamicPath}#`, '');
    const header = path.replace(/-/g, ' ').toLowerCase();
    setActiveItem(header);

    // handles the scrolling of the nav to get the menu item into view
    const snakedHeader = header.replace(/\s/g, '-').toLowerCase();

    // handle no header on first load
    // errors if there is no #route applied
    if (!/\//.test(header)) {
      document.querySelector(`#${snakedHeader}-nav-id`)?.scrollIntoView({behavior: "smooth"})
    }
    
  }, [router.asPath]);

  if (loading) {
    return (
      <>
        <aside className="hidden  w-full px-4 bg-gray-200 animate-pulse md:flex flex-col h-full justify-between py-8">
          <SkeletonMenu items={10} />
          <SkeletonMenu items={2} />
        </aside>
        <aside className="w-full h-12 bg-gray-200 md:hidden"></aside>
      </>
    );
  }

  return (
    <div className="w-full fixed bottom-0 sm:absolute sm:top-0 sm:bottom-auto  items-center bg-gray-200 z-20 text-sm text-primary flex lg:hidden">
      <Button
        linkTo="/reports"
        variant="highlight"
        newClassName=" bg-highlight items-center hover:text-alt relative h-[50px] top-0 flex items-center justify-center px-4"
      >
        <ArrowLeftIcon className="h-full w-6" />
      </Button>
     

      {/* hide scroll works to allow touch but removes mouse - needs solution */}
      <div className="overflow-x-auto flex hide-scroll"  id="tablet-report-nav-container">
        <ul className="flex items-center justify-between pr-20 sm:pr-40 md:pr-80">

          <li> <p className="font-bold whitespace-nowrap px-4">{companyName}</p></li>

          
          {navItems.map((heading, index) => {
            const lowerHeading = heading.toLowerCase();
            const isActive = activeItem === lowerHeading;
            const snakedHeader = heading.replace(/\s/g, '-').toLowerCase();

            return (
              <li key={index} id={`${snakedHeader}-nav-id`}>
                <button
                  className="cursor-pointer hover:text-alt"
                  onClick={() => handleClick(lowerHeading)}
                >
                  <div className="whitespace-nowrap px-6">
                    <p
                      className={`${
                        isActive ? 'text-highlight font-bold' : ''
                      } z-10 text-center w-full`}
                    >
                      {heading}
                    </p>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex h-[50px]">
        <Button variant="alt" className="rounded-none flex items-center">
          <DownloadDoc />
        </Button>
        <Button variant="secondary" className="rounded-none flex items-center">
          <DownloadFolder />
        </Button>
      </div>
    </div>
  );
};

export default ReportNav;
