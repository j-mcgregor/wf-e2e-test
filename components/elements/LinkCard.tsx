import { ArrowNarrowUpIcon } from '@heroicons/react/solid';
import Link from './Link';

export type HeroIcon = (props: React.ComponentProps<'svg'>) => JSX.Element;

interface LinkCardProps {
  icon: React.ComponentProps<'svg'>;
  iconColor: string;
  header: React.ReactNode;
  description: React.ReactNode;
  linkTo: string;
}

const LinkCard = ({
  icon,
  iconColor,
  header,
  description,
  linkTo
}: LinkCardProps) => {
  return (
    <div className="w-full flex flex-wrap justify-between py-8">
      <div className="shadow w-52 h-52 bg-white rounded">
        <div className="w-full flex justify-between">
          <div className={`${iconColor} m-2 p-2 `}>{icon}</div>
          <Link linkTo={linkTo}>
            <ArrowNarrowUpIcon className="h-6 w-6 m-2 rotate-45        text-gray-400 cursor-pointer" />
          </Link>
        </div>
        <div className="text-xs p-2 w-full flex flex-col">
          <p className="font-bold w-full">{header}</p>
          <p className="py-2 text-gray-700">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default LinkCard;
