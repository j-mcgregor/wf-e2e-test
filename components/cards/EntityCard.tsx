import { OfficeBuildingIcon, UserIcon } from '@heroicons/react/outline';
import * as Sentry from '@sentry/nextjs';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { mutate } from 'swr';

import countryCodes from '../../lib/data/countryCodes.json';
import fetcher from '../../lib/utils/fetcher';
import { ReportsReportApi } from '../../pages/api/reports/report';
import LoadingIcon from '../svgs/LoadingIcon';
import { WFTwoToneLogo } from '../svgs/WFTwoToneLogo';

interface EntityCardProps {
  name: string;
  type?: string;
  iso_code?: string;
  company_id?: string;
}

const EntityCard = ({ name, type, iso_code, company_id }: EntityCardProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleGenerateReport = async () => {
    setLoading(true);
    const currencySymbol =
      countryCodes.find(country => country.code === iso_code)?.currency_code ||
      '';

    const sentryExtraInfo = {
      data: {
        body: {
          country: iso_code,
          company_name: name
        }
      }
    };

    try {
      const createReportRes: ReportsReportApi = await fetcher(
        '/api/reports/report',
        'POST',
        { company_id, iso_code, currency: currencySymbol, accounts_type: 0 }
      );

      if (createReportRes?.reportId) {
        // update the global user state to get the new report
        mutate('/api/user');
        // redirect to the report page

        router.push(`/report/${createReportRes.reportId}`);
      }

      if (!createReportRes?.reportId) {
        Sentry.captureException(new Error(createReportRes.error), {
          extra: {
            data: {
              ...sentryExtraInfo.data,
              ok: createReportRes.ok
            }
          }
        });
      }
    } catch (err) {
      Sentry.captureException(err, {
        extra: sentryExtraInfo
      });
    } finally {
      setLoading(false);
    }
  };

  const isEntityIndividual = type?.toLowerCase() !== 'corporate';
  return (
    <div
      className="bg-white flex rounded-sm shadow-sm text-sm
	avoid-break  print:shadow-none print:px-1 print:py-1 print:text-xs"
      data-testid="subsidiary-card-testid"
      role="listbox"
      aria-disabled={loading}
    >
      <div className="flex items-center space-x-2 px-3 w-full">
        <div className="min-w-6">
          {isEntityIndividual ? (
            <UserIcon className="h-6 w-6" />
          ) : (
            <OfficeBuildingIcon className="h-6 w-6" />
          )}
        </div>
        <p className="break-all">{name}</p>
      </div>
      <div className="min-w-32">
        {loading ? (
          <div className="flex items-center justify-center h-[65px] w-[65px]">
            <LoadingIcon />
          </div>
        ) : (
          <WFTwoToneLogo onClick={handleGenerateReport} />
        )}
      </div>
    </div>
  );
};

export default EntityCard;
