import {
  AdjustmentsIcon,
  ChipIcon,
  DocumentDuplicateIcon,
  DocumentReportIcon,
  HomeIcon,
  LightningBoltIcon,
  LogoutIcon,
  SearchCircleIcon,
  SupportIcon
} from '@heroicons/react/outline';
import { signOut } from 'next-auth/client';
import { useTranslations } from 'next-intl';

const useMainNavItems = () => {
  const t = useTranslations()
  return { 
    primaryNavigation: [
      { name: `${t('dashboard')}`, href: `/`, icon: HomeIcon, current: true },
      {
        name: `${t('reports')}`,
        href: '/reports',
        icon: DocumentReportIcon
      },
      { name: `${t('our tools')}`, title: true },
      {
        name: `${t('sme calc')}`,
        href: '/sme-calculator',
        icon: LightningBoltIcon
      },
  
      {
        name: `${t('sme prospector')}`,
        href: '/sme-prospector',
        icon: SearchCircleIcon
      }
    ],
    secondaryNavigation: [
      {
        name: `${t('batched reports')}`,
        href: '/batched-reports',
        icon: DocumentDuplicateIcon
      },
      { name: `${t('api documentation')}`, href: '/api-documentation', icon: ChipIcon },
      { name: `${t('settings')}`, href: '/settings', icon: AdjustmentsIcon },
      { name: `${t('support')}`, href: '/support', icon: SupportIcon },
      {
        name: `${t('logout')}`,
        onClick: () => signOut(),
        // onClick: () => signOut({ callbackUrl: '/login' }),
        icon: LogoutIcon
      }
    ]
  };
}

const useReportNavItems = () => {
  const t = useTranslations()
  return [
    `${t('summary')}`,
    `${t('risk metrics')}`,
    `${t('highlights')}`,
    `${t('financial trends')}`,
    `${t('corporate governance')}`,
    `${t('legal events')}`,
    `${t('macro economic trends')}`,
    `${t('esg')}`,
    `${t('news')}`
  ]
}

const useSettingsNavItems = () => {
  const t = useTranslations()
  return [
    `${t('personal information')}`,
    `${t('specialists')}`,
    `${t('password')}`,
    `${t('communication')}`,
  ]
}

export { useSettingsNavItems, useReportNavItems, useMainNavItems }