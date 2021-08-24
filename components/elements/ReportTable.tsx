import ReactTimeAgo from 'react-timeago';
import { useTranslations } from 'use-intl';
import { ArrowNarrowUpIcon } from '@heroicons/react/solid';
import Link from '../elements/Link';

type Report = {
  id: number;
  company_Name: string;
  sme_zscore: number;
  bond_rating: number;
  created_at: number;
};

interface ReportProps {
  reports?: [] | null;
}

const ReportTable = ({ reports }: ReportProps) => {
  const t = useTranslations();
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b-2 border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y-2 divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium   tracking-wider border-r-2"
                  >
                    {t('company name')}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium   tracking-wider border-r-2"
                  >
                    {t('sme z-score')}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium   tracking-wider border-r-2"
                  >
                    {t('bond rating')}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium   tracking-wider"
                  >
                    {t('created')}
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
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
