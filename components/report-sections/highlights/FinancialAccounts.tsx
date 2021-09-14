import { useTranslations } from 'use-intl';

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
    <div className="flex flex-col w-3/12 pt-6">
      <p className="font-bold py-2">{t('financial accounts')}</p>
      <ul className="space-y-2">
        {years.map(year => (
          <li key={year} className="bg-white p-2 rounded ">
            {year} {availableFinancialYears && availableFinancialYears?.indexOf(year) > -1 ? <Tick /> : <Cross />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FinancialAccounts;
