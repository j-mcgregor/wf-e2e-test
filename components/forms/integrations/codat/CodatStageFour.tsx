import { ExclamationCircleIcon, XIcon } from '@heroicons/react/outline';
import { useTranslations } from 'next-intl';
import React from 'react';
import useOutsideClick from '../../../../hooks/useOutsideClick';
import { VALID_WEBSITE } from '../../../../lib/utils/regexes';
import ErrorMessage from '../../../elements/ErrorMessage';
import Input from '../../../elements/Input';
import Select from '../../../elements/Select';

interface CodatStageFourProps {
  stage: number;
  loading: boolean;
  enabledClassName: string;
  disabledClassName: string;
  sectorCode: string;
  setSectorCode: (sectorCode: string) => void;
  website: string;
  setWebsite: (website: string) => void;
  numOfDirectors: string;
  setNumOfDirectors: (numOfDirectors: string) => void;
  numOfSubsidiaries: string;
  setNumOfSubsidiaries: (numOfSubsidiaries: string) => void;
}

const CodatStageFour = ({
  stage,
  loading,
  enabledClassName,
  disabledClassName,
  sectorCode,
  setSectorCode,
  website,
  setWebsite,
  numOfDirectors,
  setNumOfDirectors,
  numOfSubsidiaries,
  setNumOfSubsidiaries
}: CodatStageFourProps) => {
  const [isWebsiteValid, setIsWebsiteValid] = React.useState(true);
  const wedsiteRef = React.useRef<HTMLInputElement>(null);

  // Using outside click so the regex only gets check when the input is unfocused focused
  useOutsideClick(wedsiteRef, () => {
    const isRegexValid = VALID_WEBSITE.test(website);
    if (website !== '' && !isRegexValid) {
      setIsWebsiteValid(false);
    } else {
      setIsWebsiteValid(true);
    }
  });

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
          <div className="flex flex-col gap-2 max-w-xs">
            <Select
              name={'industrySectorCode'}
              options={industrySectorCodes}
              disabled={stage < 3 && !loading}
              value={sectorCode}
              onChange={(e: any) => setSectorCode(e.target.value)}
            />
          </div>
          {sectorCode === '0' && (
            <div className="flex gap-2 items-center">
              <ExclamationCircleIcon className="text-highlight h-5 w-5" />
              <p className="text-sm">{t('no_sector_code_warning')}</p>
            </div>
          )}
          <h2 className="text-xl font-semibold mt-2">{t('website')}</h2>
          <p className="text-sm text-gray-500">{t('website_description')}</p>
          <div className="flex gap-2 max-w-sm">
            <Input
              type="text"
              name="website"
              ref={wedsiteRef}
              disabled={stage < 3 && !loading}
              value={website}
              onChange={e => setWebsite(e.target.value)}
            />
          </div>
          {!isWebsiteValid && (
            <div className="flex gap-2 items-center">
              <XIcon className="text-red-500 h-5 w-5" />
              <p className="text-sm">{t('invalid_website_error')}</p>
            </div>
          )}
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
              value={numOfDirectors}
              onChange={e => {
                setNumOfDirectors(e.target.value);
              }}
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
              value={numOfSubsidiaries}
              onChange={e => {
                setNumOfSubsidiaries(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodatStageFour;
