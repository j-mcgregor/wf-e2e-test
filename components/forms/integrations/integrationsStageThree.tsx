import { CheckIcon, ExclamationIcon } from '@heroicons/react/outline';
import { useTranslations } from 'next-intl';
import React, { ChangeEvent } from 'react';
import { TranslateInput } from '../../../types/global';
import { CodatCompanyType } from '../../../types/report';
import RadioSelector from '../../elements/RadioSelector';
import Select from '../../elements/Select';

interface IIntegrationsStageThreeProps {
  selectedCompany: CodatCompanyType | null;
  yearPeriod: string | null;
  setYearPeriod: (value: string | null) => void;
  monthPeriod: string | null;
  setMonthPeriod: (value: string | null) => void;
  monthSample: number;
  setMonthSample: (value: number) => void;
  stage: number;
  locale: string;
  loading: boolean;
  enabledClassName: string;
  disabledClassName: string;
}

const IntegrationsStageThree: React.FC<IIntegrationsStageThreeProps> = ({
  selectedCompany,
  yearPeriod,
  setYearPeriod,
  monthPeriod,
  setMonthPeriod,
  monthSample,
  setMonthSample,
  stage,
  locale,
  loading,
  enabledClassName,
  disabledClassName
}) => {
  const t = useTranslations();
  const [yearsAvailable, setYearsAvailable] = React.useState<
    { optionValue: string; optionName?: string }[]
  >([]);
  const [monthsAvailable, setMonthsAvailable] = React.useState<
    { optionValue: string; optionName?: string }[]
  >([]);

  const dataAvailable = (sampleFrequency = 5) => {
    if (selectedCompany) {
      const start = new Date(selectedCompany?.first);
      const end = new Date(`${yearPeriod}-${monthPeriod}-1`);
      let months = (end.getFullYear() - start.getFullYear()) * 12;
      months += end.getMonth() - start.getMonth() + 1;

      if (months < monthSample) {
        return (
          <>
            <ExclamationIcon className="text-red-500 h-6 w-6 min-h-[24px] min-w-[24px] mt-2" />
            <p>{t('integration_timeframe_error')}</p>
          </>
        );
      } else if (monthSample * sampleFrequency - months > 0) {
        return (
          <>
            <ExclamationIcon className="text-highlight h-6 w-6 min-h-[24px] min-w-[24px] mt-2" />
            <p>
              {t.rich('integration_timeframe_warning', {
                total_periods: Math.ceil(sampleFrequency - months / monthSample)
              })}
            </p>
          </>
        );
      } else {
        return (
          <>
            <CheckIcon className="text-highlight-2 h-6 w-6 min-h-[24px] min-w-[24px] mt-2" />
            <p>
              {t.rich('integration_timeframe_success', {
                br: total_periods => (
                  <>
                    <br />
                    {total_periods}
                  </>
                ),
                total_periods: sampleFrequency
              })}
            </p>
          </>
        );
      }
    }
  };

  React.useEffect(() => {
    if (selectedCompany) {
      const start = new Date(selectedCompany?.first);
      const end = new Date(selectedCompany?.last);
      const numberOfyears = end.getFullYear() - start.getFullYear();
      // if (yearPeriod === null) setYearPeriod(end.getFullYear().toString());
      return setYearsAvailable(
        Array(numberOfyears + 1)
          .fill(0)
          .map((_, i) => ({ optionValue: `${start.getFullYear() + i}` }))
      );
    }
    setYearsAvailable([]);
  }, [selectedCompany]);

  React.useEffect(() => {
    if (selectedCompany) {
      const first = new Date(selectedCompany?.first);
      const yearSelected = new Date(`${yearPeriod}-01`);
      const end = new Date(selectedCompany?.last);
      // if (monthPeriod === null) setMonthPeriod((end.getMonth() + 1).toString());

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
        return setMonthsAvailable(months);
      } else if (isNotEqualToFirstYear && !isNotEqualToLastYear) {
        return setMonthsAvailable(months.slice(0, end.getMonth() + 1));
      } else if (!isNotEqualToFirstYear && isNotEqualToLastYear) {
        return setMonthsAvailable(months.slice(first.getMonth()));
      }

      return setMonthsAvailable(months);
    }
    setMonthsAvailable([]);
  }, [selectedCompany, yearPeriod]);

  return (
    <div
      className={`flex flex-col gap-6 ${
        stage >= 3 && !loading ? enabledClassName : disabledClassName
      }`}
    >
      <h1 className="text-3xl font-semibold mt-12">
        {t('integration_stage_3')}
      </h1>
      <p>{t('integration_stage_3_description')}</p>
      <div className="bg-white w-full shadow p-6 flex flex-col md:flex-row gap-4">
        <div className="flex flex-col gap-4 max-w-lg w-full grow">
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
            disabled={stage < 3 || loading}
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
              disabled={stage < 3 && !loading}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setYearPeriod(e.target.value)
              }
              value={yearPeriod ?? ''}
            />
            <Select
              name={'month'}
              options={monthsAvailable}
              disabled={stage < 3 && !loading}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setMonthPeriod(e.target.value)
              }
              value={monthPeriod ?? ''}
            />
          </div>
        </div>
        <div className="md:ml-8 flex flex-col gap-2 max-w-xs">
          <h2 className="text-xl font-semibold mt-2">
            {t('integration_information_title')}
          </h2>
          <div className="flex gap-2 text-sm items-start">
            {dataAvailable()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsStageThree;
