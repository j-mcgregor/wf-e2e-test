import NewsItem from './NewsCard';
import newsData from '../../../lib/mock-data/newsFeed';

const NewsFeed = () => {
  return (
    <div>
      {newsData.map((newsItem, i) => (
        <NewsItem
          key={i}
          publication={newsItem.publication}
          title={newsItem.title}
          description={newsItem.description}
          link={newsItem.link}
          date={newsItem.date}
        />
      ))}
    </div>
  );
};

export default NewsFeed;
