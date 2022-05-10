import { useTranslations } from 'next-intl';

import { RiskOutlookData } from '../../../types/report';
import Hint from '../../elements/Hint';
import { PlaceholderBox } from '../../elements/PlaceholderBox';
import { CircleX } from '../../svgs/CircleX';

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
  riskOutlookData,
  hasLegalEvents
}: RiskOutlookProps) => {
  const t = useTranslations();

  const judgements =
    `${riskOutlookData?.governance?.judgements_12_months}` || t('na');
  const paymentRemarks =
    `${riskOutlookData?.governance?.payment_remarks_12_months}` || t('na');

  return (
    <div className="flex flex-col w-full">
      <div className="flex pb-4">
        <p className="font-bold pr-8">{t('risk_outlook')}</p>
        <Hint title={hintTitle} body={hintBody} />
      </div>
      <div className="flex flex-col print:border-2 w-full">
        {riskOutlookData ? (
          <ul
            className="list-disc bg-white px-8 rounded-md py-2 w-full"
            data-testid="risk-outlook-list"
          >
            <li className="py-2 text-sm lg:text-sm">
              {riskOutlookData?.leverage &&
                t(`leverage_${riskOutlookData?.leverage}`)}
            </li>
            <li className="py-2 text-sm lg:text-sm">
              {riskOutlookData?.liquidity &&
                t(`liquidity_${riskOutlookData?.liquidity}`)}
            </li>
            <li className="py-2 text-sm lg:text-sm">
              {riskOutlookData?.profitability &&
                t(`profitability_${riskOutlookData?.profitability}`)}
            </li>
            {riskOutlookData?.indebtedness && (
              <li className="py-2 text-sm lg:text-sm">
                {t(`indebtedness_${riskOutlookData?.indebtedness}`)}
              </li>
            )}
            {hasLegalEvents && judgements && paymentRemarks && (
              <li className="py-2 text-sm lg:text-sm">
                {t('governance_template', {
                  judgements,
                  paymentRemarks
                })}
              </li>
            )}
          </ul>
        ) : (
          <PlaceholderBox
            icon={<CircleX className="mr-3 stroke-orange-400" />}
            message={t('no_risk_outlook')}
          />
        )}
      </div>
    </div>
  );
};

export default RiskOutlook;
