import { XIcon } from '@heroicons/react/outline';
import { useTranslations } from 'next-intl';
import React from 'react';
import { CodatIntegrationErrorType } from '../../types/report';

interface IIntegrationErrorMessagesProps {
  companyName: string;
  errors: CodatIntegrationErrorType[];
}

const IntegrationErrorMessages = ({
  companyName,
  errors
}: IIntegrationErrorMessagesProps) => {
  const t = useTranslations();
  return (
    <>
      <div className="flex items-center gap-2 mt-4">
        <XIcon className="h-6 w-6 text-red-500" />
        <p>
          {t.rich('integration_not_valid_company', {
            b: company_name => <b>{company_name}</b>,
            company_name: companyName
          })}
        </p>
      </div>
      <div className="flex flex-col gap-2 mt-4 bg-bg px-8 py-5">
        <h3 className="text-xl font-semibold mb-2">Accounts to categorise </h3>
        <div className="flex flex-col gap-2 max-h-96 overflow-y-scroll">
          {errors.map(({ id, name }: CodatIntegrationErrorType) => {
            return (
              <div key={id} className="flex items-center gap-2 p-2 bg-white">
                <XIcon className="min-w-[24px] min-h-[24px] h-6 w-6 text-red-500" />
                <p>{name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default IntegrationErrorMessages;
