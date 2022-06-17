import { useTranslations } from 'next-intl';
import React from 'react';
import CTACard from '../highlights/CTACard';

const AddMoreData = ({
  isAdmin,
  isIntegrated,
  id
}: {
  isAdmin: boolean;
  isIntegrated: boolean;
  id: string;
}) => {
  const t = useTranslations();

  // until feature specification is created we are making this simpler
  // const integrationText = isIntegrated
  //   ? t('use_integration_unlock_private_apis')
  //   : isAdmin
  //   ? t('enable_integrations_through_organisation')
  //   : t('no_access_request_integration_to_be_enabled');

  const integrationText = isIntegrated
    ? t('use_integration_unlock_private_apis')
    : t.rich('enable_integrations_through_support', {
        a: children => (
          <a
            className="underline hover:text-highlight"
            href="mailto:support@wiserfunding.com"
          >
            {children}
          </a>
        )
      });
  //   : t('no_access_request_integration_to_be_enabled');

  const integrationButtonText = isIntegrated
    ? 'Import Data'
    : 'Add Integration';

  const integrationLink = isIntegrated
    ? `/report/integrations?&parentId=${id}&from=/report/${id}`
    : `/organisation`;

  return (
    <div className="w-full lg:ml-8 print:hidden">
      <p className="font-bold py-2">{t('add_more_data')}</p>
      <CTACard
        title={t('import_data')}
        body={integrationText}
        buttonText={integrationButtonText}
        buttonColor={isAdmin && !isIntegrated ? 'bg-[#278EC8]' : 'bg-[#2BAD01]'}
        linkTo={integrationLink}
        disabled={!isIntegrated && !isAdmin}
      />
      <CTACard
        title={t('upload_more_data')}
        body={t('upload_data_for_more_recent_report')}
        buttonText="Upload"
        buttonColor="bg-alt"
        linkTo={`${id}/upload-data`}
      />
    </div>
  );
};

export default AddMoreData;
