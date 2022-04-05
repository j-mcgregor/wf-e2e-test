/* eslint-disable security/detect-non-literal-require */
import { GetServerSidePropsContext } from 'next';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import Report from '../../../components/report-sections/Report';
import LoadingIcon from '../../../components/svgs/LoadingIcon';
import getServerSidePropsWithAuth from '../../../lib/auth/getServerSidePropsWithAuth';
import fetcher from '../../../lib/utils/fetcher';
import { ReportDataProps } from '../../../types/report';

const ReportTemplate = () => {
  const router = useRouter();
  const { id = [] } = router.query;

  const t = useTranslations();

  const [loaded, setLoaded] = useState(false);

  const { data } = useSWR<ReportDataProps>(
    `/api/reports/report?id=${id}`,
    fetcher
  );

  useEffect(() => {
    if (data && !data.error) {
      setTimeout(() => {
        setLoaded(true);
        // popup dialog to advise A4 printing
        // when confirmed/dismissed, printing dialog opens
        if (
          window.confirm(
            'For optimum printing of the report, please make sure you have selected A4 size.'
          )
        ) {
          window.print();
        }
      }, 3000);
    }
  }, [data]);

  const Loader = () => (
    <div className="fixed bg-white top-0 left-0 z-20 w-screen h-screen flex flex-col items-center justify-center">
      <LoadingIcon className="h-12 w-12" stroke="#E58A2E" />
      <p className="py-8 text-sm font-semibold text-primary">
        {t('loading_printable_report')} ...
      </p>
    </div>
  );

  return (
    <>
      {data && !data.error && <Report data={data} id={id} forPrint={true} />}
      {(!data || !loaded) && <Loader />}
    </>
  );
};

export default ReportTemplate;

export const getServerSideProps = getServerSidePropsWithAuth(
  ({ locale, res }: GetServerSidePropsContext) => {
    const maxAge = 60 * 60 * 24 * 7 * 4; // 28 days
    const oneMinute = 60; // 1 day

    // cache the printed pages for 1 minute
    // cache the stale versions for up to 4 weeks and revalidate them in the background
    res.setHeader(
      'Cache-Control',
      `public, s-maxage=${oneMinute}, stale-while-revalidate=${maxAge}`
    );

    return {
      props: {
        messages: {
          // You can get the messages from anywhere you like, but the recommended
          // pattern is to put them in JSON files separated by language and read
          // the desired one based on the `locale` received from Next.js.
          ...require(`../../../messages/${locale}/report.${locale}.json`),
          ...require(`../../../messages/${locale}/hints.${locale}.json`),
          ...require(`../../../messages/${locale}/general.${locale}.json`),
          ...require(`../../../messages/${locale}/errors.${locale}.json`)
        }
      }
    };
  }
);
