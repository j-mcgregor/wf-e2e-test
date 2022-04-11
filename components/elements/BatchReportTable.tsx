import { DownloadIcon, EyeIcon } from '@heroicons/react/outline';
import { useTranslations } from 'next-intl';

import type { BatchSummary } from '../../types/batch-reports';
import Link from 'next/link';
import { createReportTitle } from '../../lib/utils/text-helpers';

interface ReportProps {
  data?: BatchSummary[];
  reportId?: string;
}

const BatchReportTable = ({ data, reportId }: ReportProps) => {
  const t = useTranslations();

  return (
    <div className="flex flex-col text-sm">
      <div className="overflow-x-auto -mx-6">
        <div className="py-2 align-middle min-w-full min-h-full px-6">
          <div className="overflow-auto rounded shadow ">
            <table className="min-w-full divide-y divide-gray-300 ">
              <thead className="bg-gray-100">
                <tr className="text-left tracking-wider   text-base divide-x divide-gray-300">
                  <th scope="col" className="px-3 sm:px-6 py-2 font-normal ">
                    {t('company_name')}
                  </th>
                  <th
                    scope="col"
                    className="px-3   py-2 text-center font-normal"
                  >
                    {t('sme_z-score')}
                  </th>
                  <th scope="col" className="px-3 py-2 text-center font-normal">
                    {t('bre')}
                  </th>
                  <th
                    scope="col"
                    className="px-3  py-2 text-center font-normal"
                  >
                    {t('pd')}
                  </th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {data?.map((report, index) => {
                  const renderpdRatio =
                    report.probability_of_default_1_year &&
                    new Intl.NumberFormat('en-GB', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    }).format(report.probability_of_default_1_year * 100);

                  const reportTitle = createReportTitle(
                    report.company_name || t('unnamed_company'),
                    report.created_at
                  );
                  return (
                    <Link
                      key={index}
                      href={`/report/${report.id}?from=/batch-reports/${reportId}`}
                      passHref={true}
                    >
                      <tr
                        key={`${report.id} + ${index}`}
                        className="bg-white odd:bg-gray-50 text-xs lg:text-sm w-full hover:bg-gray-300 cursor-pointer"
                      >
                        <td
                          title={reportTitle}
                          className="h-12 px-3 sm:px-6 py-1 whitespace-nowrap"
                        >
                          {reportTitle}
                        </td>
                        <td className="px-3 sm:px-6 py-1  whitespace-nowrap text-center">
                          {report.sme_z_score ? report.sme_z_score : t('na')}
                        </td>
                        <td className="px-3 sm:px-6 py-1 whitespace-nowrap  text-center">
                          {report.bond_rating_equivalent
                            ? report.bond_rating_equivalent
                            : t('na')}
                        </td>
                        <td className="px-3 sm:px-6 py-1 whitespace-nowrap  text-center">
                          {renderpdRatio ? renderpdRatio : t('na')}
                          {renderpdRatio && '%'}
                        </td>
                      </tr>
                    </Link>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchReportTable;
