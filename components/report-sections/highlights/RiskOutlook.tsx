import { useTranslations } from 'next-intl';

import { RiskOutlookData } from '../../../types/report';
import Hint from '../../elements/Hint';

interface RiskOutlookProps {
  hintTitle: string;
  hintBody: string;
  country?: string;
  riskOutlookData?: RiskOutlookData;
  hasLegalEvents: boolean;
}

const RiskOutlook = ({
  hintTitle,
  hintBody,
  country,
  riskOutlookData,
  hasLegalEvents
}: RiskOutlookProps) => {
  const t = useTranslations();

  const judgements =
    `${riskOutlookData?.governance?.judgements_12_months}` || t('na');
  const paymentRemarks =
    `${riskOutlookData?.governance?.payment_remarks_12_months}` || t('na');
  const region = riskOutlookData?.benchmark?.region;
  const sector = riskOutlookData?.benchmark?.sector;

  return (
    <div className="flex flex-col w-full">
      <div className="flex pb-4">
        <p className="font-bold pr-8">{t('risk_outlook')}</p>
        <Hint title={hintTitle} body={hintBody} />
      </div>
      <div className="flex flex-col print:border-2 w-full">
        <ul
          className="list-disc bg-white px-8 rounded-md py-2 w-full"
          data-testid="risk-outlook-list"
        >
          <li className="py-2 text-sm lg:text-sm">
            {riskOutlookData?.leverage === 'positive'
              ? t('leverage_positive')
              : t('leverage_negative')}
          </li>
          <li className="py-2 text-sm lg:text-sm">
            {riskOutlookData?.liquidity === "'positive"
              ? t('liquidity_positive')
              : t('liquidity_negative')}
          </li>
          <li className="py-2 text-sm lg:text-sm">
            {riskOutlookData?.profitability === 'positive'
              ? t('profitability_positive')
              : t('profitability_negative')}
          </li>
          {hasLegalEvents && judgements && paymentRemarks && (
            <li className="py-2 text-sm lg:text-sm">
              {t('governance_template', {
                judgements,
                paymentRemarks
              })}
            </li>
          )}
          {region && sector && country && (
            <li className="py-2 text-sm lg:text-sm">
              {t('benchmark_template', {
                region,
                sector,
                country
              })}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default RiskOutlook;
