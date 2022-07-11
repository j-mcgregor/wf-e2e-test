/* eslint-disable security/detect-non-literal-require */
import { GetStaticPropsContext } from 'next';
import { useState } from 'react';
import useSWR from 'swr';
import { useTranslations } from 'use-intl';

import Button from '../components/elements/Button';
import Link from '../components/elements/Link';
import Layout from '../components/layout/Layout';
import ProvideData from '../components/sme-calc-sections/ProvideData';
import SearchContainer from '../components/sme-calc-sections/SearchContainer';
import useUser from '../hooks/useUser';
import fetcher from '../lib/utils/fetcher';

const SMECalculator = () => {
  const [showProvideData, setShowProvideData] = useState(false);
  const user = useUser();

  const { data: codat } = useSWR(
    user?.user?.organisation_id &&
      `/api/integrations/codat-credentials?orgId=${user?.user?.organisation_id}`,
    fetcher
  );

  const isIntegrated = codat?.data?.auth_header ?? false;

  const toggleProvideData = () => {
    setShowProvideData(!showProvideData);
  };

  const t = useTranslations();

  return (
    <Layout title={t('single_company')} className="overflow-y-scroll">
      <div className={`text-primary pb-48`}>
        <div className="py-4">
          <p className="text-3xl font-semibold py-2">{t('single_company')}</p>
          <p className="max-w-2xl leading-loose">
            {t('access_our_powerful_credit_risk_assessment')}
          </p>
        </div>
        <SearchContainer disabled={showProvideData} />

        <div className="flex flex-col text-sm sm:mt-4 text-center sm:text-left">
          <p
            className={`${
              !showProvideData ? 'visible' : 'invisible'
            } font-semibold py-4`}
          >
            {t('cant_find_the_company_you_were_looking_for')}
          </p>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 px-8 sm:px-0">
            <Button
              variant="primary"
              className="rounded-none font-normal"
              onClick={toggleProvideData}
            >
              {!showProvideData
                ? t('provide_own_data')
                : t('search_for_company')}
            </Button>
            {isIntegrated && (
              <Link linkTo="/report/integrations">
                <Button
                  variant="highlight"
                  className="rounded-none font-normal"
                >
                  {t('integrated_data_source')}
                </Button>
              </Link>
            )}
          </div>
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
        ...require(`../messages/${locale}/general.${locale}.json`),
        ...require(`../messages/${locale}/errors.${locale}.json`),
        ...require(`../messages/${locale}/errors-default.${locale}.json`),
        ...require(`../messages/${locale}/toasts.${locale}.json`)
      }
    }
  };
}
