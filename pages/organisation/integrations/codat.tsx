import {
  ArrowLeftIcon,
  CheckIcon,
  ExclamationIcon
} from '@heroicons/react/outline';
import { useTranslations } from 'next-intl';
import { GetStaticPropsContext } from 'next/types';
import React, { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import useSWR from 'swr';

import Button from '../../../components/elements/Button';
import Layout from '../../../components/layout/Layout';
import useUser from '../../../hooks/useUser';
import { fetcher } from '../../../lib/api-handler/fetcher';

const AddNewUserPage = () => {
  const t = useTranslations();
  const { register, handleSubmit, reset } = useForm();
  const user = useUser();

  const [header, setHeader] = useState('');

  const [loading, setLoading] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [error, setError] = React.useState(null);

  const { data: result } = useSWR(
    user?.user?.organisation_id &&
      `/api/integrations/codat-credentials?orgId=${user?.user?.organisation_id}`,
    fetcher
  );

  React.useEffect(() => {
    setHeader(result?.data?.auth_header);
  }, [result]);

  const onRemoveIntegration = async () => {
    setError(null);
    setLoading(true);
    const res = await fetch(
      user?.user?.organisation_id &&
        `/api/integrations/codat-credentials?orgId=${user?.user.organisation_id}`,
      {
        method: 'DELETE'
      }
    );
    const json = await res.json();
    setLoading(false);

    if (res.ok) {
      setShowSuccess(true);
      setLoading(false);
      return setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }

    setError(json.code);
  };

  const onSubmit = async (data: FieldValues) => {
    setError(null);
    setLoading(true);
    const res = await fetch(
      user?.user?.organisation_id &&
        `/api/integrations/codat-credentials?orgId=${user?.user.organisation_id}`,
      {
        method: 'PUT',
        body: JSON.stringify(data)
      }
    );
    const json = await res.json();
    setLoading(false);

    if (res.ok) {
      setShowSuccess(true);
      setLoading(false);
      return setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }

    setError(json.code);
  };

  return (
    <Layout adminRequired>
      <div className="h-10 flex items-center text-primary mb-3">
        <Button
          linkTo="/organisation"
          variant="none"
          newClassName="text-sm flex items-center hover:text-alt"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          {t('back_to_organisation')}
        </Button>
      </div>
      <div className="text-primary space-y-10">
        <div className="space-y-4 leading-relaxed">
          <h1 className="text-3xl font-semibold">{t('codat_page_title')}</h1>
          <p>{t('codat_page_description')}</p>
          <ol start={1} style={{ listStyleType: 'decimal' }} className="pl-12">
            <li>{t('codat_integration_step_1')}</li>
            <li>
              {t.rich('codat_integration_step_2', { b: bold => <b>{bold}</b> })}
            </li>
            <li>
              {t.rich('codat_integration_step_3', { b: bold => <b>{bold}</b> })}
            </li>
            <li>
              {t.rich('codat_integration_step_4', { b: bold => <b>{bold}</b> })}
            </li>
            <li>
              {t.rich('codat_integration_step_5', { b: bold => <b>{bold}</b> })}
            </li>
            <li>
              {t.rich('codat_integration_step_6', { b: bold => <b>{bold}</b> })}
            </li>
          </ol>
        </div>
        <form className="shadow" onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white py-7 px-5 space-y-4">
            <h2 className="text-xl font-semibold">
              {t('codat_add_auth_header_title')}
            </h2>
            <p className="text-gray-500">
              {t('codat_add_auth_header_description')}
            </p>
            <textarea
              className="w-full bg-gray-50 border-none h-52"
              placeholder={t('codat_auth_header_placeholder')}
              defaultValue={header}
              {...register('auth_header')}
            />
          </div>
          <div className="bg-gray-50 px-5 py-3 flex justify-between items-center w-full">
            <div className="grow">
              {showSuccess && (
                <div className="text-green-500 flex gap-2 items-center">
                  <CheckIcon className="h-5 w-5" />
                  <p>{t('codat_auth_header_success')}</p>
                </div>
              )}
              {error && (
                <div className="text-red-500 flex gap-2 items-center">
                  <ExclamationIcon className="h-5 w-5" />
                  <p>{t(error)}</p>
                </div>
              )}
            </div>
            <div className="flex gap-4">
              <div className="max-w-xs">
                <Button
                  type="button"
                  variant="none"
                  newClassName="shadow-0 h-10 text-xs"
                  onClick={() => {
                    setHeader('');
                    reset();
                    onRemoveIntegration();
                  }}
                >
                  {t('remove_integration_button')}
                </Button>
              </div>
              <div className="max-w-xs">
                <Button
                  variant="alt"
                  loading={loading}
                  className="max-w-[160px]"
                >
                  {t('add_integration_button')}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddNewUserPage;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        // You can get the messages from anywhere you like, but the recommended
        // pattern is to put them in JSON files separated by language and read
        // the desired one based on the `locale` received from Next.js.
        ...require(`../../../messages/${locale}/organisation.${locale}.json`),
        ...require(`../../../messages/${locale}/general.${locale}.json`),
        ...require(`../../../messages/${locale}/errors.${locale}.json`),
        ...require(`../../../messages/${locale}/toasts.${locale}.json`)
      }
    }
  };
}
