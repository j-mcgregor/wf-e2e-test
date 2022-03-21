export interface NewsItemProps {
  publication: string;
  title: string;
  description: string;
  link: string;
  date: string;
  forPrint?: boolean;
}

const NewsItem = ({
  publication,
  title,
  description,
  link,
  date,
  forPrint
}: NewsItemProps) => {
  const relativeDate = date && new Date(date).toLocaleDateString();
  const charCleanDescription =
    description && description.replace(/\[\+.+\]/g, '');

  const cappedBody =
    charCleanDescription && charCleanDescription.length > 400
      ? charCleanDescription.substring(0, 350) + '...'
      : charCleanDescription;

  const cappedTitle =
    forPrint && title && title.length > 90
      ? title.substring(0, 90) + '...'
      : title;

  const cappedLink =
    forPrint && link && link.length > 90 ? link.substring(0, 90) + '...' : link;
  return (
    <div
      className="bg-white shadow-sm rounded-sm w-full flex flex-col p-4 text-sm my-6 always-break print:shadow-none print:border-2"
      data-testid="news-card-testid"
    >
      <div className="flex w-full justify-between italic pb-3">
        <p className="">{publication}</p>
        <p>{relativeDate}</p>
      </div>
      <div className="flex flex-col w-full">
        <p className="font-bold">{cappedTitle}</p>
        <p className="py-3">{cappedBody}</p>
        <a href={link} target="_blank no-opener no-referral" className="italic">
          {cappedLink}
        </a>
      </div>
    </div>
  );
};

export default NewsItem;
