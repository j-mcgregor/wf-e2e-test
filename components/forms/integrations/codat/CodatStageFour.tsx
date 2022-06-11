import { useTranslations } from 'next-intl';
import React from 'react';
import Input from '../../../elements/Input';
import Select from '../../../elements/Select';

interface CodatStageFourProps {
  stage: number;
  loading: boolean;
  enabledClassName: string;
  disabledClassName: string;
}

const CodatStageFour = ({
  stage,
  loading,
  enabledClassName,
  disabledClassName
}: CodatStageFourProps) => {
  const t = useTranslations();

  const industrySectorCodes = [
    { optionValue: '0', optionName: 'None' },
    ...Array(29)
      .fill(0)
      .map((_, i) => ({
        optionValue: (i + 10).toString(),
        optionName: t(`industry_sector_codes.${i + 10}`)
      }))
  ];

  return (
    <div
      className={`flex flex-col gap-6 ${
        stage >= 3 && !loading ? enabledClassName : disabledClassName
      }`}
    >
      <h1 className="text-3xl font-semibold mt-12">
        {t('integration_stage_4')}
      </h1>
      <p>{t('integration_stage_4_description')}</p>
      <div className="bg-white w-full shadow p-6 flex flex-col md:flex-row gap-4">
        <div className="flex flex-col gap-4 max-w-lg w-full">
          <h2 className="text-xl font-semibold">{t('industry_sector_code')}</h2>
          <p className="text-sm text-gray-500">
            {t('industry_sector_code_description')}
          </p>
          <div className="flex gap-2 max-w-xs">
            <Select
              name={'industrySectorCode'}
              options={industrySectorCodes}
              disabled={stage < 3 && !loading}
            />
          </div>
          <h2 className="text-xl font-semibold mt-2">{t('website')}</h2>
          <p className="text-sm text-gray-500">{t('website_description')}</p>
          <div className="flex gap-2 max-w-sm">
            <Input
              type="text"
              name="website"
              disabled={stage < 3 && !loading}
            />
          </div>
        </div>
        <div className="md:ml-8 flex flex-col gap-4 max-w-sm">
          <h2 className="text-xl font-semibold">{t('number_of_directors')}</h2>
          <p className="text-sm text-gray-500">
            {t('number_of_directors_description')}
          </p>
          <div className="flex gap-2 max-w-[150px]">
            <Input
              type="number"
              name="directors"
              min={0}
              disabled={stage < 3 && !loading}
            />
          </div>
          <h2 className="text-xl font-semibold mt-5">
            {t('number_of_subsidiaries')}
          </h2>
          <p className="text-sm text-gray-500">
            {t('number_of_subsidiaries_description')}
          </p>
          <div className="flex gap-2 max-w-[150px]">
            <Input
              type="number"
              name="subsidiaries"
              min={0}
              disabled={stage < 3 && !loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodatStageFour;
