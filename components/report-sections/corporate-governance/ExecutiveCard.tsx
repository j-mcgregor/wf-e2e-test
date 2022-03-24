import React from 'react';
import Link from '../../elements/Link';
import ProfileIcon from '../../svgs/ProfileIcon';
import LinkedinLogo from '../../elements/LinkedinLogo';
import { useTranslations } from 'next-intl';

interface ExecutiveCardProps {
  name: string;
  firstName: string;
  lastName: string;
  jobrole: string;
  profilePic: string;
  appointmentDate: string | Date;
  isLiability: boolean;
  showAppointmentDate?: boolean;
}

const ExecutiveCard = ({
  name,
  firstName,
  lastName,
  jobrole,
  profilePic,
  appointmentDate,
  isLiability,
  showAppointmentDate
}: ExecutiveCardProps) => {
  //! API currently returning both first names - implementing this any way and back end will fix
  const linkedInLink = `https://www.linkedin.com/search/results/all/?keywords=${firstName} ${lastName}`;

  const formatDate = (date: string | Date) =>
    new Date(date).toLocaleDateString('en-us', {
      dateStyle: 'medium'
    });

  const t = useTranslations();

  const appointmentDateString = t('appointment_date');

  return (
    <div className="px-4 py-6 flex flex-col bg-white">
      <div className="flex flex-row mb-4 items-center">
        <div>{profilePic ? <div /> : <ProfileIcon className="mr-3" />}</div>
        <div className="flex flex-col flex-grow">
          <p className="text-sm font-bold">{name}</p>
          <p className="text-xs">{jobrole}</p>
        </div>
        <div className="ml-4">
          <Link className="print:hidden" linkTo={linkedInLink}>
            <LinkedinLogo />
          </Link>
        </div>
      </div>
      {showAppointmentDate && (
        <div className="flex flex-col space-y-1">
          <div className="flex flex-row justify-between">
            <p className="text-xs">{appointmentDateString}</p>
            <p className="text-xs">{formatDate(appointmentDate)}</p>
          </div>
        </div>
      )}

      {/* can add new component here - if hint would be required as per shareholders? */}
      {isLiability && (
        <div className="text-xs mt-2 flex space-x-4 items-center w-full pt-3">
          <div className="rounded-full bg-pink-100 w-8 h-8 flex items-center justify-center p-2 font-bold text-primary ">
            <Flag />
          </div>
          <p>{t('this_person_is_risk_relevant_name')}</p>
        </div>
      )}
    </div>
  );
};

export default ExecutiveCard;

const Flag = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
      />
    </svg>
  );
};
