import {
    AdjustmentsIcon,
    ChipIcon,
    DocumentDuplicateIcon,
    DocumentReportIcon, FingerPrintIcon,
    HomeIcon, KeyIcon,
    LightningBoltIcon,
    LogoutIcon, MailIcon,
    SearchCircleIcon,
    SupportIcon, UserCircleIcon
} from '@heroicons/react/outline';
import {signOut} from 'next-auth/client';
import {useTranslations} from 'next-intl';
import React from "react";


const useMainNavItems = () => {
    const t = useTranslations()
    return {
        primaryNavigation: [
            {name: `${t('dashboard')}`, href: `/`, icon: HomeIcon, current: true},
            {
                name: `${t('reports')}`,
                href: '/reports',
                icon: DocumentReportIcon
            },
            {name: `${t('our tools')}`, title: true},
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
            {name: `${t('api documentation')}`, href: '/api-documentation', icon: ChipIcon},
            {name: `${t('settings')}`, href: '/settings', icon: AdjustmentsIcon},
            {name: `${t('support')}`, href: '/support', icon: SupportIcon},
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

interface useSettingsNavItemsProps {
    // eslint-disable-next-line no-unused-vars
    icon?: (props: React.ComponentProps<"svg">) => JSX.Element;
    title: string
}

const useSettingsNavItems = (): useSettingsNavItemsProps[] => {
    const t = useTranslations()
    return [
        {icon: UserCircleIcon, title: `${t('personal information')}`},
        {icon: FingerPrintIcon, title: `${t('specialists')}`},
        {icon: KeyIcon, title: `${t('password')}`},
        {icon: MailIcon, title: `${t('communication')}`},
    ]
}

export {useSettingsNavItems, useReportNavItems, useMainNavItems};
export type { useSettingsNavItemsProps };
