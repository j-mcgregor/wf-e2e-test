import NewsItem from './NewsCard';
import useSWR from 'swr';
import fetcher from '../../../lib/utils/fetcher';
import SkeletonNews from '../../skeletons/SkeletonNews';
import { ApplicationError } from '../../errors/ApplicationError';
import { useTranslations } from 'use-intl';

type NewsFeedApiResProps = {
  ok: boolean;
  data: {
    source: string;
    title: string;
    content: string;
    url: string;
    pubDate: string;
  }[];
};

const NewsFeed = ({ companyName }: { companyName: string }) => {
  // demo engaged for the moment, returns saved response
  const { data } = useSWR<NewsFeedApiResProps>(
    `/api/reports/news?company_name=${companyName}&type=demo`,
    fetcher
  );
  const newsHits = data?.ok && data?.data ? data.data : [];

  const t = useTranslations();

  return (
    <div className=" ">
      {/* Loading data response */}
      {!data && [1, 2, 3, 4, 5].map(x => <SkeletonNews key={x} />)}

      {/* Error in response */}
      {!data?.ok && (
        <ApplicationError
          error={{
            name: 'Error fetching news',
            message: `There was an error fetching the news for ${companyName}. Please contact support if this issue persists.`
          }}
        />
      )}

      {/* No news in response */}
      {newsHits.length === 0 && data?.ok && (
        <div className="text-center">
          {t('no_news_found')} {companyName}
        </div>
      )}

      {/* Map over the successfully loaded news */}
      {newsHits &&
        newsHits.map((newsItem, i) => (
          <NewsItem
            key={i}
            publication={newsItem.source}
            title={newsItem.title}
            description={newsItem.content}
            link={newsItem.url}
            date={newsItem.pubDate}
          />
        ))}
    </div>
  );
};

export default NewsFeed;
