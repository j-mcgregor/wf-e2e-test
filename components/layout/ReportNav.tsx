import { ArrowLeftIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { scroller } from 'react-scroll';
import { useTranslations } from 'next-intl';

import { useReportNavItems } from '../../hooks/useNavigation';
import Button from '../elements/Button';
import SkeletonMenu from '../skeletons/SkeletonMenu';

interface ReportNavProps {
  companyName: string;
  loading?: boolean;
}

const ReportNav = ({ companyName, loading }: ReportNavProps) => {
  const navItems = useReportNavItems();
  const t = useTranslations();
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
    <div className="px-6 pt-8 flex-col h-full hidden xl:flex">
      <div>
        <Button
          linkTo="/reports"
          variant="none"
          newClassName="text-sm flex items-center hover:text-alt "
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" /> {t('back_to_saved')}
        </Button>
        <p className="text-sm mt-8">{t('risk_assessment_report')}</p>
        <h2 className="mt-4 text-xl">{companyName}</h2>
      </div>

      <div className="flow-root mt-8 ">
        <h4 className="font-bold ">{t('content')}</h4>
        <ul className="text-sm p-2">
          {navItems.map((heading, index) => {
            const lowerHeading = heading.toLowerCase();
            const isActive = activeItem === lowerHeading;
            return (
              <li key={index}>
                <button
                  className="cursor-pointer w-full hover:text-alt"
                  onClick={() => handleClick(lowerHeading)}
                >
                  <div className="relative pb-2 h-full">
                    {index !== navItems.length - 1 ? (
                      <span
                        className={`${
                          isActive ? 'bg-highlight' : 'bg-primary'
                        } absolute top-2 h-full w-0.5 left-0`}
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex items-center ">
                      <span
                        className={`${
                          isActive
                            ? 'bg-highlight ring-highlight'
                            : 'bg-primary ring-primary'
                        } h-0.5 w-0.5 rounded-full ring-[5px] `}
                      />
                      <p
                        className={`${
                          isActive ? 'text-highlight' : ''
                        } ml-6 z-10 text-center`}
                      >
                        {heading}
                      </p>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="space-y-2 items-end flex-1 justify-end flex flex-col pb-4">
        <Button variant="alt" className="w-full">
          {t('export_pdf')}
        </Button>
        <Button variant="secondary">{t('export_csv')}</Button>
      </div>
    </div>
  );
};

export default ReportNav;
