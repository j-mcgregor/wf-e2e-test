/* eslint-disable security/detect-object-injection */
import { useTranslations } from 'next-intl';
import ChartMulti from '../../charts/ChartMulti';

interface RiskMetricGraphsProps {
  data: any[];
  companyName: string;
}

const RiskMetricGraphs = ({ data, companyName }: RiskMetricGraphsProps) => {
  const t = useTranslations();

  const renderChart = (category: any, percentage: boolean) => {
    return [
      {
        name: companyName,
        data: Object.keys(data).map((key: any) => ({
          x: data[key].period,
          y:
            percentage && data[key][category] !== undefined
              ? Number((data[key][category] * 100).toFixed(2))
              : Number(data[key][category].toFixed(2))
        }))
      }
    ];
  };

  const smeZScore = renderChart('sme_z_score', false);
  const probabilityOfDefault = renderChart(
    'probability_of_default_1_year',
    true
  );
  const lossGivenDefault = renderChart('loss_given_default', true);

  return (
    // <div className=" my-8 flex  mt-2 flex-wrap justify-evenly mb-4 print:border-2 ">

    <>
      {/* <div className=" w-[300px] mb-4 print:inline-block print:w-[200px] avoid-break  md:w-[250px] 2xl:w-[280px] mx-auto"> */}
      <div className="print:inline-block avoid-break">
        <ChartMulti
          header={t('sme_zscore_trend')}
          subHeader={t('trend_yearly')}
          hintBody="Ea pariatur commodo anim proident sunt non eu ut."
          hintTitle={t('sme_zscore')}
          graphData={smeZScore}
          chartType="zscore"
          showLabels={true}
        />
      </div>

      {/* <div className=" w-[300px] mb-4 print:inline-block print:w-[200px] avoid-break  md:w-[250px] 2xl:w-[280px] mx-auto"> */}
      <div className="print:inline-block avoid-break">
        <ChartMulti
          header={t('probability_of_default_trend')}
          subHeader={`${t('percentage')} %`}
          hintBody="Reprehenderit nisi dolore non ea nisi officia laborum."
          hintTitle={t('probability_of_default')}
          graphData={probabilityOfDefault}
          chartType="percentage"
          showLabels={true}
        />
      </div>

      {/* <div className=" w-[300px] mb-4 print:inline-block print:w-[200px] avoid-break  md:w-[250px] 2xl:w-[280px] mx-auto"> '*/}
      <div className="print:inline-block avoid-break ">
        <ChartMulti
          header={t('loss_give_default_trend')}
          subHeader={`${t('percentage')} %`}
          hintBody="Anim ea officia ut pariatur laborum est amet."
          hintTitle={t('loss_give_default')}
          graphData={lossGivenDefault}
          chartType="percentage"
          showLabels={true}
        />
      </div>
    </>
  );
};

export default RiskMetricGraphs;
