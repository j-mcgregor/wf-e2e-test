import { TranslateInput } from '../../../types/global';

interface NewsItemProps {
  publication: TranslateInput;
  title: TranslateInput;
  description: TranslateInput;
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
  return (
    <div className="bg-white shadow-sm rounded-sm w-full flex flex-col p-4 text-sm my-6">
      <div className="flex w-full justify-between italic pb-3">
        <p className="">{publication}</p>
        <p>{date}</p>
      </div>
      <div className="flex flex-col w-full">
        <p className="font-bold">{title}</p>
        <p className="py-3">{description}</p>
        <a href={link} className="italic">
          {link}
        </a>
      </div>
    </div>
  );
};

export default NewsItem;
