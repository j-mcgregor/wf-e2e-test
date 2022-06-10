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
    { optionValue: 10, optionName: t('Agriculture, Horticulture & Livestock') },
    { optionValue: 11, optionName: t('Mining & Extraction') },
    { optionValue: 12, optionName: t('Utilities') },
    { optionValue: 13, optionName: t('Construction') },
    { optionValue: 14, optionName: t('Food & Tobacco Manufacturing') },
    { optionValue: 15, optionName: t('Textiles & Clothing Manufacturing') },
    { optionValue: 16, optionName: t('Wood, Furniture & Paper Manufacturing') },
    { optionValue: 17, optionName: t('Printing & Publishing') },
    {
      optionValue: 18,
      optionName: t('Chemicals, Petroleum, Rubber & Plastic')
    },
    { optionValue: 19, optionName: t('Leather, Stone, Clay & Glass products') },
    { optionValue: 20, optionName: t('Metals & Metal Products') },
    {
      optionValue: 21,
      optionName: t('Industrial, Electric & Electronic Machinery')
    },
    { optionValue: 22, optionName: t('Computer Hardware') },
    { optionValue: 23, optionName: t('Communications') },
    { optionValue: 24, optionName: t('Transport Manufacturing') },
    { optionValue: 25, optionName: t('Miscellaneous Manufacturing') },
    { optionValue: 26, optionName: t('Wholesale') },
    { optionValue: 27, optionName: t('Retail') },
    { optionValue: 28, optionName: t('Transport, Freight & Storage') },
    { optionValue: 29, optionName: t('Travel, Personal & Leisure') },
    { optionValue: 30, optionName: t('Computer Software') },
    { optionValue: 31, optionName: t('Media & Broadcasting') },
    {
      optionValue: 32,
      optionName: t('Banking, Insurance & Financial Services')
    },
    { optionValue: 33, optionName: t('Property Services') },
    { optionValue: 34, optionName: t('Business Services') },
    { optionValue: 35, optionName: t('Biotechnology and Life Sciences') },
    { optionValue: 36, optionName: t('Information Services') },
    {
      optionValue: 37,
      optionName: t('Public Administration, Education, Health Social Services')
    },
    { optionValue: 38, optionName: t('Waste Management & Treatment') }
  ];

  return (
    <div
      className={`flex flex-col gap-6 ${
        stage >= 4 && !loading ? enabledClassName : disabledClassName
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
              disabled={stage < 4 && !loading}
            />
          </div>
          <h2 className="text-xl font-semibold mt-2">{t('website')}</h2>
          <p className="text-sm text-gray-500">{t('website_description')}</p>
          <div className="flex gap-2 max-w-sm">
            <Input type="text" name="website" />
          </div>
        </div>
        <div className="md:ml-8 flex flex-col gap-4 max-w-sm">
          <h2 className="text-xl font-semibold">{t('number_of_directors')}</h2>
          <p className="text-sm text-gray-500">
            {t('number_of_directors_description')}
          </p>
          <div className="flex gap-2 max-w-[150px]">
            <Input type="number" name="directors" min={0} />
          </div>
          <h2 className="text-xl font-semibold mt-5">
            {t('number_of_subsidiaries')}
          </h2>
          <p className="text-sm text-gray-500">
            {t('number_of_subsidiaries_description')}
          </p>
          <div className="flex gap-2 max-w-[150px]">
            <Input type="number" name="subsidiaries" min={0} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodatStageFour;
