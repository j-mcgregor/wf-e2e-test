import { ArrowLeftIcon } from '@heroicons/react/outline';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import { useReportNavItems } from '../../hooks/useNavigation';
import Button from '../elements/Button';
import SkeletonMenu from '../skeletons/SkeletonMenu';
import DownloadDoc from '../icons/DownloadDoc';
import DownloadFolder from '../icons/DownloadFolder';

interface ReportNavProps {
  companyName: string;
  loading?: boolean;
  isTesting?: boolean;
  backLink?: string;
}

const nonTestingProps = {
  containerId: 'secondary-layout-container'
};

const TabletReportNav = ({
  companyName,
  loading,
  isTesting,
  backLink
}: ReportNavProps) => {
  const navItems = useReportNavItems();

  const [activeItem, setActiveItem] = useState<string>('summary');
  // monitor the changes to the active state path and update the menu scroll position based on the id
  useEffect(() => {
    if (activeItem && !isTesting) {
      document
        ?.querySelector(`#${activeItem}-top`)
        ?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeItem]);

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
    <div className="w-full fixed bottom-0 sm:absolute sm:top-0 sm:bottom-auto  items-center bg-gray-200 z-20 text-sm text-primary flex xl:hidden">
      <Button
        linkTo={!backLink ? '/reports' : backLink}
        variant="highlight"
        newClassName=" bg-highlight items-center hover:text-alt relative h-[50px] top-0 flex items-center justify-center px-4"
      >
        <ArrowLeftIcon className="h-full w-6" />
      </Button>

      {/* hide scroll works to allow touch but removes mouse - needs solution */}
      <div
        className="overflow-x-auto flex hide-scroll"
        id="tablet-report-nav-container"
      >
        <ul className="flex items-center justify-between pr-20 sm:pr-40 md:pr-80">
          <li>
            {' '}
            <p className="font-bold whitespace-nowrap px-4">{companyName}</p>
          </li>

          {navItems.map(({ id, title }, index) => {
            const isActive = activeItem === id;
            return (
              <li key={index} id={`${id}-top`}>
                <Link
                  className="cursor-pointer hover:text-alt"
                  to={id}
                  spy={true}
                  offset={-30}
                  smooth={true}
                  activeClass={'bg-gray-400'}
                  duration={300}
                  onSetActive={() => setActiveItem(id)}
                  // prevents testing failures for issues with type requirement
                  // https://github.com/fisshy/react-scroll/issues/352
                  {...(isTesting ? {} : nonTestingProps)}
                >
                  <div className="whitespace-nowrap px-6">
                    <p
                      className={`${
                        isActive ? 'text-highlight font-bold' : ''
                      } z-10 text-center w-full`}
                    >
                      {title}
                    </p>
                  </div>
                </Link>
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

export default TabletReportNav;
