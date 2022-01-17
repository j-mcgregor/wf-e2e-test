import React from 'react';
import Link from '../../elements/Link';
import ProfileIcon from '../../svgs/ProfileIcon';
import LinkedinLogo from '../../elements/LinkedinLogo';

interface DirectorsCardProps {
  name: string;
  jobrole: string;
  profilePic: string;
  appointmentDate: string | Date;
  resignationDate: string | Date;
  isCurrent: boolean;
}

export const DirectorsCard = ({
  name,
  jobrole,
  profilePic,
  appointmentDate,
  resignationDate,
  isCurrent
}: DirectorsCardProps) => {
  const linkedInLink = `https://www.linkedin.com/search/results/all/?keywords=${name}`;

  const formatDate = (date: string | Date) =>
    new Date(date).toLocaleDateString('en-us', {
      dateStyle: 'medium'
    });

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
      <div className="flex flex-col space-y-1">
        <div className="flex flex-row justify-between">
          <p className="text-xs">Appointment Date</p>
          <p className="text-xs">{formatDate(appointmentDate)}</p>
        </div>
        <div className="flex flex-row justify-between">
          <p className="text-xs">Is Active</p>
          <p className="text-xs">{isCurrent ? 'Yes' : 'No'}</p>
        </div>
        {!isCurrent && resignationDate && (
          <div className="flex flex-row justify-between">
            <p className="text-xs">Resignation Date</p>
            <p className="text-xs">{formatDate(resignationDate)}</p>
          </div>
        )}
      </div>
    </div>
  );
};
