import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { validEmailRegex } from '../../../lib/utils/regexes';
import Button from '../../elements/Button';
import ErrorMessage from '../../elements/ErrorMessage';
import Input from '../../elements/Input';
import Link from '../../elements/Link';
import Logo from '../../elements/Logo';
import config from '../../../config';
import { GENERIC_API_ERROR } from '../../../lib/utils/error-codes';

type FormValues = {
  email: string;
};

const ForgotPasswordForm = () => {
  const t = useTranslations();

  const [submittedState, setSubmittedState] = useState(false);
  const [submitError, setSubmitError] = useState({ type: '' });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      // absolute URLs necessary for tests
      const res = await fetch(`${config.URL}/api/password-reset?email=${data.email}`);

      const body = await res.json();

      if (res.ok) {
        return setSubmittedState(true);
      }
      if (body.error) {
        return setSubmitError({ type: body.error});
      }
      return setSubmitError({ type: GENERIC_API_ERROR})
    } catch (e) {
      // log the details of the error to the logger
      return setSubmitError({ type: GENERIC_API_ERROR});
    }
  };

  return (
    <div className="mt-6">
      <div>
        <Logo />
        <h1 className="text-3xl font-bold py-3 my-2">
          {t('forgotten_password')}
        </h1>
        {!submittedState ? (
          <>
            <form
              className="space-y-6"
              onSubmit={handleSubmit(onSubmit)}
              data-testid="forgot-password-form"
            >
              <p>{t('enter_email')}</p>
              <div className="mt-6">
                <Input
                  {...register('email', {
                    required: true,
                    pattern: validEmailRegex
                  })}
                  type="email"
                  label={`${t('email_address')}`}
                  placeholder={`${t('placeholders.email')}`}
                />

                {errors.email?.type === 'required' && (
                  <ErrorMessage text={t('EMAIL_REQUIRED')} />
                )}
                {errors.email?.type === 'pattern' && (
                  <ErrorMessage text={t('VALID_EMAIL_REQUIRED')} />
                )}
                {submitError.type && (
                  <ErrorMessage text={t('GENERIC_API_ERROR')} />
                )}
              </div>
              <div className="mt-6">
                <Button variant="highlight" type="submit" loading={isSubmitting}>
                  {t('reset_password')}
                </Button>
              </div>
            </form>
          </>
        ) : (
          <p>{t('if_email_exists')}</p>
        )}
      </div>

      <div className="w-full text-center mt-8 text-highlight hover:text-yellow-500 text-sm">
        <Link linkTo="/login">
          <p>{t('back_to_login')}</p>
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
