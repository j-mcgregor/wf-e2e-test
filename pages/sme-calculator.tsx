/* eslint-disable security/detect-non-literal-require */
import { GetStaticPropsContext } from 'next';
import Layout from '../components/layout/Layout';
import AutomatedReports from '../components/sme-calc-sections/AutomatedReports';

const SMECalculator = () => {
  return (
    <Layout title="SME Calc">
      <div className="text-primary">
        <h1 className="text-2xl">SME Calculator </h1>
        <AutomatedReports />
      </div>
    </Layout>
  );
};

export default SMECalculator;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        // You can get the messages from anywhere you like, but the recommended
        // pattern is to put them in JSON files separated by language and read
        // the desired one based on the `locale` received from Next.js.
        ...require(`../messages/${locale}/sme-calculator.${locale}.json`),
        ...require(`../messages/${locale}/general.${locale}.json`)
      }
    }
  };
}
