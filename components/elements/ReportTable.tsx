import { DocumentReportIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import ReactTimeAgo from 'react-timeago';
import { useTranslations } from 'next-intl';

import { Report } from '../../types/global';
import SkeletonRow from '../skeletons/SkeletonRow';
import Button from './Button';

interface ReportProps {
  reports?: Report[] | null;
  limit: number;
  shadow: boolean;
  borders: boolean;
  fillerRows: boolean;
  headerSize: string;
}

const ReportTable = ({
  reports,
  limit,
  shadow,
  borders,
  fillerRows,
  headerSize
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

  // text-[10px] px-2 lg:text-xs

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto -mx-6">
        <div className="py-2 align-middle min-w-full min-h-full px-6">
          <div className={`${shadowClasses} overflow-auto rounded`}>
            <table className="min-w-full divide-y-2 divide-gray-200">
              <thead className="bg-gray-50">
                <tr className={`${headerSize} text-left  tracking-wider`}>
                  <th
                    scope="col"
                    className={`${borderClasses} px-3 sm:px-6 py-2 font-medium`}
                  >
                    {t('company_name')}
                  </th>
                  <th
                    scope="col"
                    className={`${borderClasses} px-3 sm:px-6  py-2 font-medium`}
                  >
                    {t('sme_z-score')}
                  </th>
                  <th
                    scope="col"
                    className={`${borderClasses} px-3 sm:px-6 py-3 font-medium`}
                  >
                    {t('bond_rating')}
                  </th>
                  <th scope="col" className="px-3 sm:px-6 py-3 font-medium ">
                    {t('created')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedReports?.map(
                  (report: Report, index: number) =>
                    // display reports only up until quantity limit specified in props
                    index < limit && (
                      <Link
                        key={index}
                        href={`report/${report.id}`}
                        passHref={true}
                      >
                        <tr
                          key={report.id}
                          className="bg-white odd:bg-gray-50 hover:bg-gray-300 text-xs lg:text-sm cursor-pointer"
                        >
                          <td className="h-12 px-3 sm:px-6 py-1 whitespace-nowrap font-medium text-gray-900">
                            {report.company_name}
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
                  <SkeletonRow
                    cellQty={4}
                    className="bg-gray-200 h-[48px]"
                    rowQty={blankReports}
                  />
                )}

                {/* when loading state, show qty of empty rows based on limit prop */}
                {isLoading && (
                  <SkeletonRow
                    cellQty={4}
                    className="bg-white odd:bg-gray-100 h-[48px]"
                    rowQty={limit}
                  />
                )}
              </tbody>
            </table>

            {/* display when reports array is empty */}
            {!isLoading && reports?.length === 0 && (
              <div className="flex items-center justify-center text-center bg-gray-200">
                <div className="my-8 mx-8 md:mx-14 py-6 px-4 sm:px-6 md:px-1 flex flex-col items-center">
                  <DocumentReportIcon className="h-10 w-10 mb-2" />
                  <h3 className="font-bold">{t('no_reports_generated')}</h3>
                  <p>{t('get_started_with_new_report')}</p>
                  <Button
                    className="max-w-xxs mt-4"
                    variant="highlight"
                    linkTo="/sme-calc"
                  >
                    {t('generate_report')}
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
