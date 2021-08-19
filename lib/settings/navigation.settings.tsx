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
const logout = (): void =>
  alert('<<<<<<<=====!!!!!!youve been logged out !!!!!!=====>>>>>');

  type IconProps = {
    className?: string;
    style: React.CSSProperties;
  };
export const siteNavigation = {
  primaryNavigation: [
    { name: 'Dashboard', href: `/`, icon: HomeIcon, current: true },
    {
      name: 'Reports',
      href: '/reports',
      icon: DocumentReportIcon,
      current: false
    },
    { name: 'Our Tools', title: true },
    {
      name: 'SME Calc',
      href: '/sme-calc',
      icon: LightningBoltIcon,
      current: false
    },
    {
      name: 'Batched Reports',
      href: '/batched-reports',
      icon: DocumentDuplicateIcon,
      current: false
    },
    {
      name: 'SME Prospector',
      href: '/sme-prospector',
      icon: SearchCircleIcon,
      current: false
    }
  ],
  secondaryNavigation: [
    { name: 'Api Documentation', href: '/api', icon: ChipIcon },
    { name: 'Settings', href: '/settings', icon: AdjustmentsIcon },
    { name: 'Support', href: '/support', icon: SupportIcon },
    {
      name: 'Log Out',
      authAction: () => logout(),
      icon: LogoutIcon
    }
  ]
};
