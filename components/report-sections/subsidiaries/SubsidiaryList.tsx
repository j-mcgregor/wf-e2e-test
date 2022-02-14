import { useTranslations } from 'next-intl';
import React from 'react';

import { Subsidiary } from '../../../types/report';
import { PlaceholderBox } from '../../elements/PlaceholderBox';
import { CircleX } from '../../svgs/CircleX';
import EntityCard from '../../cards/EntityCard';
import { renderArrayForPrint } from '../../../lib/utils/print-helpers';

interface SubsidiaryListProps {
  subsidiaries: Subsidiary[];
}

export const SubsidiaryList = ({ subsidiaries }: SubsidiaryListProps) => {
  const t = useTranslations();

  const subsidiariesToRender: Subsidiary[][] = renderArrayForPrint(
    subsidiaries,
    64
  );

  return (
    <div className="mb-4 avoid-break">
      <p className="text-xl py-4 print:text-2xl print:py-6">
        {t('subsidiaries')}
      </p>

      {subsidiaries.length ? (
        subsidiariesToRender.map((subArray, index) => {
          return (
            <div
              key={index}
              className={`${
                index !== 0 && 'print:translate-y-[80px]'
              } grid sm:grid-cols-2 lg:grid-cols-3 gap-4 print:gap-0 print:grid-cols-4 sm:print:grid-cols-4 lg:print:grid-cols-4 print:border-2 print:px-4 print:py-2 avoid-break`}
            >
              {subArray.map((subsidiary, i) => {
                const type = subsidiary.iso_code ? 'corporate' : 'individual';
                return (
                  <EntityCard
                    key={`subsidiary-${i}`}
                    name={subsidiary.name}
                    type={type}
                  />
                );
              })}
            </div>
          );
        })
      ) : (
        <PlaceholderBox
          icon={<CircleX className="mr-3 stroke-orange-400" />}
          message={t('no_subsidiaries_found')}
        />
      )}
    </div>
  );
};
