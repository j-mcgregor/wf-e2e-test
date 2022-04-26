import Link from '../../elements/Link';
import { toTitleCase } from '../../../lib/utils/text-helpers';
import LinkedinLogo from '../../elements/LinkedinLogo';
// import UserIcon from '../../svgs/UserIcon';
import ShareholderCardSvg from '../../svgs/backgrounds/ShareholderCardBG';
import { ShareHolderCardProps } from '../../../types/report';
import { OfficeBuildingIcon, UserIcon } from '@heroicons/react/outline';
import { useTranslations } from 'next-intl';
import PepFlag from '../../elements/PepFlag';

const ShareHolderCard = ({
  firstName,
  lastName,
  name,
  type,
  percentage,
  isPep
}: ShareHolderCardProps) => {
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

  const t = useTranslations();
  return (
    <div
      className={
        'bg-transparent flex flex-col rounded-sm  text-sm  avoid-break  relative  print:text-xs   '
      }
    >
      <div
        className="flex avoid-break  print:shadow-none print:px-1 print:py-1 print:text-xs bg-white py-3 px-2 items-center justify-between"
        data-testid="shareholder-card-testid "
      >
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
