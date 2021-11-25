import { DownloadIcon, EyeIcon } from '@heroicons/react/outline';
import { useTranslations } from 'next-intl';
import { BatchedReportType } from '../../types/global';
import Button from '../elements/Button';

interface ReportProps {
  data?: BatchedReportType;
}

const BatchReportTable = ({ data }: ReportProps) => {
  const t = useTranslations();

  return (
    <div className="flex flex-col text-sm">
      <div className="overflow-x-auto -mx-6">
        <div className="py-2 align-middle min-w-full min-h-full px-6">
          <div className="overflow-auto rounded">
            <table className="min-w-full divide-y-2 divide-primary">
              <thead className="bg-gray-50">
                <tr className="text-left tracking-wider">
                  <th scope="col" className="px-3 sm:px-6 py-2 font-normal">
                    {t('company_name')}
                  </th>
                  <th
                    scope="col"
                    className="px-3 sm:px-6  py-2 text-center font-normal"
                  >
                    {t('sme_z-score')}
                  </th>
                  <th
                    scope="col"
                    className="px-3 sm:px-6  py-2 text-center font-normal"
                  >
                    {t('bond_rating')}
                  </th>
                  <th
                    scope="col"
                    className="px-3 sm:px-6  py-2 text-center font-normal"
                  >
                    {t('default')}
                  </th>
                  <th
                    scope="col"
                    className="px-3 sm:px-6  py-2 text-center font-normal"
                  >
                    {t('view_report')}
                  </th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {data?.company_list?.map((company, index) => {
                  return (
                    <tr
                      key={`${company.id} + ${index}`}
                      className="bg-white odd:bg-gray-50 text-xs lg:text-sm"
                    >
                      <td className="h-12 px-3 sm:px-6 py-1 whitespace-nowrap">
                        {company.company_name}
                      </td>
                      <td className="px-3 sm:px-6 py-1  whitespace-nowrap text-center">
                        {company.sme_zscore}
                      </td>
                      <td className="px-3 sm:px-6 py-1 whitespace-nowrap  text-center">
                        {company.bond_rating}
                      </td>
                      <td className="px-3 sm:px-6 py-1 whitespace-nowrap  text-center">
                        {company.probability_of_default}
                      </td>

                      <td className="px-3 sm:px-6 py-1 whitespace-nowrap flex items-center justify-center">
                        <Button onClick={() => null} linkTo="#" variant="none">
                          <EyeIcon className="h-6 w-6" />
                        </Button>
                      </td>
                    </tr>
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
