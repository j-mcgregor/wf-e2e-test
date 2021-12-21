import LinkedinIcon from '../../svgs/LinkedinIcon';
import Link from '../../elements/Link';
import { toTitleCase } from '../../../lib/utils/text-helpers';

interface ShareHolderCardProps {
  firstName: string | null;
  lastName: string | null;
  linkedin: string;
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
  const fullName = `${toTitleCase(firstName || '')} ${toTitleCase(
    lastName || ''
  )}`;

  const linkedInLink = `https://www.linkedin.com/search/results/all/?keywords=${
    type !== 'One or more named individuals or families' ? name : fullName
  }`;
  return (
    <div
      className="bg-white flex py-3 space-x-2 px-4 justify-between items-center rounded-sm shadow-sm text-sm
      avoid-break  print:shadow-none print:px-1 print:py-1 print:text-xs"
      data-testid="shareholder-card-testid"
    >
      <Link className="print:hidden" linkTo={linkedInLink}>
        <LinkedinIcon />
      </Link>
      {type !== 'One or more named individuals or families' && (
        <p className="flex-1 text-left">{name}</p>
      )}
      {firstName && lastName && (
        <p className="flex-1 text-left">
          {toTitleCase(firstName)} {toTitleCase(lastName)}
        </p>
      )}

      {percentage && <p className="font-bold">{percentage}%</p>}
    </div>
  );
};

export default ShareHolderCard;
