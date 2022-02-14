import React from 'react';

import { useTranslations } from 'next-intl';
import { Timeline } from 'react-twitter-widgets';
import ErrorBoundary from './ErrorBoundary';
import LoadingIcon from '../svgs/LoadingIcon';

const TwitterFeed = ({ className }: { className?: string }) => {
  const t = useTranslations();
  const [showWidget, setShowWidget] = React.useState(false);

  React.useEffect(() => {
    if (!showWidget) {
      setShowWidget(true);
    }
    return () => setShowWidget(false);
  }, []);

  return (
    <ErrorBoundary>
      <div
        className={`relative shadow bg-white ${
          !showWidget && 'animate-pulse'
        } overflow-hidden rounded ${className} `}
      >
        <div className="animate-pulse bg-gray-300 h-full w-full relative -z-10" />
        <div className="hidden md:block absolute z-10 h-full w-full top-0">
          {showWidget ? (
            <Timeline
              dataSource={{
                sourceType: 'profile',
                screenName: 'Wiserfunding'
              }}
              options={{ height: 398 }}
              renderError={_err => <p>Could not load timeline</p>}
            />
          ) : (
            <div className="w-full h-full  flex items-center justify-center">
              {' '}
              <LoadingIcon />{' '}
            </div>
          )}
        </div>
        <div className="block md:hidden absolute z-10 h-full w-full top-0">
          {showWidget ? (
            <Timeline
              dataSource={{
                sourceType: 'profile',
                screenName: 'Wiserfunding'
              }}
              options={{ height: 600 }}
              renderError={_err => <p>Could not load timeline</p>}
            />
          ) : (
            <div className="w-full h-full  flex items-center justify-center">
              {' '}
              <LoadingIcon />{' '}
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default TwitterFeed;
