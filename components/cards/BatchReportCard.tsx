import { ArrowNarrowUpIcon } from '@heroicons/react/solid';
import React from 'react';
import { TranslateInput } from '../../types/global';

import Link from '../elements/Link';

// eslint-disable-next-line no-unused-vars
export type HeroIcon = (props: React.ComponentProps<'svg'>) => JSX.Element;

interface BatchReportCardProps {
  icon: React.ComponentProps<'svg'>;
  iconColor: string;
  header: React.ReactNode;
  quantity: React.ReactNode;
  quantityText: TranslateInput;
  linkTo?: string;
  className?: string;
  disabled?: boolean;
}

const BatchReportCard = ({
  icon,
  iconColor,
  header,
  quantity,
  quantityText,
  linkTo,
  className,
  disabled
}: BatchReportCardProps) => {
  return (
    <div className={`${disabled && 'opacity-50'}`}>
      <Link
        disabled={disabled}
        linkTo={linkTo}
        className={`block text-primary ${className} ${
          disabled && 'cursor-auto'
        }`}
      >
        <div
          className={`${
            !disabled && 'hover:shadow-xl duration-300 transition-shadow'
          }
            shadow h-full max-w-xxs bg-white rounded p-3`}
          data-testid="link-card"
        >
          <div className="w-full flex justify-between ">
            <div className={`${iconColor}  p-2 `}>{icon}</div>
            <ArrowNarrowUpIcon className="h-6 w-6 m-2 rotate-45 text-gray-400 cursor-pointer" />
          </div>
          <div className="text-sm pt-2 w-full flex flex-col">
            <p className="font-bold w-full overflow-ellipsis truncate">
              {header}
            </p>
          </div>
          <div className="w-full bg-bg text-center py-2 rounded-sm mt-3">
            <p className="text-xl font-bold">{quantity}</p>
            <p className="text-xs">{quantityText}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BatchReportCard;
