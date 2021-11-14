export interface NewsItemProps {
  publication: string;
  title: string;
  description: string;
  link: string;
  date: string;
}

const NewsItem = ({
  publication,
  title,
  description,
  link,
  date
}: NewsItemProps) => {
  const relativeDate = new Date(date).toLocaleDateString();
  const charCleanDescription = description.replace(/\[\+.+\]/g, '');
  return (
    <div
      className="bg-white shadow-sm rounded-sm w-full flex flex-col p-4 text-sm my-6"
      data-testid="news-card-testid"
    >
      <div className="flex w-full justify-between italic pb-3">
        <p className="">{publication}</p>
        <p>{relativeDate}</p>
      </div>
      <div className="flex flex-col w-full">
        <p className="font-bold">{title}</p>
        <p className="py-3">{charCleanDescription}</p>
        <a href={link} target="_blank no-opener no-referral" className="italic">
          {link}
        </a>
      </div>
    </div>
  );
};

export default NewsItem;
