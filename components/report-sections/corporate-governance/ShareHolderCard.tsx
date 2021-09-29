import LinkedinIcon from '../../svgs/LinkedinIcon';
import Link from '../../elements/Link';
import { toTitleCase } from '../../../lib/utils/text-helpers';

interface ShareHolderCardProps {
  firstName: string;
  lastName: string;
  linkedin?: string;
}

const ShareHolderCard = ({
  firstName,
  lastName,
  linkedin
}: ShareHolderCardProps) => {
  return (
    <div className="bg-white flex py-3 px-4 justify-between items-center rounded-sm shadow-sm text-sm">
      <p>
        {toTitleCase(firstName)} {toTitleCase(lastName)}
      </p>
      {linkedin && (
        <Link linkTo={linkedin}>
          <LinkedinIcon />
        </Link>
      )}
    </div>
  );
};

export default ShareHolderCard;
