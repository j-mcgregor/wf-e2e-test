import { ArrowLeftIcon } from '@heroicons/react/outline';
import { GetStaticPropsContext, NextPage } from 'next';
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
import { useToast } from '../../hooks/useToast';
import fetcher from '../../lib/utils/fetcher';
import { fetchMockData } from '../../lib/mock-data/helpers';

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
  const { triggerToast, getToastTextFromResponse } = useToast();

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

    // If there is a parentId, we need to include it in the request
    // If no ID we need to include the details from stage 4
    const hasParentIdBody = parentId
      ? { parentId }
      : {
          website,
          industrySectorCode: sectorCode !== '0' ? sectorCode : null,
          numberOfDirectors: numOfDirectors !== '-' ? numOfDirectors : null,
          numberOfSubsidiaries:
            numOfSubsidiaries !== '-' ? numOfSubsidiaries : null
        };

    // Default parameters required are companyId, connectionId, periodLength and startMonth
    const body = {
      companyId: selectedCompany?.company_id,
      connectionId: selectedCompany?.connection_id,
      periodLength: monthSample,
      startMonth: `${yearPeriod}-${
        monthPeriod?.length === 1 ? '0' + monthPeriod : monthPeriod
      }`,
      ...hasParentIdBody
    };

    const res = await fetcher(
      `/api/integrations/codat/codat`,
      'POST',
      { body },
      {
        'Content-Type': 'application/json'
      }
    );

    // USE FOR TESTING TOASTS
    // const res = await fetchMockData(
    //   400,
    //   'INTEGRATIONS_CODAT',
    //   'INTEGRATIONS_CODAT_401'
    // )();

    if (res.ok) {
      triggerToast({
        toastId: res.code,
        status: res.status,
        title: t(`${res.sourceType}.${res.code}.title`),
        description: t(`${res.sourceType}.${res.code}.description`),
        dismiss: 'corner',
        actions: [
          {
            label: 'Go to integration',
            action: () =>
              router.push(`/report/${res?.data.id}?from=/report/integrations/`)
          }
        ]
      });

      router.push(`/report/${res?.data.id}?from=/report/integrations/`);
    } else {
      setLoading(false);
      setError(res.code);

      const toastText = getToastTextFromResponse(res);

      toastText &&
        triggerToast({
          toastId: res.code,
          status: res.status,
          title: toastText?.title,
          description: toastText?.description
        });
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
        ...require(`../../messages/${locale}/general.${locale}.json`),
        ...require(`../../messages/${locale}/errors.${locale}.json`),
        ...require(`../../messages/${locale}/errors-default.${locale}.json`),
        ...require(`../../messages/${locale}/toasts.${locale}.json`)
      }
    }
  };
};
