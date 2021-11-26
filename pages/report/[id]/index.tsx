/* eslint-disable security/detect-non-literal-require */
import { GetServerSidePropsContext } from 'next';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { RatingType } from '../../../components/report-sections/risk-metrics/BondRating';

import Layout from '../../../components/layout/Layout';
import ReportNav from '../../../components/layout/ReportNav';
import SecondaryLayout from '../../../components/layout/SecondaryLayout';
import TabletReportNav from '../../../components/layout/TabletReportNav';
import Report from '../../../components/report-sections/Report';
import SkeletonReport from '../../../components/skeletons/SkeletonReport';
import getServerSidePropsWithAuth from '../../../lib/auth/getServerSidePropsWithAuth';
import fetcher from '../../../lib/utils/fetcher';
import ErrorSkeleton from '../../../components/skeletons/ErrorSkeleton';
import {
  DataReliabilityType,
  FinancialYear,
  LegalEvent,
  Profile,
  Reliability,
  ShareholderType,
  SummaryContact,
  SummaryInfo
} from '../../../types/report';

export interface ReportDataProps {
  id: string | number;
  company_id: string;
  created_at?: string;
  company_name: string;
  details: SummaryContact & SummaryInfo;
  financials: FinancialYear[];
  risk_metrics: {
    bond_rating_equivalent: RatingType;
    sme_z_score: number;
    // value: string;
    // regional_benchmark: string | null;
    // industry_benchmark: string | null;
    // };
    probability_of_default_1_year: number;
    // value: string;
    // regional_benchmark: string | null;
    // industry_benchmark: string | null;
    // };
    loss_given_default: number;
    // value: string;
    // regional_benchmark: string | null;
    // industry_benchmark: string | null;
    // };
  }[];
  reliability_index: DataReliabilityType;
  highlights: {
    data_reliability: Reliability;
    risk_outlook: string[];
  };
  legal_events: LegalEvent[];
  shareholders: ShareholderType[];
  personal: {
    directors: Profile[];
    senior_management: Profile[];
    ceo: string;
    cfo: string;
    chairman: string;
  };
  error?: string;
  message?: string;
}

const ReportTemplate = ({ isTesting = false }: { isTesting?: boolean }) => {
  const t = useTranslations();
  const router = useRouter();
  const { id = [] } = router.query;

  const { data, error } = useSWR<ReportDataProps>(
    `/api/reports/report?id=${id}`,
    fetcher
  );

  const companyName = data?.details?.company_name || data?.details?.name;

  // console.log(data)
  return (
    <Layout
      title={`${
        companyName || (data?.error ? t(data.error) : false) || 'Loading'
      } | ${t('report')}`}
      fullWidth
    >
      <SecondaryLayout
        navigation={
          companyName && (
            <>
              <ReportNav
                isTesting={isTesting}
                companyName={companyName}
                loading={!data}
              />
              <TabletReportNav
                isTesting={isTesting}
                companyName={companyName}
                loading={!data}
              />
            </>
          )
        }
      >
        {!data ? (
          <SkeletonReport />
        ) : error || data.error ? (
          <ErrorSkeleton
            header={data.error ? t(data?.error) : ''}
            message={data?.message}
          />
        ) : (
          <Report data={data} id={id} />
        )}
      </SecondaryLayout>
    </Layout>
  );
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
          ...require(`../../../messages/${locale}/report.${locale}.json`),
          ...require(`../../../messages/${locale}/hints.${locale}.json`),
          ...require(`../../../messages/${locale}/general.${locale}.json`),
          ...require(`../../../messages/${locale}/errors.${locale}.json`)
        }
      }
    };
  }
);