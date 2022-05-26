import { ArrowLeftIcon } from '@heroicons/react/outline';
import { GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import Button from '../../../components/elements/Button';
import IntegrationsStageThree from '../../../components/forms/integrations/integrationsStageThree';
import IntegrationsStageTwo from '../../../components/forms/integrations/integrationsStageTwo';
import IntegrationsStageOne from '../../../components/forms/integrations/integrationStageOne';
import Layout from '../../../components/layout/Layout';
import { CodatCompanyType } from '../../../types/report';

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
  const [canGenerateReport, setCanGenerateReport] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const router = useRouter();

  const backLink = Array.isArray(router?.query?.from)
    ? router.query.from[0]
    : router?.query?.from;

  const { id } = router?.query;

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch(
      `/api/integrations/codat/codat?companyId=${
        selectedCompany?.company_id
      }&connectionId=${
        selectedCompany?.connection_id
      }&parentId=${id}&periodLength=${monthSample}&startMonth=${yearPeriod}-${
        monthPeriod?.length === 1 ? '0' + monthPeriod : monthPeriod
      }`,
      {
        method: 'POST'
      }
    );

    if (res.ok) {
      const { data } = await res.json();
      setLoading(false);
      router.push(`/report/${data.id}?from=/report/${id}/integrations/`);
    }

    setLoading(false);
  };

  const disabledClassName = 'opacity-60';
  const enabledClassName = 'opacity-100';

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
        <IntegrationsStageOne
          loading={loading}
          disabledClassName={disabledClassName}
          enabledClassName={enabledClassName}
          stage={stage}
          setStage={setStage}
        />

        <IntegrationsStageTwo
          selectedCompany={selectedCompany}
          setSelectedCompany={setSelectedCompany}
          stage={stage}
          setStage={setStage}
          loading={loading}
          enabledClassName={enabledClassName}
          disabledClassName={disabledClassName}
        />

        <IntegrationsStageThree
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
    </Layout>
  );
};

export default ReportIntegrations;

export const getServerSideProps = ({ locale }: GetServerSidePropsContext) => {
  return {
    props: {
      locale,
      messages: {
        // You can get the messages from anywhere you like, but the recommended
        // pattern is to put them in JSON files separated by language and read
        // the desired one based on the `locale` received from Next.js.
        ...require(`../../../messages/${locale}/sme-calculator.${locale}.json`),
        ...require(`../../../messages/${locale}/integrations.${locale}.json`),
        ...require(`../../../messages/${locale}/general.${locale}.json`)
      }
    }
  };
};
