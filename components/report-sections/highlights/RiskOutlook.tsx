import { useTranslations } from 'next-intl';
import InfoPopover from '../risk-metrics/InfoPopover';

interface OutlookProps {
  reports: string[];
  hintTitle: string;
  hintBody: string;
}

const RiskOutlook = ({ reports, hintTitle, hintBody }: OutlookProps) => {
  const t = useTranslations();
  return (
    <div className="flex flex-col">
      <div className="flex pb-4">
        <p className="font-bold pr-8">{t('risk outlook')}</p>
        <InfoPopover title={hintTitle} body={hintBody} />
      </div>
      <div className="flex flex-col">
        <ul className="list-disc px-6">
          {reports.map((report, i) => {
            return (
              <li className="py-2 text-sm lg:text-sm" key={i}>
                {report}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default RiskOutlook;
