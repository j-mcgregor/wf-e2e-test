import { useTranslations } from 'next-intl';

import { FinancialYear } from '../../../types/report';
import SummaryFinancialRow from './SummaryFinancialRow';

interface SummaryFinancialProps {
  years: FinancialYear[];
}

const SummaryFinancial = ({ years }: SummaryFinancialProps) => {
  const t = useTranslations();

  return (
    <div className="p-6 shadow rounded-sm bg-white">
      <p className="text-primary">{t('financial statement overview')}</p>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="py-2 align-middle inline-block min-w-full ">
            <div className="overflow-hidden text-xs">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="border-b border-black font-semibold">
                  <tr>
                    <td />
                    {years.map((year, i) => (
                      <td
                        key={year.year}
                        className="relative px-2 py-3 text-primary"
                      >
                        <p>{year.year}</p>
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
                    rowKey="sales"
                  />
                  <SummaryFinancialRow
                    rowHeader={t('profit before taxes')}
                    data={years}
                    rowKey="profit_and_loss_before_tax"
                  />
                  <SummaryFinancialRow
                    rowHeader={t('equity shareholder funds')}
                    data={years}
                    rowKey="total_shareholder_funds"
                  />
                  <SummaryFinancialRow
                    rowHeader={t('tangible worth')}
                    data={years}
                    rowKey="capital"
                  />
                  <SummaryFinancialRow
                    rowHeader={t('total fixed assets')}
                    data={years}
                    rowKey="tangible_fixed_assets"
                  />
                  <SummaryFinancialRow
                    rowHeader={t('total assets')}
                    data={years}
                    rowKey="total_assets"
                  />
                  <SummaryFinancialRow
                    rowHeader={t('total current assets')}
                    data={years}
                    rowKey="current_assets"
                  />
                  <SummaryFinancialRow
                    rowHeader={t('total current liabilities')}
                    data={years}
                    rowKey="current_liabilities"
                  />
                  <SummaryFinancialRow
                    rowHeader={t('net current assets')}
                    data={years}
                    rowKey="net_current_assets"
                  />
                  <SummaryFinancialRow
                    rowHeader={t('employees')}
                    data={years}
                    rowKey="employees"
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
