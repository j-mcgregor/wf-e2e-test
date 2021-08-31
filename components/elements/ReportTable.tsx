import { DocumentReportIcon, ExternalLinkIcon } from '@heroicons/react/outline';
import ReactTimeAgo from 'react-timeago';
import { useTranslations } from 'use-intl';

import { Report } from '../../types/global';
import Link from 'next/link';
import Button from './Button';
import RowFiller from './RowFiller';

interface ReportProps {
  reports?: Report[] | null;
  limit: number;
  shadow: boolean;
  borders: boolean;
  fillerRows: boolean;
}

const ReportTable = ({
  reports,
  limit,
  shadow,
  borders,
  fillerRows
}: ReportProps) => {
  const isLoading = !reports;

  // number of blank reports, if reports are less than the limit prop
  const blankReports: number = limit - (reports?.length || 0);

  const t = useTranslations();

  const borderClasses = `${borders && 'border-r-2'}`;
  const shadowClasses = `${shadow && 'shadow'}`;

  // reports sorted by descending created_at date
  const sortedReports =
    reports && Array.from(reports).sort((a, b) => b.created_at - a.created_at);

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto -mx-6">
        <div className="py-2 align-middle min-w-full min-h-full px-6">
          <div className={`${shadowClasses} overflow-auto rounded`}>
            <table className="min-w-full divide-y-2 divide-gray-200">
              <thead className="bg-gray-50">
                <tr className="text-left text-[10px] px-2 lg:text-xs tracking-wider">
                  <th
                    scope="col"
                    className={`${borderClasses} px-3 sm:px-6 py-2 font-medium`}
                  >
                    {t('company name')}
                  </th>
                  <th
                    scope="col"
                    className={`${borderClasses} px-3 sm:px-6  py-2 font-medium`}
                  >
                    {t('sme z-score')}
                  </th>
                  <th
                    scope="col"
                    className={`${borderClasses} px-3 sm:px-6 py-3 font-medium`}
                  >
                    {t('bond rating')}
                  </th>
                  <th scope="col" className="px-3 sm:px-6 py-3 font-medium ">
                    {t('created')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedReports?.map(
                  (report: Report, i: number) =>
                    // display reports only up until quantity limit specified in props
                    i < limit && (
                      <Link href={`reports/${report.id}`}>
                        <tr
                          key={report.id}
                          className="bg-white odd:bg-gray-50 hover:bg-gray-300 text-xs lg:text-sm cursor-pointer"
                        >
                          <td className="h-12 px-3 sm:px-6 py-1 whitespace-nowrap font-medium text-gray-900">
                            {report.company_Name}
                          </td>
                          <td className="px-3 sm:px-6 py-1  whitespace-nowrap  ">
                            {report.sme_zscore}
                          </td>
                          <td className="px-3 sm:px-6 py-1 whitespace-nowrap  ">
                            {report.bond_rating}
                          </td>

                          <td className="px-3 sm:px-6 py-1 whitespace-nowrap  ">
                            <ReactTimeAgo date={report.created_at} />
                          </td>
                        </tr>
                      </Link>
                    )
                )}

                {/* if quantity of empty reports is less than limit & not negative */}
                {/* fill remaining empty spots with blank filler */}

                {fillerRows && blankReports > 0 && blankReports < limit && (
                  <RowFiller
                    cellQty={4}
                    className="bg-gray-200 h-[48px]"
                    rowQty={blankReports}
                  />
                )}

                {/* when loading state, show qty of empty rows based on limit prop */}
                {isLoading && (
                  <RowFiller
                    cellQty={4}
                    className="bg-white odd:bg-gray-100 h-[48px]"
                    rowQty={limit}
                  />
                )}
              </tbody>
            </table>

            {/* display when reports array is empty */}
            {!isLoading && reports?.length === 0 && (
              <div className="flex items-center justify-center text-center bg-gray-300 text-white">
                <div className="my-8 mx-8 md:mx-14 py-6 px-4 sm:px-6 md:px-14 bg-primary flex flex-col items-center">
                  <DocumentReportIcon className="h-10 w-10 mb-2" />
                  <h2 className="text-xl my-2">{t('no reports generated')}</h2>
                  <p>{t('get started with new report')}</p>
                  <Button
                    className="max-w-xxs mt-4"
                    variant="highlight"
                    linkTo="/sme-calc"
                  >
                    {t('generate report')}
                  </Button>
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
