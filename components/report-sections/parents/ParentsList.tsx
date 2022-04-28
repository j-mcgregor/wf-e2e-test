import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { Parent } from '../../../types/report';

import { PlaceholderBox } from '../../elements/PlaceholderBox';
import { CircleX } from '../../svgs/CircleX';
import ShareHolderCard from '../corporate-governance/ShareHolderCard';

interface ParentsListProps {
  parents: Parent[];
}

export const ParentsList = ({ parents }: ParentsListProps) => {
  const t = useTranslations();
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  return (
    <div className="mb-4 avoid-break">
      <p className="text-xl py-4 print:text-2xl print:py-6">{t('parents')}</p>

      {parents?.length ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 print:gap-0 print:grid-cols-4 sm:print:grid-cols-4 lg:print:grid-cols-4 print:border-2 print:px-4 print:py-2">
          {parents.map((parent, i: number) => (
            <ShareHolderCard
              key={`parent-${i}`}
              {...parent}
              disabled={isGeneratingReport}
              setDisabled={setIsGeneratingReport}
            />
          ))}
        </div>
      ) : (
        <PlaceholderBox
          icon={<CircleX className="mr-3 stroke-orange-400" />}
          message={t('no_parents_found')}
        />
      )}
    </div>
  );
};
