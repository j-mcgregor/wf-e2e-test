import { ArrowNarrowUpIcon } from '@heroicons/react/solid';
import React from 'react';

import Link from '../elements/Link';

// eslint-disable-next-line no-unused-vars
export type HeroIcon = (props: React.ComponentProps<'svg'>) => JSX.Element;

interface LinkCardProps {
  icon?: React.ComponentProps<'svg'>;
  iconColor?: string;
  header: React.ReactNode;
  description?: React.ReactNode;
  linkTo?: string;
  className?: string;
  disabled?: boolean;
  download?: boolean;
  onClick?: () => any;
  includeHover?: boolean;
}

const LinkCard = ({
  icon,
  iconColor,
  header,
  description,
  linkTo,
  className,
  disabled,
  download,
  onClick,
  includeHover
}: LinkCardProps) => {
  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <Link
      disabled={disabled}
      linkTo={linkTo}
      className={`block text-primary max-w-xxs  ${className}`}
      onClick={onClick}
      download={download}
    >
      <div
        className={`${!disabled ? 'opacity-100' : 'opacity-50'} ${
          includeHover ? 'hover:shadow-xl duration-300 transition-shadow' : ''
        } shadow  h-full  bg-white rounded p-3`}
        data-testid="link-card"
      >
        <div className="w-full flex justify-between ">
          <div className={`${iconColor}  p-2 `}>{icon}</div>

          <ArrowNarrowUpIcon className="h-6 w-6 m-2 rotate-45 text-gray-400 cursor-pointer" />
        </div>
        <div className="text-sm pt-2 w-full flex flex-col">
          <p className="font-bold break-words w-full">{header}</p>
          <p className="pt-1 opacity-80">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default LinkCard;
