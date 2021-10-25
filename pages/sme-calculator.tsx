/* eslint-disable security/detect-non-literal-require */
import { useState } from 'react';
import { useTranslations } from 'use-intl';
import { GetStaticPropsContext } from 'next';
import Layout from '../components/layout/Layout';
import Button from '../components/elements/Button';
import SearchContainer from '../components/sme-calc-sections/SearchContainer';
import ProvideData from '../components/sme-calc-sections/ProvideData';

const SMECalculator = () => {
  const [showProvideData, setShowProvideData] = useState(false);

  const toggleProvideData = () => {
    setShowProvideData(!showProvideData);
  };

  const t = useTranslations();

  return (
    <Layout title="SME Calculator">
      <div
        className={`text-primary ${
          !showProvideData && '-ml-2 pr-2'
        } tidy-scrollbar`}
      >
        <SearchContainer disabled={showProvideData} />

        <div className="flex flex-col w-1/3 text-sm">
          <p
            className={`${
              !showProvideData ? 'visible' : 'invisible'
            } font-semibold py-4`}
          >
            {t('cant_find_the_company_you_were_looking_for')}
          </p>

          <Button
            variant="primary"
            className="rounded-none font-normal"
            onClick={toggleProvideData}
          >
            {!showProvideData ? t('provide_own_data') : t('search_for_company')}
          </Button>
        </div>
        {showProvideData && <ProvideData />}
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
