import { useTranslations } from 'next-intl';
import React from 'react';

import { Subsidiary } from '../../../types/report';
import { PlaceholderBox } from '../../elements/PlaceholderBox';
import { CircleX } from '../../svgs/CircleX';
import { SubsidiaryCard } from './SubsidiaryCard';

interface SubsidiaryListProps {
  subsidiaries: Subsidiary[];
  companyName: string;
}

export const SubsidiaryList = ({
  subsidiaries,
  companyName
}: SubsidiaryListProps) => {
  const t = useTranslations();

  return (
    <div className="mb-4 avoid-break">
      <p className="text-xl py-4 print:text-2xl print:py-6">
        {t('subsidiaries')}
      </p>

      {subsidiaries?.length ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 print:gap-0 print:grid-cols-4 sm:print:grid-cols-4 lg:print:grid-cols-4 print:border-2 print:px-4 print:py-2">
          {subsidiaries.map((sub, i) => (
            <SubsidiaryCard key={`subsidiary-${i}`} name={sub.name} />
          ))}
        </div>
      ) : (
        <PlaceholderBox
          icon={<CircleX className="mr-3 stroke-orange-400" />}
          message={`Sorry we could not find
        any subsidiaries for ${companyName}`}
        />
      )}
    </div>
  );
};
