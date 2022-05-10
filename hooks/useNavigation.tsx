import {
  AdjustmentsIcon,
  ChipIcon,
  DocumentDuplicateIcon,
  DocumentIcon,
  DocumentReportIcon,
  FingerPrintIcon,
  HomeIcon,
  KeyIcon,
  LogoutIcon,
  MailIcon,
  OfficeBuildingIcon,
  SupportIcon,
  UserCircleIcon
} from '@heroicons/react/outline';
import * as Sentry from '@sentry/react';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import React from 'react';
import useLocalStorage from './useLocalStorage';

const useMainNavItems = () => {
  const [, setLastPageVisited] = useLocalStorage<string>(
    'wf_last_page_visited',
    ''
  );

  const t = useTranslations();
  return {
    primaryNavigation: [
      { name: `${t('dashboard')}`, href: `/`, icon: HomeIcon, current: true },
      {
        name: `${t('reports')}`,
        href: '/reports',
        icon: DocumentReportIcon
      },
      { name: `${t('risk_reports')}`, title: true },
      {
        name: `${t('run_one_company')}`,
        href: '/sme-calculator',
        icon: DocumentIcon
      },
      {
        name: `${t('run_many_companies')}`,
        href: '/batch-reports',
        icon: DocumentDuplicateIcon
      }
      // removed until being added back in
      // {
      //   name: `${t('sme_prospector')}`,
      //   href: '/sme-prospector',
      //   icon: Document
      // }
    ],
    secondaryNavigation: [
      {
        name: `${t('organisation')}`,
        href: '/organisation',
        icon: OfficeBuildingIcon,
        adminOnly: true
      },
      {
        name: `${t('api_documentation')}`,
        href: '/api-documentation',
        icon: ChipIcon
      },
      { name: `${t('settings')}`, href: '/settings', icon: AdjustmentsIcon },
      { name: `${t('support')}`, href: '/support', icon: SupportIcon },
      {
        name: `${t('logout')}`,
        href: '/logout',
        icon: LogoutIcon
      }
    ]
  };
};

const useReportNavItems = () => {
  const t = useTranslations();
  return [
    { title: `${t('summary')}`, id: 'summary' },
    { title: `${t('risk_metrics')}`, id: 'risk_metrics' },
    { title: `${t('highlights')}`, id: 'highlights' },
    { title: `${t('financial_trends')}`, id: 'financial_trends' },
    { title: `${t('corporate_governance')}`, id: 'corporate_governance' },
    { title: `${t('legal_events')}`, id: 'legal_events' },
    { title: `${t('macroeconomic_trends')}`, id: 'macro_economic_trends' },
    { title: `${t('esg')}`, id: 'esg' },
    { title: `${t('news')}`, id: 'news' }
  ];
};

interface useSettingsNavItemsProps {
  // eslint-disable-next-line no-unused-vars
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  title: string;
  id: string;
}

const useSettingsNavItems = (): useSettingsNavItemsProps[] => {
  const t = useTranslations();
  return [
    {
      icon: UserCircleIcon,
      title: `${t('personal_information')}`,
      id: 'personal_information'
    },
    { icon: FingerPrintIcon, title: `${t('preferences')}`, id: 'preferences' },
    { icon: KeyIcon, title: `${t('password')}`, id: 'password' },
    { icon: MailIcon, title: `${t('communication')}`, id: 'communication' }
  ];
};

export { useSettingsNavItems, useReportNavItems, useMainNavItems };
export type { useSettingsNavItemsProps };
