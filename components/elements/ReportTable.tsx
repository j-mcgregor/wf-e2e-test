import ReactTimeAgo from 'react-timeago';
import { useTranslations } from 'use-intl';
import { ArrowNarrowUpIcon } from '@heroicons/react/solid';
import { Report } from '../../types/global';
import Link from '../elements/Link';

interface ReportProps {
  reports?: Report[] | null;
}

const ReportTable = ({ reports }: ReportProps) => {
  const t = useTranslations();
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto -mx-6">
        <div className="py-2 align-middle min-w-full min-h-full px-6">
          <div className="shadow overflow-hidden rounded">
            <table className="min-w-full divide-y-2 divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium tracking-wider border-r-2"
                  >
                    {t('company name')}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium tracking-wider border-r-2"
                  >
                    {t('sme z-score')}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium tracking-wider border-r-2"
                  >
                    {t('bond rating')}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium tracking-wider"
                  >
                    {t('created')}
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {reports?.map((report: Report, i: number) => (
                  <tr
                    key={report.id}
                    className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
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
                        <ArrowNarrowUpIcon className="h-6 w-6 m-2 rotate-45 text-gray-400 " />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportTable;
