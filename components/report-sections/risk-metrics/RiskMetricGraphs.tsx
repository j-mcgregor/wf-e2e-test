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
    <div className="px-2 my-8 grid sm:grid-cols-2 md:grid-cols-3 gap-2  mt-2">
      {/* === sme z-score === */}
      <ChartMulti
        header={t('sme_zscore')}
        hintBody="Ea pariatur commodo anim proident sunt non eu ut."
        hintTitle={t('sme_zscore')}
        graphData={smeZScore}
      />

      {/* === probability of default */}
      <ChartMulti
        header={t('probability_of_default')}
        hintBody="Reprehenderit nisi dolore non ea nisi officia laborum."
        hintTitle={t('probability_of_default')}
        graphData={probabilityOfDefault}
      />

      {/* === loss given default ===  */}
      <ChartMulti
        header={t('loss_give_default')}
        hintBody="Anim ea officia ut pariatur laborum est amet."
        hintTitle={t('loss_give_default')}
        graphData={lossGivenDefault}
      />
    </div>
  );
};

export default RiskMetricGraphs;
