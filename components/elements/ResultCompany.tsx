import React from 'react';
import { CompanyType } from '../../types/global';
import { XIcon } from '@heroicons/react/outline';

type ResultCompanyProps = {
  clearSelection?: () => void;
} & CompanyType;

const ResultCompany = ({
  name,
  registered_address,
  registration_date,
  company_id,
  clearSelection
}: ResultCompanyProps) => {
  return (
    <div
      className={`text-left bg-bg flex w-full px-6 py-3 justify-between relative ${
        clearSelection && 'pr-12'
      } items-center`}
    >
      <div>
        <p className="font-bold">{name}</p>
        <p>{company_id}</p>
      </div>

      <div className="text-right">
        <p>{registration_date}</p>

        <p>{registered_address}</p>
      </div>

      {clearSelection && (
        <button className="absolute right-4" onClick={clearSelection}>
          <XIcon className="w-5 h-5 ml-4 cursor-pointer hover:opacity-80" />
        </button>
      )}
    </div>
  );
};

export default ResultCompany;
