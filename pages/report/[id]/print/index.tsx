/* eslint-disable security/detect-non-literal-require */
import { GetServerSidePropsContext } from 'next';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import Report from '../../../../components/report-sections/Report';
import getServerSidePropsWithAuth from '../../../../lib/auth/getServerSidePropsWithAuth';
import fetcher from '../../../../lib/utils/fetcher';

import { useEffect } from 'react';
import { ReportDataProps } from '..';

const ReportTemplate = () => {
  const router = useRouter();
  const { id = [] } = router.query;

  const { data, error } = useSWR<ReportDataProps>(
    `/api/reports/report?id=${id}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      // window.print();
    }
  }, [data]);

  return (data && <Report data={data} id={id} forPrint={true} />) || 'Loading';
};

export default ReportTemplate;

export const getServerSideProps = getServerSidePropsWithAuth(
  ({ locale }: GetServerSidePropsContext) => {
    return {
      props: {
        messages: {
          // You can get the messages from anywhere you like, but the recommended
          // pattern is to put them in JSON files separated by language and read
          // the desired one based on the `locale` received from Next.js.
          ...require(`../../../../messages/${locale}/report.${locale}.json`),
          ...require(`../../../../messages/${locale}/hints.${locale}.json`),
          ...require(`../../../../messages/${locale}/general.${locale}.json`),
          ...require(`../../../../messages/${locale}/errors.${locale}.json`)
        }
      }
    };
  }
);
