import ReactTimeAgo from 'react-timeago';
import { useTranslations } from 'use-intl';
import { ExternalLinkIcon, DocumentReportIcon } from '@heroicons/react/outline';
import { Report } from '../../types/global';
import Link from '../elements/Link';

interface ReportProps {
  reports?: Report[] | null;
  limit: number;
}

const ReportTable = ({ reports, limit }: ReportProps) => {
  const isLoading = !reports;

  // quantity of blank rows to fill if less than report limit prop
  const blankReportsQty: number | undefined = limit - reports?.length; // can't fix ts error but working?

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
                {reports?.map(
                  (report: Report, i: number) =>
                    // only shows first reports up to limit specified via props
                    i < limit && (
                      <tr
                        key={report.id}
                        className={`${
                          i % 2 === 0 ? 'bg-white ' : 'bg-gray-50'
                        } hover:bg-gray-400 cursor-default`}
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

                {/* if quantity of empty reports = less than limit props & not negative */}
                {/* fill remaining empty spots with blank filler */}
                {blankReportsQty > 0 && blankReportsQty < limit && (
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

                {/* when loading state, show empty rows */}
                {/* currently always 5 - need to update to respond to limit p */}
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
