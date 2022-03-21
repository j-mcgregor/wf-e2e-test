/* eslint-disable security/detect-object-injection */
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import React from 'react';

import { RiskLevels } from '../../types/report';

interface CardWithTabProps {
  riskTitle: string;
  riskLevel: RiskLevels;
  // may need to be React.ReactNode due to some boldwords
  text: any;
  disabled?: boolean;
}

export const CardWithTab = ({
  riskTitle,
  riskLevel,
  text,
  disabled = true
}: CardWithTabProps) => {
  const t = useTranslations();

  const riskMap: Record<RiskLevels, Record<string, string>> = {
    high: {
      tab: 'bg-red-300 border-2 border-b-0 border-red-400',
      body: 'border-red-300 bg-red-100'
    },
    medium: {
      tab: 'bg-yellow-300 border-2 border-b-0 border-yellow-400',
      body: 'border-yellow-300 bg-yellow-100'
    },
    low: {
      tab: 'bg-green-300 border-2 border-b-0 border-green-400',
      body: 'border-green-300 bg-green-100'
    }
  };

  const isDisabled = disabled && !riskLevel;

  return (
    <div className={`flex flex-col w-full ${disabled ? 'opacity-30' : ''}`}>
      {/* header */}
      <div className="flex flex-row justify-between items-center">
        <div className="font-bold text-lg">{riskTitle}</div>
        <h5
          className={classNames(
            'font-bold uppercase w-28 py-1 text-center',
            !isDisabled ? riskMap?.[riskLevel]?.tab : 'bg-gray-200'
          )}
        >
          {!isDisabled ? riskLevel : t('na')}
        </h5>
      </div>
      {/* body */}
      <p
        className={classNames(
          'border-2 text-sm',
          !isDisabled ? riskMap?.[riskLevel]?.body : 'bg-gray-200',
          disabled ? 'p-6' : 'p-2'
        )}
      >
        {!disabled && text}
      </p>
    </div>
  );
};
