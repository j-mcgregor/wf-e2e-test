import { useTranslations } from 'next-intl';
import { addBlankObjects } from '../../../lib/utils/report-helpers';

import { FinancialYear } from '../../../types/report';
import SummaryFinancialRow from './SummaryFinancialRow';

interface SummaryFinancialProps {
  years: FinancialYear[];
}

const SummaryFinancial = ({ years }: SummaryFinancialProps) => {
  const t = useTranslations();

  const yearsWithBlanks = addBlankObjects(years, 5).reverse();

  return (
    <div className="p-6 shadow rounded-sm bg-white print:shadow-none">
      <p className="text-primary print:text-2xl print:pb-8">
        {t('financial_statement_overview')}
      </p>
      <div className="flex flex-col print:border-2 print:px-4">
        <div className="overflow-x-auto">
          <div className="py-2 align-middle inline-block min-w-full ">
            <div className="overflow-hidden text-xs">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="border-b border-black font-semibold">
                  <tr>
                    <td />
                    {yearsWithBlanks?.map((year, index) => (
                      <td
                        key={index}
                        className="relative px-2 py-3 text-primary"
                      >
                        <p>{year.period}</p>
                      </td>
                    ))}
                    <td>
                      <p>{t('trend')}</p>
                    </td>
                  </tr>
                </thead>

                <tbody>
                  <SummaryFinancialRow
                    rowHeader={t('sales')}
                    data={years}
                    rowKey="turnover"
                  />
                  <SummaryFinancialRow
                    rowHeader={t('profit_before_taxes')}
                    data={years}
                    rowKey="profit_and_loss_before_tax"
                  />
                  <SummaryFinancialRow
                    rowHeader={t('equity_shareholder_funds')}
                    data={years}
                    rowKey="total_shareholder_equity"
                  />
                  <SummaryFinancialRow
                    rowHeader={t('tangible_worth')}
                    data={years}
                    rowKey="capital"
                  />
                  <SummaryFinancialRow
                    rowHeader={t('total_fixed_assets')}
                    data={years}
                    rowKey="tangible_fixed_assets"
                  />
                  <SummaryFinancialRow
                    rowHeader={t('total_assets')}
                    data={years}
                    rowKey="total_assets"
                  />
                  <SummaryFinancialRow
                    rowHeader={t('total_current_assets')}
                    data={years}
                    rowKey="current_assets"
                  />
                  <SummaryFinancialRow
                    rowHeader={t('total_current_liabilities')}
                    data={years}
                    rowKey="short_term_debt"
                  />
                  <SummaryFinancialRow
                    rowHeader={t('net_current_assets')}
                    data={years}
                    rowKey="net_current_assets"
                  />
                  <SummaryFinancialRow
                    rowHeader={t('employees')}
                    data={years}
                    rowKey="number_of_employees"
                  />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryFinancial;
