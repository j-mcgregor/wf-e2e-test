import ReactTimeAgo from 'react-timeago';
import { useTranslations } from 'use-intl';
import { ExternalLinkIcon } from '@heroicons/react/outline';
import { Report } from '../../types/global';
import Link from '../elements/Link';

interface ReportProps {
  reports?: Report[] | null;
}

const ReportTable = ({ reports }: ReportProps) => {
  const isLoading = !reports;

  // quantity of blank rows to fill if less than 5
  const blankReportsQty: number | undefined = 5 - reports?.length;

  // jsx elements for use in empty row loading state
  const emptyCell: JSX.Element = <td className="px-6 py-4" />;

  const emptyRowGrey: JSX.Element = (
    <tr className="bg-gray-100 h-[72px] animate-pulse">
      {emptyCell}
      {emptyCell}
      {emptyCell}
      {emptyCell}
      {emptyCell}
    </tr>
  );

  const emptyRowWhite: JSX.Element = (
    <tr className="bg-white h-[72px] animate-pulse">
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
                        <ExternalLinkIcon className="h-6 w-6 m-2 text-gray-400 " />
                      </Link>
                    </td>
                  </tr>
                ))}

                {blankReportsQty >= 1 && (
                  // if less than 5 reports, fill blank spots with remaining quantity of blank rows
                  <>
                    {Array(blankReportsQty).fill(
                      <tr className="bg-gray-300 h-[72px]">
                        {emptyCell}
                        {emptyCell}
                        {emptyCell}
                        {emptyCell}
                        {emptyCell}
                      </tr>
                    )}
                  </>
                )}

                {isLoading && (
                  <>
                    {emptyRowWhite}
                    {emptyRowGrey}
                    {emptyRowWhite}
                    {emptyRowGrey}
                    {emptyRowWhite}
                  </>
                )}
              </tbody>
            </table>

            {/* when reports array is empty - show empty report */}
            {/* work in progress... placeholder bits for the moment */}
            {reports?.length === 0 && (
              <div className="flex items-center justify-center bg-gray-300 text-white">
                <div className="my-4 mx-10 p-10 bg-primary flex flex-col items-center">
                  <h2 className=" text-xl">No reports generated yet</h2>
                  <p>Get started with your first report today</p>
                  <button className="bg-highlight px-8 py-2 my-4">
                    Generate report
                  </button>
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
