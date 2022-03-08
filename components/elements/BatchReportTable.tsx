import { DownloadIcon, EyeIcon } from '@heroicons/react/outline';
import { useTranslations } from 'next-intl';

import type { BatchSummary } from '../../types/batch-reports';
import Link from 'next/link';

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
                {data?.map((company, index) => {
                  const renderpdRatio =
                    company.probability_of_default_1_year &&
                    new Intl.NumberFormat('en-GB', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    }).format(company.probability_of_default_1_year * 100);

                  return (
                    <Link
                      key={index}
                      href={`/report/${company.id}?from=/batch-reports/${reportId}`}
                      passHref={true}
                    >
                      <tr
                        key={`${company.id} + ${index}`}
                        className="bg-white odd:bg-gray-50 text-xs lg:text-sm w-full hover:bg-gray-300 cursor-pointer"
                      >
                        <td className="h-12 px-3 sm:px-6 py-1 whitespace-nowrap">
                          {company.company_name}
                        </td>
                        <td className="px-3 sm:px-6 py-1  whitespace-nowrap text-center">
                          {company.sme_z_score}
                        </td>
                        <td className="px-3 sm:px-6 py-1 whitespace-nowrap  text-center">
                          {company.bond_rating_equivalent}
                        </td>
                        <td className="px-3 sm:px-6 py-1 whitespace-nowrap  text-center">
                          {renderpdRatio}%
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
