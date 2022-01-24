import { useTranslations } from 'next-intl';
import React from 'react';
import { TranslateInput } from '../../../types/global';
import { BoardMember } from '../../../types/report';
import { DirectorsCard } from './DirectorsCard';

interface DirectorsListProps {
  directors: BoardMember[];
  title: TranslateInput;
}

export const DirectorsList = ({ directors, title }: DirectorsListProps) => {
  const t = useTranslations();

  return (
    <div
      className="my-4 avoid-break "
      data-testid="corp-shareholder-section-testid"
    >
      <p className="text-xl py-4 print:text-2xl print:py-6">{title}</p>

      <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4 print:gap-0 print:grid-cols-4 sm:print:grid-cols-4 lg:print:grid-cols-4 print:border-2 print:px-4 print:py-2">
        {directors &&
          directors.map((director, index) => {
            return (
              <DirectorsCard
                key={`director-${index}`}
                name={director.name}
                firstName={director.first_name}
                lastName={director.last_name}
                jobrole={director.job_title}
                profilePic=""
                appointmentDate={director.appointment_date}
                resignationDate={director.appointment_date}
                isCurrent={director.is_current}
                isLiability={director.is_liability}
              />
            );
          })}
      </div>
    </div>
  );
};
