import { ArrowLeftIcon } from '@heroicons/react/outline';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Link } from 'react-scroll';

import { useReportNavItems } from '../../hooks/useNavigation';
import { useToast } from '../../hooks/useToast';
import fetcher from '../../lib/utils/fetcher';
import { downloadFile } from '../../lib/utils/file-helpers';
import Button from '../elements/Button';
import SkeletonMenu from '../skeletons/SkeletonMenu';
import { useSession } from 'next-auth/react';
import config from '../../config';

interface ReportNavProps {
  companyName: string;
  loading?: boolean;
  isTesting?: boolean;
  backLink?: string;
}

const nonTestingProps = {
  containerId: 'secondary-layout-container'
};

export const handleExport = async (
  format: 'csv' | 'pdf',
  id: string,
  setDownloading: (value: boolean) => void,
  triggerToast: (args: HandleToast) => void,
  token?: string
) => {
  if (!id) return null;

  try {
    setDownloading(true);

    const isPDF = format === 'pdf';
    if (isPDF) {
      // Getting a direct PDF link is easier than passing through the API Handler
      const response = await fetch(
        `${config.API_URL}/reports/${id}/export/pdf`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      downloadFile({
        data: await response.blob(),
        // eg report-id.csv
        fileName: `batch-report-${id}.pdf`,
        fileType: 'application/pdf'
      });

      triggerToast({
        fileType: 'csv',
        id: `download-pdf-${id}-${Date.now()}`,
        status: response.status
      });
    } else {
      const response = await fetcher(
        `/api/reports/report?id=${id}&export=csv-full`,
        'GET',
        null,
        {
          'Content-Type': 'application/json'
        }
      );
      const fileName = `report-${id}.${format}`;
      downloadFile({
        data: response.data.csv,
        // eg report-companyName.csv
        fileName: fileName,
        fileType: 'text/csv'
      });

      triggerToast({
        fileType: 'csv',
        id: `download-csv-${id}-${Date.now()}`,
        status: response.status
      });
    }
  } catch (error: any) {
    // TODO remove console.log
    // eslint-disable-next-line no-console
    console.log(error);
    return triggerToast({
      id,
      status: error.status || 500,
      fileType: format
    });
  } finally {
    setDownloading(false);
  }
};

interface HandleToast {
  fileType: 'csv' | 'pdf';
  id: string;
  status?: number;
}

const ReportNav = ({
  companyName,
  loading,
  isTesting,
  backLink
}: ReportNavProps) => {
  const navItems = useReportNavItems();
  const t = useTranslations();
  const router = useRouter();
  const { data: session } = useSession();
  const id = router?.query?.id;
  const [activeItem, setActiveItem] = useState<string>('summary');

  const [downloadingCsv, setDownloadingCsv] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  const { triggerToast } = useToast();

  const handleToast =
    (fileType: 'csv' | 'pdf') =>
    ({ id, status }: HandleToast) => {
      triggerToast({
        toastId: id,
        status,
        title: t(`REPORTS.REPORT_DOWNLOAD_${status}.title`, {
          fileType: fileType.toUpperCase()
        }),
        description: t(`REPORTS.REPORT_DOWNLOAD_${status}.description`, {
          fileType: fileType.toUpperCase()
        })
      });
    };

  if (loading) {
    return (
      <>
        <aside className="hidden  w-full px-4 bg-gray-200 animate-pulse md:flex flex-col h-full justify-between py-8">
          <SkeletonMenu items={10} />
          <SkeletonMenu items={2} />
        </aside>
        <aside className="w-full h-12 bg-gray-200 md:hidden"></aside>
      </>
    );
  }
  return (
    <div className="px-6 pt-8 flex-col h-full hidden xl:flex">
      <div>
        <Button
          linkTo={!backLink ? '/reports' : backLink}
          variant="none"
          newClassName="text-sm flex items-center hover:text-alt "
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" /> {t('back_to_saved')}
        </Button>
        <p className="text-sm mt-8">
          {t('wiserfunding_risk_assessment_report')}
        </p>
        <h2 className="mt-4 text-xl">{companyName}</h2>
      </div>

      <div className="flow-root mt-8 ">
        <h4 className="font-bold ">{t('content')}</h4>
        <ul className="text-sm p-2">
          {navItems.map(({ id, title }, index) => {
            const isActive = activeItem === id;
            return (
              <li key={index}>
                <Link
                  to={id}
                  spy={true}
                  offset={0}
                  smooth={true}
                  activeClass={'bg-gray-400'}
                  duration={300}
                  className="cursor-pointer w-full hover:text-alt"
                  onSetActive={() => setActiveItem(id)}
                  // prevents testing failures for issues with type requirement
                  // https://github.com/fisshy/react-scroll/issues/352
                  {...(isTesting ? {} : nonTestingProps)}
                >
                  <div className="relative pb-2 h-full">
                    {index !== navItems.length - 1 ? (
                      <span
                        className={`${
                          isActive ? 'bg-highlight' : 'bg-primary'
                        } absolute top-2 h-full w-0.5 left-0`}
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex items-center ">
                      <span
                        className={`${
                          isActive
                            ? 'bg-highlight ring-highlight'
                            : 'bg-primary ring-primary'
                        } h-0.5 w-0.5 rounded-full ring-[5px] `}
                      />
                      <p
                        className={`${
                          isActive ? 'text-highlight' : ''
                        } ml-6 z-10 text-center`}
                      >
                        {title}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="space-y-2 items-end flex-1 justify-end flex flex-col pb-4">
        <Button
          loading={downloadingPdf}
          disabled={downloadingPdf}
          variant="alt"
          type="button"
          className="w-full"
          onClick={() =>
            handleExport(
              'pdf',
              `${id}`,
              setDownloadingPdf,
              handleToast('pdf'),
              `${session?.token}`
            )
          }
        >
          {t('export_pdf')}
        </Button>
        <Button
          loading={downloadingCsv}
          disabled={downloadingCsv}
          variant="secondary"
          onClick={() =>
            handleExport('csv', `${id}`, setDownloadingCsv, handleToast('csv'))
          }
        >
          {t('export_csv')}
        </Button>
      </div>
    </div>
  );
};

export default ReportNav;
