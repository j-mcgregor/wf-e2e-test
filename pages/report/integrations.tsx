import { ArrowLeftIcon } from '@heroicons/react/outline';
import {
  GetServerSidePropsContext,
  GetStaticPathsContext,
  GetStaticPropsContext,
  NextPage
} from 'next';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import Button from '../../components/elements/Button';
import CodatStageFour from '../../components/forms/integrations/codat/CodatStageFour';
import CodatStageOne from '../../components/forms/integrations/codat/CodatStageOne';
import CodatStageThree from '../../components/forms/integrations/codat/CodatStageThree';
import CodatStageTwo from '../../components/forms/integrations/codat/CodatStageTwo';
import Layout from '../../components/layout/Layout';
import SkeletonLayout from '../../components/skeletons/SkeletonLayout';
import { CodatCompanyType } from '../../types/report';

interface ReportIntegrationsPageProps {
  locale: string;
}

const ReportIntegrations: NextPage<ReportIntegrationsPageProps> = ({
  locale
}) => {
  const [stage, setStage] = useState(2);
  const [selectedCompany, setSelectedCompany] =
    useState<CodatCompanyType | null>(null);
  const [monthSample, setMonthSample] = useState<number>(3);
  const [yearPeriod, setYearPeriod] = useState<string | null>(null);
  const [monthPeriod, setMonthPeriod] = useState<string | null>(null);
  const [sectorCode, setSectorCode] = useState<string>('0');
  const [website, setWebsite] = useState<string>('');
  const [numOfDirectors, setNumOfDirectors] = useState<string>('-');
  const [numOfSubsidiaries, setNumOfSubsidiaries] = useState<string>('-');

  const [canGenerateReport, setCanGenerateReport] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const t = useTranslations();

  React.useEffect(() => {
    if (yearPeriod === null && monthPeriod === null && selectedCompany) {
      const end = new Date(selectedCompany?.last);
      setYearPeriod(end.getFullYear().toString());
      setMonthPeriod((end.getMonth() + 1).toString());
    }
  }, [selectedCompany]);

  React.useEffect(() => {
    if (selectedCompany) {
      const start = new Date(selectedCompany?.first);
      const end = new Date(`${yearPeriod}-${monthPeriod}-1`);
      let months = (end.getFullYear() - start.getFullYear()) * 12;
      months += end.getMonth() - start.getMonth() + 1;

      if (months < monthSample) {
        setCanGenerateReport(false);
      } else {
        setCanGenerateReport(true);
      }
    }
  }, [selectedCompany, yearPeriod, monthPeriod]);

  React.useEffect(() => {
    if (stage <= 2) {
      setCanGenerateReport(false);
      setSectorCode('0');
      setWebsite('');
      setNumOfDirectors('-');
      setNumOfSubsidiaries('-');
    }
  }, [stage]);

  const router = useRouter();

  const backLink = Array.isArray(router?.query?.from)
    ? router.query.from[0]
    : router?.query?.from;

  const { parentId } = router?.query;

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    const sectorCodeValue = sectorCode !== '0' ? sectorCode : null;
    const websiteValue = website.length > 1 ? website : null;
    const numOfDirectorsValue = numOfDirectors !== '-' ? numOfDirectors : null;
    const numOfSubsidiariesValue =
      numOfSubsidiaries !== '-' ? numOfSubsidiaries : null;

    const hasParentIdParams = parentId
      ? `&parentId=${parentId}`
      : `&industrySectorCode=${sectorCodeValue}&website=${websiteValue}&numberOfDirectors=${numOfDirectorsValue}&numberOfSubsidiaries=${numOfSubsidiariesValue}`;

    const res = await fetch(
      `/api/integrations/codat/codat?companyId=${
        selectedCompany?.company_id
      }&connectionId=${
        selectedCompany?.connection_id
      }&periodLength=${monthSample}&startMonth=${yearPeriod}-${
        monthPeriod?.length === 1 ? '0' + monthPeriod : monthPeriod
      }${hasParentIdParams}`,
      {
        method: 'POST'
      }
    );

    if (res.ok) {
      const { data } = await res.json();
      router.push(`/report/${data.id}?from=/report/integrations/`);
    } else {
      setLoading(false);
      const json = await res.json();
      setError(json.code);
    }
  };

  const disabledClassName = 'opacity-20';
  const enabledClassName = 'opacity-100';

  // handle language error messages during fallback
  if (router.isFallback) {
    return <SkeletonLayout />;
  }

  return (
    <Layout title="Report Integrations">
      <div className="flex flex-col gap-6 pb-24">
        <Button
          linkTo={!backLink ? '/reports' : backLink}
          variant="highlight"
          newClassName=" bg-bg hover:text-alt relative h-[50px] top-0 flex items-center justify-start"
        >
          <ArrowLeftIcon className="h-full w-6" />
          <p className="ml-2">Back to report</p>
        </Button>
        <CodatStageOne
          loading={loading}
          disabledClassName={disabledClassName}
          enabledClassName={enabledClassName}
          stage={stage}
          setStage={setStage}
        />

        <CodatStageTwo
          selectedCompany={selectedCompany}
          setSelectedCompany={setSelectedCompany}
          stage={stage}
          setStage={setStage}
          loading={loading}
          enabledClassName={enabledClassName}
          disabledClassName={disabledClassName}
        />

        <CodatStageThree
          selectedCompany={selectedCompany}
          stage={stage}
          loading={loading}
          enabledClassName={enabledClassName}
          disabledClassName={disabledClassName}
          yearPeriod={yearPeriod}
          setYearPeriod={setYearPeriod}
          monthPeriod={monthPeriod}
          setMonthPeriod={setMonthPeriod}
          monthSample={monthSample}
          setMonthSample={setMonthSample}
          locale={locale}
        />

        {!parentId && (
          <CodatStageFour
            stage={stage}
            loading={loading}
            enabledClassName={enabledClassName}
            disabledClassName={disabledClassName}
            numOfDirectors={numOfDirectors}
            setNumOfDirectors={setNumOfDirectors}
            numOfSubsidiaries={numOfSubsidiaries}
            setNumOfSubsidiaries={setNumOfSubsidiaries}
            sectorCode={sectorCode}
            setSectorCode={setSectorCode}
            website={website}
            setWebsite={setWebsite}
          />
        )}

        <div className="flex items-center gap-4">
          <div className="max-w-xs grow">
            <Button
              variant="highlight"
              className="max-w-xs"
              onClick={() => handleSubmit()}
              disabled={!canGenerateReport}
              loading={loading}
            >
              Generate New Report
            </Button>
          </div>
          {error && <p className="text-red-500">{t(error)}</p>}
        </div>
      </div>
    </Layout>
  );
};

export default ReportIntegrations;

export const getStaticProps = ({ locale }: GetStaticPropsContext) => {
  return {
    props: {
      locale,
      messages: {
        // You can get the messages from anywhere you like, but the recommended
        // pattern is to put them in JSON files separated by language and read
        // the desired one based on the `locale` received from Next.js.
        ...require(`../../messages/${locale}/sme-calculator.${locale}.json`),
        ...require(`../../messages/${locale}/integrations.${locale}.json`),
        ...require(`../../messages/${locale}/general.${locale}.json`)
      }
    }
  };
};
