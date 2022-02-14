import React from 'react';
import { TranslateInput } from '../../../types/global';
import { BoardMember } from '../../../types/report';
import ExecutiveCard from './ExecutiveCard';
import { renderArrayForPrint } from '../../../lib/utils/print-helpers';
import usePrintClasses from '../../../hooks/usePrintClasses';

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
  const execsToRender: BoardMember[][] = renderArrayForPrint(executives, 10);

  const execListClasses = {
    chrome: {
      grid: 'print:grid-cols-2'
    },
    'microsoft edge': {
      grid: ''
    }
  };

  const printClasses = usePrintClasses(execListClasses);

  return (
    <div
      className="my-4 avoid-break "
      data-testid="corp-shareholder-section-testid"
    >
      <p className="text-xl py-4 print:text-2xl print:py-6">{title}</p>

      {execsToRender.map((execs: BoardMember[], index: number) => {
        return (
          <div
            key={index}
            className={`${
              index !== 0 && 'print:translate-y-[50px]'
            } grid sm:grid-cols-1 lg:grid-cols-2 gap-4 print:gap-0 print:border-2 print:px-4 print:py-2 avoid-break pt-4 ${
              printClasses.grid || 'sm:print:grid-cols-2'
            }`}
          >
            {execs.map((executive: BoardMember, index: number) => {
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
        );
      })}
    </div>
  );
};

export default ExecutiveCardList;
