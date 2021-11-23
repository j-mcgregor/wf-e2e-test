/* eslint-disable security/detect-non-literal-require */
import { GetServerSidePropsContext } from 'next';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import Report from '../../../../components/report-sections/Report';
import getServerSidePropsWithAuth from '../../../../lib/auth/getServerSidePropsWithAuth';
import fetcher from '../../../../lib/utils/fetcher';

import { useEffect } from 'react';
import { ReportDataProps } from '../index';
import LoadingIcon from '../../../../components/svgs/LoadingIcon';

const ReportTemplate = () => {
  const router = useRouter();
  const { id = [] } = router.query;

  const t = useTranslations();

  const { data, error } = useSWR<ReportDataProps>(
    `/api/reports/report?id=${id}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      // window.print();
    }
  }, [data]);

  const Loader = () => (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <LoadingIcon className="h-12 w-12" stroke="#E58A2E" />
      <p className="py-8 text-sm font-semibold text-primary">
        {t('loading_printable_report')} ...
      </p>
    </div>
  );

  return (data && <Report data={data} id={id} forPrint={true} />) || <Loader />;
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
