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
    <div className="flex flex-col w-full border-2 border-blue-500">
      <p>{t('financial statement overview')}</p>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="border-b border-black">
                  {/* YEARS */}

                  <tr>
                    <td />
                    {years.map(
                      // fix to descend from end of array (reverse array first)
                      (year, i) =>
                        i < 5 && (
                          <td
                            key={year.year}
                            scope="col"
                            className="relative px-6 py-3"
                          >
                            <p>{year.year}</p>
                          </td>
                        )
                    )}
                  </tr>
                </thead>

                <thead>
                  {/* EQUITY SHAREHOLDER FUNDS */}

                  <tr>
                    <td>Equity Shareholder Funds</td>
                    {years.map(
                      // fix to descend from end of array (reverse array first)
                      (year, i) =>
                        i < 5 && (
                          <td
                            key={year.year}
                            scope="col"
                            className="relative px-6 py-3"
                          >
                            <p>{year.total_shareholder_funds}</p>
                          </td>
                        )
                    )}
                  </tr>

                  {/* TANGIBLE WORTH / CAPITAL (?) */}

                  <tr>
                    <td>Tangible Worth</td>
                    {years.map(
                      // fix to descend from end of array (reverse array first)
                      (year, i) =>
                        i < 5 && (
                          <td
                            key={year.year}
                            scope="col"
                            className="relative px-6 py-3"
                          >
                            <p>{year.capital}</p>
                          </td>
                        )
                    )}
                  </tr>

                  {/* TOTAL FIXED ASSETS */}
                  <tr>
                    <td>Total Fixed Assets</td>
                    {years.map(
                      // fix to descend from end of array (reverse array first)
                      (year, i) =>
                        i < 5 && (
                          <td
                            key={year.year}
                            scope="col"
                            className="relative px-6 py-3"
                          >
                            <p>{year.tangible_fixed_assets}</p>
                          </td>
                        )
                    )}
                  </tr>

                  {/* TOTAL ASSETS */}
                  <tr>
                    <td>Total Assets</td>
                    {years.map(
                      // fix to descend from end of array (reverse array first)
                      (year, i) =>
                        i < 5 && (
                          <td
                            key={year.year}
                            scope="col"
                            className="relative px-6 py-3"
                          >
                            <p>{year.total_assets}</p>
                          </td>
                        )
                    )}
                  </tr>

                  {/* TOTAL CURRENT ASSETS */}
                  <tr>
                    <td>Total Current Assets</td>
                    {years.map(
                      // fix to descend from end of array (reverse array first)
                      (year, i) =>
                        i < 5 && (
                          <td
                            key={year.year}
                            scope="col"
                            className="relative px-6 py-3"
                          >
                            <p>{year.current_assets}</p>
                          </td>
                        )
                    )}
                  </tr>
                  <tr>
                    <td>Total Current Liabilities</td>
                    {years.map(
                      // fix to descend from end of array (reverse array first)
                      (year, i) =>
                        i < 5 && (
                          <td
                            key={year.year}
                            scope="col"
                            className="relative px-6 py-3"
                          >
                            <p>{year.current_liabilities}</p>
                          </td>
                        )
                    )}
                  </tr>

                  {/* NET CURRENT ASSETS */}
                  <tr>
                    <td>Net Current Assets</td>
                    {years.map(
                      // fix to descend from end of array (reverse array first)
                      (year, i) =>
                        i < 5 && (
                          <td
                            key={year.year}
                            scope="col"
                            className="relative px-6 py-3"
                          >
                            <p>{year.net_current_assets}</p>
                          </td>
                        )
                    )}
                  </tr>

                  {/* EMPLOYEES - NULL */}
                  <tr>
                    <td>Employees</td>
                    {years.map(
                      // fix to descend from end of array (reverse array first)
                      (year, i) =>
                        i < 5 && (
                          <th
                            key={year.year}
                            scope="col"
                            className="relative px-6 py-3"
                          >
                            <p>{year.employees}</p>
                          </th>
                        )
                    )}
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* <div>
        {years.map(year => {
          return (
            <div key={year.year}>
              <p>Year = {year.year}</p>
              <p>Capital = {year.capital}</p>
            </div>
          );
        })}
      </div> */}
    </div>
  );
};

export default SummaryFinancial;
