import { ArrowLeftIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { scroller } from 'react-scroll';
import { useTranslations } from 'use-intl';

import { useReportNavItems } from '../../hooks/useNavigation';
import Button from '../elements/Button';

interface ReportNavProps {
  companyName: string;
}

const ReportNav = ({ companyName }: ReportNavProps) => {
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
      containerId: 'report-container'
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

  return (
    <div className="px-6 pt-8 flex flex-col h-full">
      <div>
        <Button
          linkTo="/reports"
          variant="none"
          newClassName="text-sm flex items-center hover:text-alt "
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" /> {t('back to saved')}
        </Button>
        <p className="text-sm mt-8">{t('risk assessment report')}</p>
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
                          isActive ? 'bg-highlight' : 'bg-gray-400'
                        } absolute top-2 h-full w-0.5 left-0`}
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex items-center ">
                      <span
                        className={`${
                          isActive
                            ? 'bg-highlight ring-highlight'
                            : 'bg-gray-400 ring-gray-400'
                        } h-0.5 w-0.5 rounded-full ring-8 `}
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
          {t('export pdf')}
        </Button>
        <Button variant="secondary">{t('export csv')}</Button>
      </div>
    </div>
  );
};

export default ReportNav;
