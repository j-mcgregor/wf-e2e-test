/* eslint-disable security/detect-object-injection */
import * as Sentry from '@sentry/nextjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { mutate } from 'swr';

import countryCodes from '../lib/data/countryCodes.json';
import OrbisValidIsoCodes from '../lib/data/orbisValidIsoCountries.json';
import fetcher from '../lib/utils/fetcher';
import { ReportsReportApi } from '../pages/api/reports/report';

interface UseCreateReportProps {
  iso_code: string | null;
  company_id: string | null;
  disabled: boolean;
  setDisabled: (value: boolean) => void;
}

export const useCreateReport = ({
  iso_code,
  company_id,
  disabled,
  setDisabled
}: UseCreateReportProps) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [reportId, setReportId] = useState('');
  const [isError, setIsError] = useState(false);
  const [isValidIso, setIsValidIso] = useState(false);

  const createReport = async () => {
    if (company_id && !disabled) {
      const currencySymbol =
        countryCodes.find(country => country.code === iso_code)
          ?.currency_code || '';

      const sentryExtraInfo = {
        data: {
          body: {
            country: iso_code,
            company_name: name
          }
        }
      };

      try {
        setLoading(true);
        setDisabled(true);

        const createReportRes: ReportsReportApi = await fetcher(
          '/api/reports/report',
          'POST',
          { company_id, iso_code, currency: currencySymbol, accounts_type: 0 }
        );

        if (createReportRes?.reportId) {
          // update the global user state to get the new report
          mutate('/api/user');
          setLoading(false);

          setReportId(createReportRes?.reportId);
        }

        if (!createReportRes?.reportId) {
          setLoading(false);
          setDisabled(false);
          setIsError(createReportRes.is_error);

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
        setLoading(false);
        setDisabled(false);

        Sentry.captureException(err, {
          extra: sentryExtraInfo
        });
      }
    }
  };

  useEffect(() => {
    if (iso_code && (OrbisValidIsoCodes as Record<string, string>)[iso_code]) {
      setIsValidIso(true);
    }
  }, []);

  useEffect(() => {
    if (reportId) {
      router.push(`/report/${reportId}?from=${router.asPath}`);
    }
  }, [reportId]);

  return {
    createReport,
    loading,
    reportId,
    isError,
    isValidIso
  };
};
