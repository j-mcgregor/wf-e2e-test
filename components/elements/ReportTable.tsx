import ReactTimeAgo from 'react-timeago';
import { useTranslations } from 'use-intl';
import { ExternalLinkIcon, DocumentReportIcon } from '@heroicons/react/outline';
import { Report } from '../../types/global';
import { useSession } from 'next-auth/client';
import Link from '../elements/Link';

import RowFiller from './RowFiller';

interface ReportProps {
  reports?: Report[] | null;
  limit: number;
}

const ReportTable = ({ reports, limit }: ReportProps) => {
  const session = useSession();
  const isLoading = !reports;

  // number of blank reports, if reports are less than the limit prop
  const blankReports: number | undefined = limit - reports?.length; // can't fix ts error but working?

  // jsx elements for use in empty row loading state
  const emptyCell: JSX.Element = <td className="px-6 py-4" />;

  const emptyRow: JSX.Element = (
    <tr className="bg-white h-[72px] animate-pulse odd:bg-gray-100">
      {emptyCell}
      {emptyCell}
      {emptyCell}
      {emptyCell}
      {emptyCell}
    </tr>
  );

  const t = useTranslations();
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto -mx-6">
        <div className="py-2 align-middle min-w-full min-h-full px-6">
          <div className="shadow overflow-hidden rounded">
            <table className="min-w-full divide-y-2 divide-gray-200">
              <thead className="bg-gray-50">
                <tr className="text-left text-sm tracking-wider">
                  <th scope="col" className="px-6 py-3 font-medium border-r-2">
                    {t('company name')}
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium border-r-2">
                    {t('sme z-score')}
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium border-r-2">
                    {t('bond rating')}
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium ">
                    {t('created')}
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {reports?.map(
                  (report: Report, i: number) =>
                    // display reports only up until quantity limit specified in props
                    i < limit && (
                      <tr
                        key={report.id}
                        className="bg-white odd:bg-gray-50 hover:bg-gray-300 cursor-default"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {report.company_Name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm ">
                          {report.sme_zscore}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm ">
                          {report.bond_rating}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm ">
                          <ReactTimeAgo date={report.created_at} />
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link linkTo="#">
                            <ExternalLinkIcon className="h-6 w-6 m-2 text-gray-700 " />
                          </Link>
                        </td>
                      </tr>
                    )
                )}

                {/* if quantity of empty reports is less than limit & not negative */}
                {/* fill remaining empty spots with blank filler */}
                {blankReports > 0 && blankReports < limit && (
                  <RowFiller
                    className="bg-gray-200 h-[72px]"
                    rowQty={blankReports}
                  />
                )}
                {/* when loading state, show qty of empty rows based on limit prop */}
                {isLoading && <>{Array(limit).fill(emptyRow)}</>}
              </tbody>
            </table>

            {/* display when reports array is empty */}
            {!isLoading && reports?.length === 0 && (
              <div className="flex items-center justify-center text-center bg-gray-300 text-white">
                <div className="my-8 mx-8 md:mx-14 py-6 px-4 sm:px-6 md:px-14 bg-primary flex flex-col items-center">
                  <DocumentReportIcon className="h-10 w-10 mb-2" />
                  <h2 className="text-xl my-2">{t('no reports generated')}</h2>
                  <p>{t('get started with new report')}</p>
                  <Link>
                    <button className="bg-highlight px-8 py-2 my-4">
                      {t('generate report')}
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportTable;
