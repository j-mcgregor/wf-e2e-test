import { useTranslations } from 'next-intl';




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

export default useReportNavItems