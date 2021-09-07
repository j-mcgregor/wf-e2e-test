import { useTranslations } from 'use-intl';
import { FinancialYear } from '../../../types/report';

interface SummaryFinancialProps {
  years: FinancialYear[];
}

const SummaryFinancial = ({ years }: SummaryFinancialProps) => {
  const t = useTranslations();

  console.log(`financial summary:`);
  console.log(years);

  return (
    <div className="p-6 shadow rounded-sm bg-white">
      <p className="text-primary">{t('financial statement overview')}</p>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="py-2 align-middle inline-block min-w-full ">
            <div className="overflow-hidden text-xs lg:text-sm">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="border-b border-black">
                  <tr>
                    <td />
                    {years.map(
                      (year, i) =>
                        i < 5 && (
                          <td
                            key={year.year}
                            scope="col"
                            className="relative px-6 py-3 text-primary"
                          >
                            <p>{year.year}</p>
                          </td>
                        )
                    )}
                  </tr>
                </thead>

                <thead>
                  <tr>
                    <td className="min-w-[160px] md:min-w-[180px]">
                      {t('sales')}
                    </td>
                    {years.map(
                      (year, i) =>
                        i < 5 && (
                          <td
                            key={year.year}
                            scope="col"
                            className="relative px-6 py-3"
                          >
                            <p
                              className={`${
                                parseInt(year.sales) < 0 && 'text-red-400'
                              }
                              `}
                            >
                              {!year.sales ? '0' : year.sales}
                            </p>
                          </td>
                        )
                    )}
                  </tr>

                  <tr>
                    <td className=" min-w-[160px] md:min-w-[180px]">
                      {t('profit before taxes')}
                    </td>
                    {years.map(
                      (year, i) =>
                        i < 5 && (
                          <td
                            key={year.year}
                            scope="col"
                            className="relative px-6 py-3"
                          >
                            <p
                              className={`${
                                parseInt(year.profit_and_loss_before_tax) < 0 &&
                                'text-red-400'
                              }
                              `}
                            >
                              {!year.profit_and_loss_before_tax
                                ? '0'
                                : year.profit_and_loss_before_tax}
                            </p>
                          </td>
                        )
                    )}
                  </tr>

                  <tr>
                    <td className="min-w-[160px] md:min-w-[180px]">
                      {t('equity shareholder funds')}
                    </td>
                    {years.map(
                      (year, i) =>
                        i < 5 && (
                          <td
                            key={year.year}
                            scope="col"
                            className="relative px-6 py-3"
                          >
                            <p
                              className={`${
                                parseInt(year.total_shareholder_funds) < 0 &&
                                'text-red-400'
                              }
                              `}
                            >
                              {year.total_shareholder_funds}
                            </p>
                          </td>
                        )
                    )}
                  </tr>

                  <tr>
                    <td>{t('tangible worth')}</td>
                    {years.map(
                      (year, i) =>
                        i < 5 && (
                          <td
                            key={year.year}
                            scope="col"
                            className="relative px-6 py-3"
                          >
                            <p
                              className={`${
                                parseInt(year.capital) < 0 && 'text-red-400'
                              }
                              `}
                            >
                              {year.capital}
                            </p>
                          </td>
                        )
                    )}
                  </tr>

                  <tr>
                    <td>{t('total fixed assets')}</td>
                    {years.map(
                      (year, i) =>
                        i < 5 && (
                          <td
                            key={year.year}
                            scope="col"
                            className="relative px-6 py-3"
                          >
                            <p
                              className={`${
                                parseInt(year.tangible_fixed_assets) < 0 &&
                                'text-red-400'
                              }
                              `}
                            >
                              {year.tangible_fixed_assets}
                            </p>
                          </td>
                        )
                    )}
                  </tr>

                  <tr>
                    <td>{t('total assets')}</td>
                    {years.map(
                      (year, i) =>
                        i < 5 && (
                          <td
                            key={year.year}
                            scope="col"
                            className="relative px-6 py-3"
                          >
                            <p
                              className={`${
                                parseInt(year.total_assets) < 0 &&
                                'text-red-400'
                              }
                              `}
                            >
                              {year.total_assets}
                            </p>
                          </td>
                        )
                    )}
                  </tr>

                  <tr>
                    <td>{t('total current assets')}</td>
                    {years.map(
                      (year, i) =>
                        i < 5 && (
                          <td
                            key={year.year}
                            scope="col"
                            className="relative px-6 py-3"
                          >
                            <p
                              className={`${
                                parseInt(year.current_assets) < 0 &&
                                'text-red-400'
                              }
                              `}
                            >
                              {year.current_assets}
                            </p>
                          </td>
                        )
                    )}
                  </tr>
                  <tr>
                    <td>{t('total current liabilities')}</td>
                    {years.map(
                      (year, i) =>
                        i < 5 && (
                          <td
                            key={year.year}
                            scope="col"
                            className="relative px-6 py-3"
                          >
                            <p
                              className={`${
                                parseInt(year.current_liabilities) < 0 &&
                                'text-red-400'
                              }
                              `}
                            >
                              {year.current_liabilities}
                            </p>
                          </td>
                        )
                    )}
                  </tr>

                  <tr>
                    <td>{t('net current assets')}</td>
                    {years.map(
                      (year, i) =>
                        i < 5 && (
                          <td
                            key={year.year}
                            scope="col"
                            className="relative px-6 py-3"
                          >
                            <p
                              className={`${
                                parseInt(year.net_current_assets) < 0 &&
                                'text-red-400'
                              }
                              `}
                            >
                              {year.net_current_assets}
                            </p>
                          </td>
                        )
                    )}
                  </tr>

                  <tr>
                    <td>{t('employees')}</td>
                    {years.map(
                      (year, i) =>
                        i < 5 && (
                          <td
                            key={year.year}
                            scope="col"
                            className="relative px-6 py-3"
                          >
                            <p>{!year.employees ? '0' : year.employees}</p>
                          </td>
                        )
                    )}
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryFinancial;
