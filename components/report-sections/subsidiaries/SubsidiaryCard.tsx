import React from 'react';

interface SubsidiaryCardName {
  name: string;
}
export const SubsidiaryCard = ({ name }: SubsidiaryCardName) => {
  return (
    <div
      className="bg-white flex py-5 space-x-2 px-5 justify-between items-center rounded-sm shadow-sm text-sm
	avoid-break  print:shadow-none print:px-1 print:py-1 print:text-xs"
      data-testid="subsidiary-card-testid"
      role="listbox"
    >
      <p>{name}</p>
    </div>
  );
};
