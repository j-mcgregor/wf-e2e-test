/* eslint-disable security/detect-non-literal-require */
import { GetServerSidePropsContext } from 'next';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';

import ReportTemplate from '../../../components/report-sections/Report';
import Report from '../../../lib/funcs/report';

import { ReportDataProps } from '.';
import { UNAUTHORISED } from '../../../lib/utils/error-codes';
import Cross from '../../../components/icons/Cross';

const PrintApi = ({
  authorised,
  report
}: {
  authorised: boolean;
  report: ReportDataProps;
}) => {
  const router = useRouter();
  const { id = [] } = router.query;

  const t = useTranslations();

  const NoAuth = () => (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <Cross className="h-12 w-12" />
      <p className="py-8 text-sm font-semibold text-primary">
        {t(UNAUTHORISED)}
      </p>
    </div>
  );

  return (
    (authorised && report && (
      <ReportTemplate data={report} id={id} forPrint={true} />
    )) || <NoAuth />
  );
};

export default PrintApi;

export const getServerSideProps = async ({
  locale,
  params,
  query
}: GetServerSidePropsContext) => {
  const id = params?.id;
  const userToken = query?.user_token;

  const { report, ok } = await Report.getExistingReport(
    `${id}`,
    `${userToken}`
  );

  return {
    props: {
      authorised: ok,
      report: report || null,
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
};
