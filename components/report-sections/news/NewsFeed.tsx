import NewsItem from './NewsCard';
import useSWR from 'swr';
import fetcher from '../../../lib/utils/fetcher';
import SkeletonNews from '../../skeletons/SkeletonNews';
import { ApplicationError } from '../../errors/ApplicationError';
import { useTranslations } from 'use-intl';

type NewsDataType = {
  source: string;
  title: string;
  content: string;
  url: string;
  pubDate: string;
};

type NewsFeedApiResProps = {
  ok: boolean;
  data: NewsDataType[];
};

const NewsFeed = ({
  companyName,
  country
}: {
  companyName: string;
  country: string;
}) => {
  // demo engaged for the moment, returns saved response
  const { data } = useSWR<NewsFeedApiResProps>(
    `/api/reports/news?company_name=${companyName}&${country}&type=demo`,
    fetcher
  );
  const newsHits = data?.ok && data?.data ? data.data : [];

  const newsHitSections: NewsDataType[][] =
    newsHits &&
    newsHits.reduce(
      (acc: any, curr: any, index) =>
        (index % 4 == 0 ? acc.push([curr]) : acc[acc.length - 1].push(curr)) &&
        acc,
      []
    );

  const t = useTranslations();

  return (
    <div className="">
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
      <div className="">
        {newsHitSections &&
          newsHitSections.map((news, i) => {
            return (
              <div
                key={i}
                className={`print:avoid-break ${i !== 0 && 'print:pt-10'} ${
                  i === 0 && 'print:-m-10'
                }`}
              >
                {news.map((newsItem: NewsDataType, i: number) => {
                  return (
                    <NewsItem
                      key={i}
                      publication={newsItem.source}
                      title={newsItem.title}
                      description={newsItem.content}
                      link={newsItem.url}
                      date={newsItem.pubDate}
                    />
                  );
                })}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default NewsFeed;
