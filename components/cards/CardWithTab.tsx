/* eslint-disable security/detect-object-injection */
import classNames from 'classnames';
import React from 'react';

import { RiskLevels } from '../../types/report';

interface CardWithTabProps {
  riskTitle: string;
  riskLevel: RiskLevels;
  // may need to be React.ReactNode due to some boldwords
  text: any;
}

export const CardWithTab = ({
  riskTitle,
  riskLevel,
  text
}: CardWithTabProps) => {
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

  return (
    <div className="flex flex-col w-full">
      {/* header */}
      <div className="flex flex-row justify-between items-center">
        <div className="font-bold text-lg">{riskTitle}</div>
        <h5
          className={classNames(
            'font-bold uppercase w-28 py-1 text-center',
            riskMap[riskLevel].tab
          )}
        >
          {riskLevel}
        </h5>
      </div>
      {/* body */}
      <p className={classNames('border-2 p-2 ', riskMap[riskLevel].body)}>
        {text}
      </p>
    </div>
  );
};
