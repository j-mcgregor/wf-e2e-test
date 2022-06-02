import { useTranslations } from 'next-intl';
import { FinancialYear } from '../../../types/report';

import Tick from '../../icons/Tick';
import Cross from '../../icons/Cross';

interface FinancialAccountProps {
  financialYears?: FinancialYear[];
  accountsOverdue?: boolean;
}

const FinancialAccounts = ({
  financialYears,
  accountsOverdue
}: FinancialAccountProps) => {
  // create a list of years going back from the current year
  // check if report has every year that has been generated
  // if accounts (year) exists render tick css
  // if accounts (year) doesn't exist render cross css

  const preYears = [...Array(5).keys()];
  const latestYearAvailable = new Date().getFullYear() - 1;

  const years = preYears.map(index => `${latestYearAvailable - index}`);

  const availableFinancialYears = financialYears?.map(financialData => {
    const date = new Date(`${financialData.period}`);
    return `${date.getFullYear()}`;
  });

  const t = useTranslations();
  return (
    <div className="flex flex-col w-full ">
      <p className="font-bold py-2">{t('financial_accounts')}</p>
      <ul className="space-y-2" data-testid="financial-accounts-list">
        {years.map(year => {
          const availableFinancialYearsTick =
            availableFinancialYears &&
            availableFinancialYears?.indexOf(year) > -1;
          return (
            <li
              key={year}
              className={
                (!availableFinancialYearsTick && accountsOverdue
                  ? 'bg-red-400 '
                  : 'bg-white ') + ' p-2 rounded flex justify-between'
              }
            >
              {year} {availableFinancialYearsTick ? <Tick /> : <Cross />}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FinancialAccounts;
