/* eslint-disable sonarjs/cognitive-complexity */
import Link from '../../elements/Link';
import { toTitleCase } from '../../../lib/utils/text-helpers';
import LinkedinLogo from '../../elements/LinkedinLogo';
// import UserIcon from '../../svgs/UserIcon';
import ShareholderCardSvg from '../../svgs/backgrounds/ShareholderCardBG';
import { ShareHolderCardProps } from '../../../types/report';
import { OfficeBuildingIcon, UserIcon } from '@heroicons/react/outline';
import { useTranslations } from 'next-intl';
import PepFlag from '../../elements/PepFlag';
import React from 'react';
import LoadingIcon from '../../svgs/LoadingIcon';
import { WFTwoToneLogo } from '../../svgs/WFTwoToneLogo';
import { useCreateReport } from '../../../hooks/useCreateReport';

const ShareHolderCard = ({
  firstName,
  lastName,
  name,
  type,
  percentage,
  isPep,
  company_id,
  disabled,
  setDisabled,
  iso_code
}: ShareHolderCardProps) => {
  const t = useTranslations();

  const isShareholderIndividual =
    type === 'One or more named individuals or families';

  let fullName = '';
  let linkedInLink = '';

  if (firstName && lastName) {
    fullName = `${toTitleCase(firstName)} ${toTitleCase(lastName)}`;
  }

  if (isShareholderIndividual) {
    linkedInLink = `https://www.linkedin.com/search/results/all/?keywords=${
      fullName || name
    }`;
  }

  const { createReport, loading } = useCreateReport({
    iso_code,
    company_id,
    disabled,
    setDisabled
  });

  const handleGenerateReport = async () => await createReport();

  return (
    <div
      className={
        'bg-transparent flex flex-col rounded-sm  text-sm  avoid-break  relative  print:text-xs   '
      }
    >
      <div
        className="flex avoid-break  print:shadow-none print:px-1 print:py-1 print:text-xs bg-white justify-between items-end"
        data-testid="shareholder-card-testid "
      >
        <div className="flex py-3 px-2 w-full justify-between">
          {isShareholderIndividual ? (
            <UserIcon className="h-6 w-6" />
          ) : (
            <OfficeBuildingIcon className="h-6 w-6" />
          )}
          {isShareholderIndividual ? (
            <p className="flex-1 text-left ml-1">
              {fullName ? fullName : name ? `${toTitleCase(name)}` : null}
            </p>
          ) : (
            <p className="flex-1 text-left ml-1">{name}</p>
          )}

          {isShareholderIndividual && (
            <Link className="print:hidden" linkTo={linkedInLink}>
              <LinkedinLogo />
            </Link>
          )}
        </div>

        {company_id && !isShareholderIndividual && (
          <div
            className="min-w-32 flex items-center justify-center w-[65px] h-[65px]"
            title={`Generate a report on ${name}`}
          >
            {!loading ? (
              <WFTwoToneLogo
                onClick={handleGenerateReport}
                disabled={disabled}
              />
            ) : (
              <LoadingIcon />
            )}
          </div>
        )}
      </div>

      <div className="relative h-8 flex">
        <ShareholderCardSvg className="absolute bottom-0 z-0 h-full" />
        <p className="font-bold relative z-10 ml-3">
          {percentage ? `${percentage}%` : t('na')}
        </p>
        {isPep && (
          <PepFlag
            hint={t('this_person_is_risk_relevant_name')}
            className=" z-10 relative ml-4"
          />
        )}
      </div>
    </div>
  );
};

export default ShareHolderCard;
