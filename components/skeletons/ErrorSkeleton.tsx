import { ExclamationCircleIcon } from '@heroicons/react/outline'
import React from 'react'
import { useTranslations } from 'next-intl';


type ErrorSkeletonProps = {
  header?: string
  message?: string
}

const ErrorSkeleton = ({ header, message }: ErrorSkeletonProps) => {
  const t = useTranslations()
  const defaultHeader = t('errors.header.default')
  const defaultMessage = t('errors.message.default')
  return (
    <div className="w-full h-screen flex items-center px-2 md:px-0">
      <article className="max-w-lg border-2 border-red-300 w-full text-center p-4 rounded-md mx-auto">
          <ExclamationCircleIcon className="w-10 h-10 mx-auto my-2" />
          <h3 className="font-bold mb-1">{header ? header: defaultHeader}</h3>
          <p>{message ? message: defaultMessage}</p>
      </article>
    </div>
  )
}

export default ErrorSkeleton