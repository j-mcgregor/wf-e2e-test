import { useTranslations } from 'next-intl';
import { Association } from '../../../types/report';
import Image from 'next/image';
import LinkedinIcon from '../../svgs/LinkedinIcon';
import ProfileIcon from '../../svgs/ProfileIcon';
import Link from '../../elements/Link';

interface PersonalCardProps {
  title: string;
  name: string;
  role: string;
  linkedinProfile: string;
  profileImage: string;
  appointmentDate: string;
  nationality: string;
  dateOfBirth: string;
  otherAssociations: Association[];
}

const PersonalCard = ({
  title,
  name,
  role,
  linkedinProfile,
  profileImage,
  nationality,
  appointmentDate,
  dateOfBirth,
  otherAssociations
}: PersonalCardProps) => {
  const t = useTranslations();

  const truncateDate = (word: string, qtyToSlice: number): string => {
    return word === 'current'
      ? 'Current'
      : word.slice(word.length - qtyToSlice);
  };
  return (
    <div className="text-sm sm:text-xs xl:text-sm selection:flex flex-col bg-white p-4 rounded-sm shadow-sm">
      <div className="flex justify-between">
        <div className="flex">
          {profileImage ? (
            <div className="relative overflow-hidden h-12 w-12 border rounded-full mr-3">
              <Image src={profileImage} layout="fill" objectFit="cover" alt={`${name} profile`} />
            </div>
          ) : (
            <ProfileIcon className="mr-3" />
          )}

          <div>
            <p className="font-semibold">
              {title}. {name}
            </p>
            <p>{role}</p>
          </div>
        </div>
        <div>
          {linkedinProfile && (
            <Link linkTo={linkedinProfile}>
              <LinkedinIcon />
            </Link>
          )}
        </div>
      </div>
      <div className="flex flex-col w-full my-3">
        <div className="flex justify-between">
          <p className="mr-1">{t('appointment date')}</p>
          <p>{truncateDate(appointmentDate, 4)}</p>
        </div>
        <div className="flex justify-between">
          <p>{t('nationality')}</p>
          <p>{nationality}</p>
        </div>
        <div className="flex justify-between">
          <p>{t('date of birth')}</p>
          <p>{dateOfBirth}</p>
        </div>
      </div>

      <div className="flex flex-col w-full my-3">
        <p className="pb-2 font-bold">Other Associations</p>
        {otherAssociations.map((association, i) => {
          return (
            <div
              key={i}
              className={`${i !== 0 && 'opacity-50'} flex justify-between`}
            >
              <p className="mr-2">{association.company}</p>
              <div className="flex">
                <p>{truncateDate(association.from_date, 4)}</p>
                <span className="mx-1">-</span>
                <p>{truncateDate(association.to_date, 4)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PersonalCard;
