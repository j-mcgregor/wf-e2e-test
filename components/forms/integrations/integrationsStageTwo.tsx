import { CheckIcon, XIcon } from '@heroicons/react/outline';
import { data } from 'msw/lib/types/context';
import { useTranslations } from 'next-intl';
import React from 'react';
import useSWR from 'swr';

import fetcher from '../../../lib/utils/fetcher';
import { convertToDateString } from '../../../lib/utils/text-helpers';
import {
  CodatCompanyType,
  CodatIntegrationErrorType
} from '../../../types/report';
import CodatCompanySearch from '../../report-integration/CodatCompanySearch';
import IntegrationErrorMessages from '../../report-integration/IntegrationErrorMessages';
import LoadingIcon from '../../svgs/LoadingIcon';

interface IIntegrationsStageTwoProps {
  selectedCompany: CodatCompanyType | null;
  setSelectedCompany: (option: CodatCompanyType | null) => void;
  stage: number;
  setStage: (stage: number) => void;
  loading: boolean;
  enabledClassName: string;
  disabledClassName: string;
}

const IntegrationsStageTwo: React.FC<IIntegrationsStageTwoProps> = ({
  selectedCompany,
  setSelectedCompany,
  stage,
  setStage,
  loading,
  enabledClassName,
  disabledClassName
}) => {
  const t = useTranslations();

  const { data } = useSWR('/api/integrations/companies', fetcher);

  const { data: accountCategorisation } = useSWR(
    selectedCompany &&
      `/api/integrations/account-categorisation?companyId=${selectedCompany?.company_id}&connectionId=${selectedCompany?.connection_id}`,
    fetcher
  );

  const categorisationErrorMessages: CodatIntegrationErrorType[] =
    accountCategorisation?.data?.uncategorised_accounts;

  React.useEffect(() => {
    if (selectedCompany && categorisationErrorMessages?.length === 0) {
      setStage(3);
    } else if (selectedCompany && categorisationErrorMessages?.length > 0) {
      setStage(2);
    }
  }, [selectedCompany, categorisationErrorMessages]);

  return (
    <div
      className={`flex flex-col gap-6 ${
        stage >= 2 && !loading ? enabledClassName : disabledClassName
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
          disabled={stage < 2 || loading}
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
                  <p className="font-bold">{selectedCompany.company_name}</p>
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
  );
};

export default IntegrationsStageTwo;
