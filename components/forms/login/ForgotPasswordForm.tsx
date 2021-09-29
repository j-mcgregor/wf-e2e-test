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

type FormValues = {
  email: string;
};

const ForgotPasswordForm = () => {
  const t = useTranslations();

  const [submittedState, setSubmittedState] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      // absolute URLs necessary for tests
      const res = await fetch(`${config.URL}/api/password-reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...data
        })
      });

      const d = await res.json();

      if (res.ok) {
        return setSubmittedState(true);
      }

      return setSubmitError(true);
    } catch (e) {
      // log the details of the error to the logger

      return setSubmitError(true);
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
                  <ErrorMessage text={t('errors.email_required')} />
                )}
                {errors.email?.type === 'pattern' && (
                  <ErrorMessage text={t('errors.valid_email')} />
                )}
                {submitError && (
                  <ErrorMessage text={t('errors.submit_error')} />
                )}
              </div>
              <div className="mt-6">
                <Button variant="highlight" type="submit">
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
