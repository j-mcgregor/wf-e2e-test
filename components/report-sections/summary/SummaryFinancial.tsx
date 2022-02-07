import { useTranslations } from 'next-intl';
import { addBlankObjects } from '../../../lib/utils/report-helpers';

import { FinancialYear } from '../../../types/report';
import SummaryFinancialRow from './SummaryFinancialRow';
import countryCodes from '../../../lib/data/countryCodes.json';

interface SummaryFinancialProps {
  years: FinancialYear[];
  currencyCode: string;
}

const SummaryFinancial = ({ years, currencyCode }: SummaryFinancialProps) => {
  const t = useTranslations();

  const yearsWithBlanks = addBlankObjects(years, 5);

  const currencySymbol = countryCodes.find(
    country => country.currency_code === currencyCode
  )?.currency_symbol;

  return (
    <div className="p-6 shadow rounded-sm bg-white print:shadow-none ">
      <p className="text-primary print:text-2xl print:pb-8">
        {t('financial_overview')}
      </p>

      <div className="flex flex-col print:border-2 print:px-4">
        <div className="overflow-x-auto">
          <div className="py-2 align-middle inline-block min-w-full ">
            <div className="overflow-hidden text-xs">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="border-b border-black font-semibold">
                  <tr>
                    <td className="font-normal ">
                      {currencySymbol} {currencyCode}
                    </td>

                    {yearsWithBlanks?.map((year, index) => (
                      <td
                        key={index}
                        className="relative px-2 py-3 text-primary text-right"
                      >
                        <p>{year.period}</p>
                      </td>
                    ))}
                    <td className="text-center  w-[80px]">
                      <p>{t('trend')}</p>
                    </td>
                  </tr>
                </thead>

                <tbody>
                  <SummaryFinancialRow
                    rowHeader={t('fixed_assets')}
                    data={years}
                    rowKey="fixed_assets"
                  />
                  <SummaryFinancialRow
                    rowHeader={t('current_assets')}
                    data={years}
                    rowKey="current_assets"
                  />
                  <SummaryFinancialRow
                    rowHeader={t('total_assets')}
                    data={years}
                    rowKey="total_assets"
                  />

                  {/* ===== ADD NON CURRENT LIABILITIES HERE */}
                  <SummaryFinancialRow
                    rowHeader={t('current_liabilities')}
                    data={years}
                    rowKey="current_liabilities"
                  />
                  <SummaryFinancialRow
                    rowHeader={t('non_current_liabilities')}
                    data={years}
                    rowKey="non_current_liabilities"
                  />

                  {/* ==== ADD TOTAL LIABILITIES HERE */}
                  <SummaryFinancialRow
                    rowHeader={t('total_liabilities')}
                    data={years}
                    rowKey="total_liabilities"
                  />
                  <SummaryFinancialRow
                    rowHeader={t('equity_shareholder_funds')}
                    data={years}
                    rowKey="total_shareholder_equity"
                  />

                  <SummaryFinancialRow
                    rowHeader={t('sales')}
                    data={years}
                    rowKey="operating_revenue"
                  />
                  <SummaryFinancialRow
                    rowHeader={t('profit_before_taxes')}
                    data={years}
                    rowKey="profit_and_loss_before_tax"
                  />

                  <SummaryFinancialRow
                    rowHeader={t('employees')}
                    data={years}
                    rowKey="number_of_employees"
                  />

                  {/* <SummaryFinancialRow
                    rowHeader={t('tangible_worth')}
                    data={years}
                    rowKey="capital"
                  />

                  <SummaryFinancialRow
                    rowHeader={t('net_current_assets')}
                    data={years}
                    rowKey="net_current_assets"
                  /> */}
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
