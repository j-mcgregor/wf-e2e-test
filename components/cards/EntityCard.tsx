import { OfficeBuildingIcon, UserIcon } from '@heroicons/react/outline';
import React from 'react';

interface EntityCardProps {
  name: string;
  type?: string;
}
const EntityCard = ({ name, type }: EntityCardProps) => {
  const isEntityIndividual = type?.toLowerCase() !== 'corporate';
  return (
    <div
      className="bg-white flex py-4 space-x-2 px-3 items-center rounded-sm shadow-sm text-sm
	avoid-break  print:shadow-none print:px-1 print:py-1 print:text-xs"
      data-testid="subsidiary-card-testid"
      role="listbox"
    >
      <div className="min-w-6">
        {isEntityIndividual ? (
          <UserIcon className="h-6 w-6" />
        ) : (
          <OfficeBuildingIcon className="h-6 w-6" />
        )}
      </div>
      <p>{name}</p>
    </div>
  );
};

export default EntityCard;
