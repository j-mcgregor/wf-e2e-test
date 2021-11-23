import { useTranslations } from 'next-intl';
import Hint from '../../elements/Hint';

import { FinancialYear } from '../../../types/report';

interface OutlookProps {
  reports: string[];
  hintTitle: string;
  hintBody: string;
  financials: FinancialYear[];
}

// fake vales for Benchmark score (5)
const sme_zscore_benchmark = {
  this_company: 456,
  industry_benchmark: 903,
  country_benchmark: 782
};

const riskOutlookSettings = {
  overLeveragedValue: 4000,
  liquidityOptimalValue: 4000,
  profitabilityMarkerValue: 4000
};

// type for result of outlook function - 5 string array - might be re-useable
type Outlook = [string, string, string, string, string];

const RiskOutlook = ({
  reports,
  hintTitle,
  hintBody,
  financials
}: OutlookProps) => {
  const t = useTranslations();

  const getRiskOutlook = (data: FinancialYear): Outlook => {
    const totalAssets = Number(data.total_assets);

    const shareholderFundsByAssets =
      Number(data.total_shareholder_funds) / totalAssets;

    const workingCapitalByAssets = Number(data.working_capital) / totalAssets;

    const ebitdaByAssets = Number(data.ebitda) / totalAssets;

    // 1. Leveraged
    // shareholder_funds / total_assets > "overLeveragedValue"

    // 2. Liquidity
    // working_capital / total_assets > "liquidityOptimalValue"

    // 3. Profitability
    // ebitda / total_assets > "profitabilityMarkerValue"

    // 4. Governance
    // ...
    // 5. Benchmark
    // ...

    //! need to add strings to translation messages
    const leveragedString =
      shareholderFundsByAssets > riskOutlookSettings.overLeveragedValue
        ? t('this_company_is_highly)leveraged')
        : t('the_company_is_well_collateralised');

    const liquidityString =
      workingCapitalByAssets > riskOutlookSettings.liquidityOptimalValue
        ? t('there_is_good_liquidity')
        : t('liquidity_is_below_optimum');

    const profitabilityString =
      ebitdaByAssets > riskOutlookSettings.profitabilityMarkerValue
        ? t('an_efficiently_run_company')
        : t('assets_are_not_being_used_profitably');

    const governanceString = '';

    const benchmarkString = '';

    // must return array of 5 strings

    return [
      leveragedString,
      liquidityString,
      profitabilityString,
      governanceString,
      benchmarkString
    ];
  };

  // first index from financials = most recent financial year available
  // console.log(getRiskOutlook(financials[0]));

  return (
    <div className="flex flex-col">
      <div className="flex pb-4">
        <p className="font-bold pr-8">{t('risk_outlook')}</p>
        <Hint title={hintTitle} body={hintBody} />
      </div>
      <div className="flex flex-col print:border-2">
        <ul className="list-disc px-6" data-testid="risk-outlook-list">
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
