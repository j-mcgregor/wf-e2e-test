import { useTranslations } from 'next-intl';
import { FinancialYear } from '../../../types/report';

import Tick from '../../icons/Tick';
import Cross from '../../icons/Cross';

interface FinancialAccountProps {
  financialYears?: FinancialYear[];
}

const FinancialAccounts = ({ financialYears }: FinancialAccountProps) => {
  // create a list of years going back from the current year
  // check if report has every year that has been generated
  // if accounts (year) exists render tick css
  // if accounts (year) doesn't exist render cross css

  const preYears = [...Array(5).keys()];
  const currentYear = new Date().getFullYear();

  const years = preYears.map(index => `${currentYear - index}`);

  const availableFinancialYears = financialYears?.map(
    financialData => financialData.year
  );

  const t = useTranslations();
  return (
    <div className="flex flex-col w-full ">
      <p className="font-bold py-2">{t('financial_accounts')}</p>
      <ul className="space-y-2" data-testid="financial-accounts-list">
        {years.map(year => (
          <li key={year} className="bg-white p-2 rounded flex justify-between">
            {year}{' '}
            {availableFinancialYears &&
            availableFinancialYears?.indexOf(year) > -1 ? (
              <Tick />
            ) : (
              <Cross />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FinancialAccounts;
