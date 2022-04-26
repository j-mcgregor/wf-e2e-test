import { useTranslations } from 'next-intl';
import { Subsidiary } from '../../../types/report';
import { PlaceholderBox } from '../../elements/PlaceholderBox';
import { CircleX } from '../../svgs/CircleX';
import EntityCard from '../../cards/EntityCard';
import { useState } from 'react';

interface SubsidiaryListProps {
  subsidiaries: Subsidiary[];
}

export const SubsidiaryList = ({ subsidiaries }: SubsidiaryListProps) => {
  const t = useTranslations();

  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  return (
    <div className="mb-4 avoid-break">
      <p className="text-xl py-4 print:text-2xl print:py-6">
        {t('subsidiaries')}
      </p>

      {subsidiaries?.length ? (
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subsidiaries.map((subsidiary, index) => {
            const type = subsidiary.iso_code ? 'corporate' : 'individual';
            return (
              <li key={`subsidiary-${index}`}>
                <EntityCard
                  disabled={isGeneratingReport}
                  setDisabled={setIsGeneratingReport}
                  name={subsidiary.name}
                  iso_code={subsidiary.iso_code}
                  company_id={subsidiary.company_id} // <-- incorrect; not company_id so causes 404
                  type={type}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <PlaceholderBox
          icon={<CircleX className="mr-3 stroke-orange-400" />}
          message={t('no_subsidiaries_found')}
        />
      )}
    </div>
  );
};
