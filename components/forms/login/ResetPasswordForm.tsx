import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { GENERIC_API_ERROR } from '../../../lib/utils/error-codes';

import Button from '../../elements/Button';
import ErrorMessage from '../../elements/ErrorMessage';
import Input from '../../elements/Input';
import Link from '../../elements/Link';
import Logo from '../../elements/Logo';
import { useRouter } from 'next/router';

type FormProps = {
  token?: string;
  isValid?: boolean;
};

type FormValues = {
  newPassword: string;
  confirmPassword: string;
};

const ResetPasswordForm = ({ token, isValid }: FormProps) => {
  const t = useTranslations();
  const router = useRouter()

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState({ type: '' });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await fetch(`/api/password-reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token,
          newPassword: data.newPassword
        })
      });
      const body = await res.json();

      if (res.ok) {
        return setFormSubmitted(true);
      }
      if (body.error) {
        return setSubmitError({ type: body.error });
      }
      return setSubmitError({ type: GENERIC_API_ERROR });
    } catch (e) {
      // log the details of the error to the logger
      return setSubmitError({ type: GENERIC_API_ERROR });
    }
  };

  return (
    <div className="mt-6">
      <div>
        <Logo />
        <h1 className="text-3xl font-bold py-3 my-2">{t('reset_password')}</h1>
        {!isValid && (
          <div>
            <p className="mb-2">{t('valid_link_required')}</p>
            <p className="mb-4">{t('go_to_forgotten_password')}</p>
            <Button variant="highlight" linkTo="/forgotten-password">
              {t('forgot_password')}
            </Button>
          </div>
        )}

        {formSubmitted && <p>{t('password_sent')}</p>}

        {!formSubmitted && isValid && (
          <>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <p>{t('enter_new_password')}</p>
              <div className="mt-6">
                <Input
                  {...register('newPassword', {
                    required: true,
                    minLength: 8
                  })}
                  type="password"
                  placeholder={`${t('placeholders.your_new_password')}`}
                />
                {errors.newPassword?.type === 'minLength' && (
                  <ErrorMessage text={t('errors.min_length')} />
                )}
                {errors.newPassword?.type === 'required' && (
                  <ErrorMessage text={t('errors.required')} />
                )}
              </div>

              <p>{t('confirm_new_password')}</p>
              <div className="mt-6">
                <Input
                  {...register('confirmPassword', {
                    required: true,
                    validate: {
                      sameAs: value => getValues('newPassword') === value
                    }
                  })}
                  type="password"
                  placeholder={`${t('placeholders.your_new_password')}`}
                />
                {errors.confirmPassword?.type === 'sameAs' && (
                  <ErrorMessage text={t('errors.not_same')} />
                )}
                {errors.confirmPassword?.type === 'required' && (
                  <ErrorMessage text={t('errors.required')} />
                )}
              </div>
              {submitError.type === GENERIC_API_ERROR && <ErrorMessage text={t('errors.submit_error')} />}
              <div className="mt-6">
                <Button variant="highlight" type="submit" loading={isSubmitting}>
                  {t('change_password')}
                </Button>
              </div>
            </form>
          </>
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

export default ResetPasswordForm;
