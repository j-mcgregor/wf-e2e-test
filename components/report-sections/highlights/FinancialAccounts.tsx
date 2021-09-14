import { useTranslations } from 'use-intl';

import { FinancialYear } from '../../../types/report';

import Tick from '../../icons/Tick';
import Cross from '../../icons/Cross';

interface FinancialAccountProps {
  years?: FinancialYear[];
}

const FinancialAccounts = ({ years }: FinancialAccountProps) => {
  const a =
    years &&
    years.map((year, i) => {
      if (Number(year.year) === Number(years[i + 1]?.year) + 1) {
        console.log(year.year);
      }
    });

  console.log(a);

  const t = useTranslations();
  return (
    <div className="flex flex-col w-3/12 pt-6">
      <p className="font-bold py-2">{t('financial accounts')}</p>
      <ul>{}</ul>
    </div>
  );
};

export default FinancialAccounts;
