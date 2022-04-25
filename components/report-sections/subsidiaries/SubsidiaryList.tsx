import { useTranslations } from 'next-intl';
import { useWindowWidth } from '../../../hooks/useWindowSize';
import { Subsidiary } from '../../../types/report';
import { PlaceholderBox } from '../../elements/PlaceholderBox';
import { CircleX } from '../../svgs/CircleX';
import EntityCard from '../../cards/EntityCard';
import { renderArrayForPrint } from '../../../lib/utils/print-helpers';

interface SubsidiaryListProps {
  subsidiaries: Subsidiary[];
  isPrint: boolean | undefined;
}

export const SubsidiaryList = ({
  subsidiaries,
  isPrint
}: SubsidiaryListProps) => {
  const t = useTranslations();
  const windowWidth = useWindowWidth() || 0;

  // if window width is above 640px (eg 2 col grid) = max cards per split section needs to be divisible by 2 so set to 40
  // if window width is above  1024px (eg 3 col grid) = max cards per split section needs to divisible by 3, so set to 39
  const maxCardsPerPage = isPrint || windowWidth < 1024 ? 64 : 63;
  const subsidiariesToRender: Subsidiary[][] = renderArrayForPrint(
    subsidiaries,
    maxCardsPerPage
  );

  return (
    <div className="mb-4 avoid-break">
      <p className="text-xl py-4 print:text-2xl print:py-6">
        {t('subsidiaries')}
      </p>

      {subsidiaries?.length ? (
        subsidiariesToRender.map((subArray, index) => {
          return (
            <div
              key={index}
              className={`${
                index !== 0 ? 'print:translate-y-[80px]' : ''
              } grid sm:grid-cols-2 lg:grid-cols-3 gap-4 print:gap-0 print:grid-cols-4 sm:print:grid-cols-4 lg:print:grid-cols-4 print:border-2 print:px-4 print:py-2 avoid-break`}
            >
              {subArray.map((subsidiary, i) => {
                const type = subsidiary.iso_code ? 'corporate' : 'individual';
                return (
                  <EntityCard
                    key={`subsidiary-${i}`}
                    name={subsidiary.name}
                    iso_code={subsidiary.iso_code}
                    company_id={subsidiary.company_id}
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
