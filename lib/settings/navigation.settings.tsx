import { signOut } from 'next-auth/client';

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


export const siteNavigation = {
  primaryNavigation: [
    { name: 'Dashboard', href: `/`, icon: HomeIcon, current: true },
    {
      name: 'Reports',
      href: '/reports',
      icon: DocumentReportIcon
    },
    { name: 'Our Tools', title: true },
    {
      name: 'SME Calc',
      href: '/sme-calc',
      icon: LightningBoltIcon
    },

    {
      name: 'SME Prospector',
      href: '/sme-prospector',
      icon: SearchCircleIcon
    }
  ],
  secondaryNavigation: [
    {
      name: 'Batched Reports',
      href: '/batched-reports',
      icon: DocumentDuplicateIcon
    },
    { name: 'Api Documentation', href: '/api', icon: ChipIcon },
    { name: 'Settings', href: '/settings', icon: AdjustmentsIcon },
    { name: 'Support', href: '/support', icon: SupportIcon },
    {
      name: 'Log Out',
      onClick: () => signOut({ callbackUrl: '/login' }),
      icon: LogoutIcon
    }
  ]
};
