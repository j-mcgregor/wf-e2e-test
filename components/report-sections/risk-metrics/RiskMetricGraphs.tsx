/* eslint-disable security/detect-object-injection */
import { useTranslations } from 'next-intl';
import ChartMulti from '../../charts/ChartMulti';

interface RiskMetricGraphsProps {
  data: any[];
  companyName: string;
}

const RiskMetricGraphs = ({ data, companyName }: RiskMetricGraphsProps) => {
  const t = useTranslations();

  const renderChart = (category: any) => {
    return [
      {
        name: companyName,
        data: Object.keys(data).map((key: any) => ({
          x: data[key].period,
          y: data[key][category]
        }))
      }
    ];
  };

  const smeZScore = renderChart('sme_z_score');
  const probabilityOfDefault = renderChart('probability_of_default_1_year');
  const lossGivenDefault = renderChart('loss_given_default');

  return (
    <div className=" my-8 flex flex-wrap gap-x-4  mt-2 justify-center xl:justify-between mb-4 print:border-2">
      {/* === sme z-score === */}

      <div className=" w-[300px] mb-4 print:inline-block print:w-[200px] avoid-break">
        <ChartMulti
          header={t('sme_zscore_trend')}
          subHeader={t('trend_yearly')}
          hintBody="Ea pariatur commodo anim proident sunt non eu ut."
          hintTitle={t('sme_zscore')}
          graphData={smeZScore}
        />
      </div>

      {/* === probability of default */}
      <div className=" w-[300px] mb-4 print:inline-block print:w-[200px] avoid-break">
        <ChartMulti
          header={t('probability_of_default_trend')}
          subHeader={t('trend_yearly')}
          hintBody="Reprehenderit nisi dolore non ea nisi officia laborum."
          hintTitle={t('probability_of_default')}
          graphData={probabilityOfDefault}
        />
      </div>

      {/* === loss given default ===  */}
      <div className=" w-[300px] mb-4 print:inline-block print:w-[200px] avoid-break">
        <ChartMulti
          header={t('loss_give_default_trend')}
          subHeader={t('trend_yearly')}
          hintBody="Anim ea officia ut pariatur laborum est amet."
          hintTitle={t('loss_give_default')}
          graphData={lossGivenDefault}
        />
      </div>
    </div>
  );
};

export default RiskMetricGraphs;
