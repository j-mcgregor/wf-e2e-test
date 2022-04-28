import { OfficeBuildingIcon, UserIcon } from '@heroicons/react/outline';
import React from 'react';

import { useCreateReport } from '../../hooks/useCreateReport';
import { Company } from '../../types/report';
import LoadingIcon from '../svgs/LoadingIcon';
import { WFTwoToneLogo } from '../svgs/WFTwoToneLogo';

interface EntityCardProps extends Company {
  disabled: boolean;
  setDisabled: (value: boolean) => void;
}

const EntityCard = ({
  name,
  type,
  iso_code,
  company_id,
  disabled,
  setDisabled
}: EntityCardProps) => {
  const { createReport, loading } = useCreateReport({
    iso_code,
    company_id,
    disabled,
    setDisabled
  });

  const handleGenerateReport = async () => await createReport();

  const isEntityIndividual = type?.toLowerCase() !== 'corporate';

  return (
    <div
      className="bg-white flex rounded-sm shadow-sm text-sm
	avoid-break  print:shadow-none print:px-1 print:py-1 print:text-xs"
      data-testid="subsidiary-card-testid"
      role="listbox"
    >
      <div className="flex items-center space-x-2 px-3 w-full min-h-[65px]">
        <div className="min-w-6">
          {isEntityIndividual ? (
            <UserIcon className="h-6 w-6" />
          ) : (
            <OfficeBuildingIcon className="h-6 w-6" />
          )}
        </div>
        <p className="break-all">{name}</p>
      </div>
      {company_id && (
        <div
          className="min-w-32 flex items-center justify-center w-[65px] "
          title={`Generate a report on ${name}`}
        >
          {!loading ? (
            <WFTwoToneLogo onClick={handleGenerateReport} disabled={disabled} />
          ) : (
            <LoadingIcon />
          )}
        </div>
      )}
    </div>
  );
};

export default EntityCard;
