import {
  ArrowLeftIcon,
  CheckIcon,
  ExclamationIcon,
  LightningBoltIcon,
  XIcon
} from '@heroicons/react/outline';
import { GetServerSidePropsContext, NextPage } from 'next';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useState } from 'react';
import useSWR from 'swr';

import LinkCard from '../../../components/cards/LinkCard';
import Button from '../../../components/elements/Button';
import RadioSelector from '../../../components/elements/RadioSelector';
import Select from '../../../components/elements/Select';
import Layout from '../../../components/layout/Layout';
import CodatCompanySearch from '../../../components/report-integration/CodatCompanySearch';
import IntegrationErrorMessages from '../../../components/report-integration/IntegrationErrorMessages';
import LoadingIcon from '../../../components/svgs/LoadingIcon';
import fetcher from '../../../lib/utils/fetcher';
import { convertToDateString } from '../../../lib/utils/text-helpers';
import { TranslateInput } from '../../../types/global';
import {
  CodatCompanyType,
  CodatIntegrationErrorType
} from '../../../types/report';

interface ReportIntegrationsPageProps {
  locale: string;
}

const ReportIntegrations: NextPage<ReportIntegrationsPageProps> = ({
  locale
}) => {
  const [stage, setStage] = useState(1);
  const [selectedCompany, setSelectedCompany] =
    useState<CodatCompanyType | null>(null);
  const [monthSample, setMonthSample] = useState<number>(3);
  const [yearPeriod, setYearPeriod] = useState<string | null>(null);
  const [monthPeriod, setMonthPeriod] = useState<string | null>(null);

  // const errorMessages: CodatIntegrationErrorType[] | null = ErrorMessages;

  const router = useRouter();

  const backLink = Array.isArray(router?.query?.from)
    ? router.query.from[0]
    : router?.query?.from;

  const { id } = router?.query;

  const t = useTranslations();

  const { data } = useSWR('/api/integrations/companies', fetcher);

  const { data: accountCategorisation } = useSWR(
    selectedCompany &&
      `/api/integrations/account-categorisation?companyId=${selectedCompany?.company_id}&connectionId=${selectedCompany?.connection_id}`,
    fetcher
  );

  const handleSubmit = async () => {
    const res = await fetch(
      `/api/integrations/codat?companyId=${selectedCompany?.company_id}&connectionId=${selectedCompany?.connection_id}&parentId=${id}&periodLength=${monthSample}`,
      {
        method: 'POST'
      }
    );
    console.log(res);
  };

  const categorisationErrorMessages: CodatIntegrationErrorType[] =
    accountCategorisation?.data?.uncategorised_accounts;

  const dataAvailable = (sampleFrequency = 5) => {
    if (selectedCompany) {
      const start = new Date(`${yearPeriod}-${monthPeriod}-1`);
      const end = new Date(selectedCompany?.last);
      let months = (end.getFullYear() - start.getFullYear()) * 12;
      months += end.getMonth() - start.getMonth();

      if (months + 1 < monthSample) {
        return (
          <>
            <ExclamationIcon className="text-red-500 h-6 w-6" />
            <p>{t('integration_timeframe_error')}</p>
          </>
        );
      } else if (monthSample * sampleFrequency - months - 1 > 0) {
        return (
          <>
            <ExclamationIcon className="text-highlight h-6 w-6" />
            <p>
              {t.rich('integration_timeframe_warning', {
                total_months: monthSample * sampleFrequency - months - 1
              })}
            </p>
          </>
        );
      } else {
        return (
          <>
            <CheckIcon className="text-highlight-2 h-6 w-6" />
            <p>
              {t.rich('integration_timeframe_success', {
                total_months: monthSample * sampleFrequency
              })}
            </p>
          </>
        );
      }
    }
  };

  const yearsAvailable = React.useMemo(() => {
    if (selectedCompany) {
      const start = new Date(selectedCompany?.first);
      const end = new Date(selectedCompany?.last);
      const numberOfyears = end.getFullYear() - start.getFullYear();
      const years = Array(numberOfyears + 1)
        .fill(0)
        .map((_, i) => ({ optionValue: `${start.getFullYear() + i}` }));
      return years;
    }
    return [];
  }, [selectedCompany]);

  const monthsAvailable = React.useMemo(() => {
    if (selectedCompany) {
      const first = new Date(selectedCompany?.first);
      const yearSelected = new Date(`${yearPeriod}-01`);
      const end = new Date(selectedCompany?.last);

      const isNotEqualToFirstYear =
        yearSelected.getFullYear() !== first.getFullYear();
      const isNotEqualToLastYear =
        yearSelected.getFullYear() !== end.getFullYear();

      const months = Array(12)
        .fill(0)
        .map((_, i) => ({
          optionValue: `${i + 1}`,
          optionName: Intl.DateTimeFormat(locale, { month: 'long' }).format(
            new Date(`${first.getFullYear()}-${i + 1}`)
          )
        }));

      if (isNotEqualToFirstYear && isNotEqualToLastYear) {
        return months;
      } else if (isNotEqualToFirstYear && !isNotEqualToLastYear) {
        return months.slice(0, end.getMonth() + 1);
      } else if (!isNotEqualToFirstYear && isNotEqualToLastYear) {
        return months.slice(first.getMonth());
      }

      return months as { optionValue: string; optionName?: TranslateInput }[];
    }
  }, [selectedCompany, yearPeriod]);

  React.useEffect(() => {
    if (selectedCompany && categorisationErrorMessages?.length === 0) {
      setStage(3);
    } else if (selectedCompany && categorisationErrorMessages?.length > 0) {
      setStage(2);
    }

    if (!monthPeriod && monthsAvailable) {
      setMonthPeriod(monthsAvailable[0].optionValue);
    }
  }, [selectedCompany, categorisationErrorMessages]);

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
        <h1 className="text-3xl font-semibold">{t('integration_stage_1')}</h1>
        <p>{t('integration_stage_1_description')}</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button
            type="button"
            onClick={() => setStage(2)}
            className={`${
              stage > 1 ? 'border-2 border-highlight-2 shadow-inner' : ''
            } text-left`}
          >
            <LinkCard
              header="Codat Integration"
              description={'Add your headers for your Codata integration.'}
              icon={<CheckIcon className="h-6 w-6" />}
              iconColor="bg-highlight-2 bg-opacity-20"
            />
          </button>
          <LinkCard
            header="Future Integration"
            description={'Add your headers for your Codata integration.'}
            icon={<LightningBoltIcon className="h-6 w-6" />}
            iconColor="bg-alt bg-opacity-20"
            disabled
          />
        </div>
        <div
          className={`flex flex-col gap-6 ${
            stage >= 2 ? 'opacity-100' : 'opacity-60'
          }`}
        >
          <h1 className="text-3xl font-semibold mt-12">
            {t('integration_stage_2')}
          </h1>
          <p>{t('integration_stage_2_description')}</p>
          <div className="bg-white w-full shadow p-6 flex flex-col gap-4">
            <h2 className="text-xl font-semibold">
              {t('itegration_search_title')}
            </h2>
            <CodatCompanySearch
              disabled={stage < 2}
              searchFunction={() => null}
              selectedResult={selectedCompany}
              setChosenResult={(option: CodatCompanyType) =>
                setSelectedCompany(option)
              }
              data={data?.data?.companies}
            />

            {/* Selected Company Button */}
            {selectedCompany && (
              <div className="text-sm">
                <div className="bg-bg w-full p-5 text-left flex gap-4 justify-between">
                  <div className="flex flex-col md:flex-row gap-4 grow justify-between">
                    <div className="flex flex-col justify-between">
                      <p className="font-bold">
                        {selectedCompany.company_name}
                      </p>
                      <p>{selectedCompany.company_id}</p>
                    </div>

                    <div className="gap-4 md:text-right">
                      <p className="font-semibold">Date availability</p>
                      <p>{`${convertToDateString(
                        selectedCompany.first
                      )} - ${convertToDateString(selectedCompany.last)}`}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedCompany(null)}>
                    <XIcon className="h-6 w-6" />
                  </button>
                </div>
                {!categorisationErrorMessages && (
                  <div className="flex items-center gap-4 mt-4">
                    <LoadingIcon className="h-4 w-4 text-highlight" />
                    <p>
                      {t.rich('itegration_validating_company', {
                        b: company_name => <b>{company_name}</b>,
                        company_name: selectedCompany.company_name
                      })}
                    </p>
                  </div>
                )}
                {categorisationErrorMessages?.length === 0 && (
                  <div className="flex items-center gap-2 mt-4">
                    <CheckIcon className="h-6 w-6 text-highlight-2" />
                    <p>
                      {t.rich('itegration_validated_company', {
                        b: company_name => <b>{company_name}</b>,
                        company_name: selectedCompany.company_name
                      })}
                    </p>
                  </div>
                )}
                {categorisationErrorMessages?.length > 0 && (
                  <IntegrationErrorMessages
                    companyName={selectedCompany.company_name}
                    errors={categorisationErrorMessages}
                  />
                )}
              </div>
            )}
          </div>
        </div>
        {/* Stage 3 */}
        <div
          className={`flex flex-col gap-6 ${
            stage >= 3 ? 'opacity-100' : 'opacity-60'
          }`}
        >
          <h1 className="text-3xl font-semibold mt-12">
            {t('integration_stage_3')}
          </h1>
          <p>{t('integration_stage_3_description')}</p>
          <div className="bg-white w-full shadow p-6 flex flex-col md:flex-row gap-4">
            <div className="flex flex-col gap-4 max-w-lg">
              <h2 className="text-xl font-semibold">
                {t('integration_sampling_frequency')}
              </h2>
              <p className="text-sm text-gray-500">
                {t('integration_sampling_frequency_description')}
              </p>
              <RadioSelector
                name="sampleFrequency"
                options={[
                  { label: '3_months', value: 3 },
                  { label: '6_months', value: 6 },
                  { label: '12_months', value: 12 }
                ]}
                disabled={stage < 3}
                setSelector={(e: string) => setMonthSample(parseInt(e))}
              />
              <h2 className="text-xl font-semibold mt-2">
                {t('integration_data_period')}
              </h2>
              <p className="text-sm text-gray-500">
                {t('integration_data_period_description')}
              </p>
              <div className="flex gap-2 max-w-xs">
                <Select
                  name={'year'}
                  options={yearsAvailable}
                  disabled={stage < 3}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setYearPeriod(e.target.value)
                  }
                />
                <Select
                  name={'month'}
                  options={monthsAvailable || []}
                  disabled={stage < 3}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setMonthPeriod(e.target.value)
                  }
                />
              </div>
            </div>
            <div className="md:ml-8 w-fit flex flex-col gap-2">
              <h2 className="text-xl font-semibold mt-2">
                {t('integration_information_title')}
              </h2>
              <div className="flex gap-2 text-sm items-center">
                {dataAvailable()}
              </div>
            </div>
          </div>
        </div>
        <Button
          variant="highlight"
          className="max-w-xs"
          onClick={() => handleSubmit()}
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
