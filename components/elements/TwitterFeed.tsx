import { Timeline } from 'react-twitter-widgets';

const TwitterFeed = ({ className }: { className?: string }) => {
  return (
    <div
      className={`relative shadow bg-white overflow-hidden rounded ${className} `}
    >
      <div className="animate-pulse bg-gray-300 h-full w-full relative -z-10" />

      <div className="hidden md:block absolute z-10 h-full w-full top-0">
        <Timeline
          dataSource={{
            sourceType: 'profile',
            screenName: 'Wiserfunding'
          }}
          options={{ height: 398 }}
        />
      </div>
      <div className="block md:hidden absolute z-10 h-full w-full top-0">
        <Timeline
          dataSource={{
            sourceType: 'profile',
            screenName: 'Wiserfunding'
          }}
          options={{ height: 600 }}
        />
      </div>
    </div>
  );
};

export default TwitterFeed;
