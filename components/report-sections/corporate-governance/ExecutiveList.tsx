import { useTranslations } from 'next-intl';
import React from 'react';
import { TranslateInput } from '../../../types/global';
import { BoardMember } from '../../../types/report';
import ExecutiveCard from './ExecutiveCard';

interface ExecutiveCardListProps {
  executives: BoardMember[];
  title: TranslateInput;
  showAppointmentDate?: boolean;
}

const ExecutiveCardList = ({
  executives,
  title,
  showAppointmentDate
}: ExecutiveCardListProps) => {
  const t = useTranslations();

  return (
    <div
      className="my-4 avoid-break "
      data-testid="corp-shareholder-section-testid"
    >
      <p className="text-xl py-4 print:text-2xl print:py-6">{title}</p>

      <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4 print:gap-0 print:grid-cols-4 sm:print:grid-cols-4 lg:print:grid-cols-4 print:border-2 print:px-4 print:py-2">
        {executives &&
          executives.map((executive, index) => {
            return (
              <ExecutiveCard
                key={`executive-${index}`}
                name={executive.name}
                firstName={executive.first_name}
                lastName={executive.last_name}
                jobrole={executive.job_title}
                profilePic=""
                showAppointmentDate={showAppointmentDate}
                appointmentDate={executive.appointment_date}
                isLiability={executive.is_liability}
              />
            );
          })}
      </div>
    </div>
  );
};

export default ExecutiveCardList;
