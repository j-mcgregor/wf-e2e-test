import { Timeline } from 'react-twitter-widgets';

const TwitterFeed = ({ className }: { className?: string }) => {
  return (
    <div
      className={`shadow bg-white overflow-hidden rounded ${className} `}
    >
      <Timeline
        dataSource={{
          sourceType: 'profile',
          screenName: 'Wiserfunding'
        }}
        options={{ height: 402 }}
      />
    </div>
  );
};

export default TwitterFeed;
