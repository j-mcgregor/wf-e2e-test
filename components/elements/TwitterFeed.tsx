import { Timeline } from 'react-twitter-widgets';

const TwitterFeed = ({ className }: { className?: string }) => {
  return (
    <div
      className={`shadow bg-white ${className} overflow-hidden rounded h-[400px]`}
    >
      <Timeline
        dataSource={{
          sourceType: 'profile',
          screenName: 'Wiserfunding'
        }}
        options={{ height: 400 }}
      />
    </div>
  );
};

export default TwitterFeed;
