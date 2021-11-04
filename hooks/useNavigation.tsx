import {
  AdjustmentsIcon,
  ChipIcon,
  DocumentDuplicateIcon,
  DocumentReportIcon,
  FingerPrintIcon,
  HomeIcon,
  KeyIcon,
  LightningBoltIcon,
  LogoutIcon,
  MailIcon,
  SearchCircleIcon,
  SupportIcon,
  UserCircleIcon
} from '@heroicons/react/outline';
import { signOut } from 'next-auth/client';
import { useTranslations } from 'next-intl';
import React from 'react';

const useMainNavItems = () => {
  const t = useTranslations();
  return {
    primaryNavigation: [
      { name: `${t('dashboard')}`, href: `/`, icon: HomeIcon, current: true },
      {
        name: `${t('reports')}`,
        href: '/reports',
        icon: DocumentReportIcon
      },
      { name: `${t('our_tools')}`, title: true },
      {
        name: `${t('sme_calc')}`,
        href: '/sme-calculator',
        icon: LightningBoltIcon
      }
      // removed until being added back in
      // {
      //   name: `${t('sme_prospector')}`,
      //   href: '/sme-prospector',
      //   icon: SearchCircleIcon
      // }
    ],
    secondaryNavigation: [
      {
        name: `${t('batched_reports')}`,
        href: '/batched-reports',
        icon: DocumentDuplicateIcon
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
        onClick: () =>
          signOut({ callbackUrl: `${window.location.origin}/login` }),
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
    { title: `${t('macro_economic_trends')}`, id: 'macro_economic_trends' },
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
