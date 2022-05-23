import { OfficeBuildingIcon, UserIcon } from '@heroicons/react/outline';
import React from 'react';
import { useTranslations } from 'next-intl';

import { useCreateReport } from '../../hooks/useCreateReport';
import { Company } from '../../types/report';
import LoadingIcon from '../svgs/LoadingIcon';
import { WFTwoToneLogo } from '../svgs/WFTwoToneLogo';
import { CircleX } from '../svgs/CircleX';

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
  const t = useTranslations();

  const { createReport, loading, isError, isValidIso } = useCreateReport({
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
      {isValidIso && company_id && (
        <div
          className=" flex items-end w-10 justify-end  "
          title={
            isError
              ? t('generate_report_fail', { name })
              : t('generate_report', { name })
          }
        >
          {!loading ? (
            !isError ? (
              <WFTwoToneLogo
                onClick={handleGenerateReport}
                disabled={disabled}
              />
            ) : (
              <CircleX fill="white" stroke="red" />
            )
          ) : (
            <LoadingIcon className="h-6 w-6 p-[4px] text-highlight" />
          )}
        </div>
      )}
    </div>
  );
};

export default EntityCard;
