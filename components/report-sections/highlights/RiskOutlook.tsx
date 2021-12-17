import { useTranslations } from 'next-intl';
import Hint from '../../elements/Hint';

import { FinancialYear, LegalEvent } from '../../../types/report';
import { toUpper } from 'lodash';
import { Events } from 'react-scroll';

type BenchmarksType = {
  value: number;
  industry_benchmark?: number | null;
  regional_benchmark?: number | null;
};

interface OutlookProps {
  hintTitle: string;
  hintBody: string;
  financials: FinancialYear[];
  benchmarks: BenchmarksType;
  country?: string;
  legalEvents: LegalEvent[];
}

const riskOutlookSettings = {
  overLeveragedValue: 4000,
  liquidityOptimalValue: 4000,
  profitabilityMarkerValue: 4000
};

const RiskOutlook = ({
  hintTitle,
  hintBody,
  financials,
  benchmarks,
  country,
  legalEvents
}: OutlookProps) => {
  const t = useTranslations();

  const allJudgements = legalEvents.filter((event: LegalEvent) => {
    const types = event.types.map((type: string) => type.toLowerCase());
    return types.includes('default') || types.includes('payment remark')
      ? event
      : null;
  }).length;

  const paymentRemarks = legalEvents.filter((event: LegalEvent) =>
    event.types
      .map((type: string) => type.toLowerCase())
      .includes('payment remark')
      ? event
      : null
  ).length;

  const getRiskOutlook = (data: FinancialYear): string[] => {
    const totalAssets = Number(data?.total_assets);

    const shareholderFundsByAssets =
      Number(data?.total_shareholder_funds) / totalAssets;

    const workingCapitalByAssets = Number(data?.working_capital) / totalAssets;

    const ebitdaByAssets = Number(data?.ebitda) / totalAssets;

    const industryBenchmark =
      benchmarks?.industry_benchmark &&
      benchmarks?.value < benchmarks?.industry_benchmark;
    const regionalBenchmark =
      benchmarks?.regional_benchmark &&
      benchmarks?.value < benchmarks?.regional_benchmark;

    const leveragedString =
      shareholderFundsByAssets > riskOutlookSettings.overLeveragedValue
        ? t('this_company_is_highly_leveraged')
        : t('the_company_is_well_collateralised');

    const liquidityString =
      workingCapitalByAssets > riskOutlookSettings.liquidityOptimalValue
        ? t('there_is_good_liquidity')
        : t('liquidity_is_below_optimum');

    const profitabilityString =
      ebitdaByAssets > riskOutlookSettings.profitabilityMarkerValue
        ? t('an_efficiently_run_company')
        : t('assets_are_not_being_used_profitably');

    const governanceString = `${t(
      'in_the_last_12_months'
    )} ${allJudgements} ${t('judgements')} ${paymentRemarks} ${t(
      'payment_remarks'
    )}`;

    const benchmarkString = `${t('the_credit_risk_is')} ${
      industryBenchmark ? t('below') : t('above')
    } ${t('the_average_for_this_sector_and')} ${
      regionalBenchmark ? t('below') : t('above')
    } ${t('the_average_for')} ${country}.`;

    return [
      leveragedString,
      liquidityString,
      profitabilityString,
      governanceString,
      benchmarkString
    ];
  };

  // first index from financials = most recent financial year available
  const reports = getRiskOutlook(financials[0]);

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
