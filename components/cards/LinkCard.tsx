import { ArrowNarrowUpIcon } from '@heroicons/react/solid';
import React from 'react'

import Link from '../elements/Link';

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
    <Link linkTo={linkTo} className="block text-primary">
      <div className="shadow hover:shadow-xl h-full duration-300 transition-shadow max-w-xxs bg-white rounded p-3">
        <div className="w-full flex justify-between ">
          <div className={`${iconColor}  p-2 `}>{icon}</div>
          <ArrowNarrowUpIcon className="h-6 w-6 m-2 rotate-45 text-gray-400 cursor-pointer" />
        </div>
        <div className="text-sm pt-2 w-full flex flex-col">
          <p className="font-bold w-full">{header}</p>
          <p className="pt-1 opacity-80">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default LinkCard;
