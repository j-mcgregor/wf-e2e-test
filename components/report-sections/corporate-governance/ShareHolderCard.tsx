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
  linkedin,
  percentage
}: ShareHolderCardProps) => {
  return (
    <div
      className="bg-white flex py-3 px-4 justify-between items-center rounded-sm shadow-sm text-sm
      avoid-break  print:shadow-none print:px-1 print:py-1 print:text-xs"
      data-testid="shareholder-card-testid"
    >
      {type !== 'One or more named individuals or families' && <p>{name}</p>}
      {firstName && lastName && (
        <p>
          {toTitleCase(firstName)} {toTitleCase(lastName)}
        </p>
      )}

      {percentage && <p className="font-bold">{percentage}%</p>}
      {linkedin && (
        <Link className="print:hidden" linkTo={linkedin}>
          <LinkedinIcon />
        </Link>
      )}
    </div>
  );
};

export default ShareHolderCard;
