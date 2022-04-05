import NewsItem from './NewsCard';
import { useTranslations } from 'use-intl';
import { PlaceholderBox } from '../../elements/PlaceholderBox';
import { SearchIcon } from '@heroicons/react/outline';

type NewsDataType = {
  source: {
    domain: string;
  };
  title: string;
  content: string;
  url: string;
  pubDate: string;
};

const NewsFeed = ({
  items,
  companyName,
  forPrint
}: {
  items: NewsDataType[];
  companyName: string;
  forPrint?: boolean;
}) => {
  const newsHitSections: NewsDataType[][] =
    items &&
    items.reduce(
      (acc: any, curr: any, index) =>
        (index % 4 == 0 ? acc.push([curr]) : acc[acc.length - 1].push(curr)) &&
        acc,
      []
    );

  const t = useTranslations();

  return (
    <div className="">
      {/* No news in response */}
      {(items?.length === 0 || !items) && (
        <PlaceholderBox
          icon={<SearchIcon className="mr-3 w-5 stroke-orange-400" />}
          message={`${t('no_news_found')} for ${companyName}`}
        />
      )}
      <div className="">
        {newsHitSections &&
          newsHitSections.map((news, i) => {
            return (
              <div
                // style={{
                // //   'page-break-after': "always"
                // }}
                key={i}
                className={`print:h-[1000px] print:break-after-always  ${
                  i !== 0 && 'print:pt-10'
                } ${i === 0 && 'print:-mt-10'}`}
              >
                {news.map((newsItem: NewsDataType, i: number) => {
                  return (
                    <NewsItem
                      forPrint={forPrint}
                      key={i}
                      publication={newsItem?.source?.domain}
                      title={newsItem?.title}
                      description={newsItem?.content}
                      link={newsItem?.url}
                      date={newsItem?.pubDate}
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
