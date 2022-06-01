/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  GENERIC_API_ERROR,
  USER_BAD_REQUEST
} from '../../../lib/utils/error-codes';
import { generatePassword } from '../../../lib/utils/generatePassword';
import { VALID_PASSWORD } from '../../../lib/utils/regexes';
import Button from '../../elements/Button';
import ErrorMessage from '../../elements/ErrorMessage';
import Input from '../../elements/Input';
import Link from '../../elements/Link';
import Logo from '../../elements/Logo';
import { PasswordValidation } from '../settings/PasswordValidation';

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
  const router = useRouter();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState({ type: '' });

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
    watch
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await fetch(`/api/password-reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: token || '',
          newPassword: data.newPassword
        })
      });
      const body = await res.json();

      if (body.is_error) {
        if (body.error === 'Invalid token') {
          return setSubmitError({ type: 'INVALID_TOKEN' });
        }
        if (body.error === USER_BAD_REQUEST) {
          return setSubmitError({ type: 'USER_BAD_REQUEST' });
        }
        return setSubmitError({ type: body.message });
      }

      if (body.ok) {
        return setFormSubmitted(true);
      }

      return setSubmitError({ type: GENERIC_API_ERROR });
    } catch (e) {
      // log the details of the error to the logger
      setSubmitError({ type: GENERIC_API_ERROR });
    }
  };

  console.log(submitError);

  const createPassword = () => {
    const generatedPassword = generatePassword();
    setValue('newPassword', generatedPassword);
    setValue('confirmPassword', generatedPassword);
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
            <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
              <p>{t('enter_new_password')}</p>
              <button
                type="button"
                className="text-xs text-orange-400 cursor-pointer hover:text-orange-200"
                onClick={() => createPassword()}
              >
                {t('generate_password')}
              </button>
              <div className="mt-6">
                <Input
                  {...register('newPassword', {
                    required: true,
                    minLength: 8,
                    validate: value =>
                      VALID_PASSWORD.test(value) ||
                      'Please check your new password is valid'
                  })}
                  type="password"
                  placeholder={`${t('placeholders.your_new_password')}`}
                  showEye
                />
                {errors.newPassword && (
                  <ErrorMessage text={t('valid_password_required')} />
                )}
                <PasswordValidation password={watch('newPassword')} />
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
                  showEye
                />
                {errors.confirmPassword?.type === 'sameAs' && (
                  <ErrorMessage text={t('errors.not_same')} />
                )}
                {errors.confirmPassword?.type === 'required' && (
                  <ErrorMessage text={t('errors.confirm_required')} />
                )}
              </div>
              {submitError.type === 'USER_BAD_REQUEST' && (
                <ErrorMessage text={t('USER_BAD_REQUEST')} />
              )}
              {submitError.type === GENERIC_API_ERROR && (
                <ErrorMessage text={t('errors.submit_error')} />
              )}
              {submitError.type === 'INVALID_TOKEN' && (
                <ErrorMessage text={t('errors.INVALID_TOKEN')} />
              )}
              <div className="mt-6">
                <Button
                  variant="highlight"
                  type="submit"
                  loading={isSubmitting}
                >
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
