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
                <thead className="bg-gray-50">
                  {/* YEARS */}
                  <tr>
                    {years.map(
                      // fix to descend from end of array (reverse array first)
                      (year, i) =>
                        i < 5 && (
                          <th
                            key={year.year}
                            scope="col"
                            className="relative px-6 py-3"
                          >
                            <p>{year.year}</p>
                          </th>
                        )
                    )}
                  </tr>
                </thead>

                <thead>
                  {/* TOTAL SHAREHOLDER FUNDS */}
                  <tr>
                    {years.map(
                      // fix to descend from end of array (reverse array first)
                      (year, i) =>
                        i < 5 && (
                          <th
                            key={year.year}
                            scope="col"
                            className="relative px-6 py-3"
                          >
                            <p>{year.total_shareholder_funds}</p>
                          </th>
                        )
                    )}
                  </tr>

                  {/* TANGIBLE WORTH / CAPITAL (?) */}
                  <tr>
                    {years.map(
                      // fix to descend from end of array (reverse array first)
                      (year, i) =>
                        i < 5 && (
                          <th
                            key={year.year}
                            scope="col"
                            className="relative px-6 py-3"
                          >
                            <p>{year.capital}</p>
                          </th>
                        )
                    )}
                  </tr>

                  {/* TOTAL FIXED ASSETS */}
                  <tr>
                    {years.map(
                      // fix to descend from end of array (reverse array first)
                      (year, i) =>
                        i < 5 && (
                          <th
                            key={year.year}
                            scope="col"
                            className="relative px-6 py-3"
                          >
                            <p>{year.tangible_fixed_assets}</p>
                          </th>
                        )
                    )}
                  </tr>

                  {/* TOTAL ASSETS */}
                  <tr>
                    {years.map(
                      // fix to descend from end of array (reverse array first)
                      (year, i) =>
                        i < 5 && (
                          <th
                            key={year.year}
                            scope="col"
                            className="relative px-6 py-3"
                          >
                            <p>{year.total_assets}</p>
                          </th>
                        )
                    )}
                  </tr>

                  {/* TOTAL CURRENT ASSETS */}
                  <tr>
                    {years.map(
                      // fix to descend from end of array (reverse array first)
                      (year, i) =>
                        i < 5 && (
                          <th
                            key={year.year}
                            scope="col"
                            className="relative px-6 py-3"
                          >
                            <p>{year.current_assets}</p>
                          </th>
                        )
                    )}
                  </tr>
                  <tr>
                    {years.map(
                      // fix to descend from end of array (reverse array first)
                      (year, i) =>
                        i < 5 && (
                          <th
                            key={year.year}
                            scope="col"
                            className="relative px-6 py-3"
                          >
                            <p>{year.current_liabilities}</p>
                          </th>
                        )
                    )}
                  </tr>

                  {/* NET CURRENT ASSESTS */}
                  <tr>
                    {years.map(
                      // fix to descend from end of array (reverse array first)
                      (year, i) =>
                        i < 5 && (
                          <th
                            key={year.year}
                            scope="col"
                            className="relative px-6 py-3"
                          >
                            <p>{year.net_current_assets}</p>
                          </th>
                        )
                    )}
                  </tr>
                  {/* EMPLOYEES*/}
                  <tr>
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
