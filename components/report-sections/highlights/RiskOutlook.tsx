import { useTranslations } from 'next-intl';
import Hint from '../../elements/Hint';

import { FinancialYear } from '../../../types/report';

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
}

const riskOutlookSettings = {
  overLeveragedValue: 4000,
  liquidityOptimalValue: 4000,
  profitabilityMarkerValue: 4000
};

const governance = {
  payment_remarks_12_months: 234,
  ccj_12_months: 334
};

const RiskOutlook = ({
  hintTitle,
  hintBody,
  financials,
  benchmarks,
  country
}: OutlookProps) => {
  const t = useTranslations();

  const getRiskOutlook = (data: FinancialYear): string[] => {
    const totalAssets = Number(data.total_assets);

    const shareholderFundsByAssets =
      Number(data.total_shareholder_funds) / totalAssets;

    const workingCapitalByAssets = Number(data.working_capital) / totalAssets;

    const ebitdaByAssets = Number(data.ebitda) / totalAssets;

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

    const governanceString = `${t('in_the_last_12_months')} ${
      governance.ccj_12_months
    } ${t('judgements')} ${governance.payment_remarks_12_months} ${t(
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
