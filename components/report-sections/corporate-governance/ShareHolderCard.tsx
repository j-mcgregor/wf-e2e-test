import Link from '../../elements/Link';
import { toTitleCase } from '../../../lib/utils/text-helpers';
import LinkedinLogo from '../../elements/LinkedinLogo';

interface ShareHolderCardProps {
  firstName: string | null;
  lastName: string | null;
  linkedin?: string;
  percentage?: number;
  name: string | null;
  type?: string;
}

const ShareHolderCard = ({
  firstName,
  lastName,
  name,
  type,
  percentage
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

  return (
    <div
      className="bg-white flex py-3 space-x-2 px-4 justify-between items-center rounded-sm shadow-sm text-sm
      avoid-break print:shadow-none print:px-1 print:py-1 print:text-xs"
      data-testid="shareholder-card-testid"
    >
      {isShareholderIndividual ? (
        <p className="flex-1 text-left">
          {fullName ? fullName : name ? `${toTitleCase(name)}` : null}
        </p>
      ) : (
        <p className="flex-1 text-left">{name}</p>
      )}
      {isShareholderIndividual && (
        <Link className="print:hidden" linkTo={linkedInLink}>
          <LinkedinLogo />
        </Link>
      )}
      {percentage && <p className="font-bold">{percentage}%</p>}
    </div>
  );
};

export default ShareHolderCard;
