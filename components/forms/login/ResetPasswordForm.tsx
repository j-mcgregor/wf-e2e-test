import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from '../../elements/Button';
import ErrorMessage from '../../elements/ErrorMessage';
import Input from '../../elements/Input';
import Link from '../../elements/Link';
import Logo from '../../elements/Logo';

type FormProps = {
  email?: string;
  isValid?: boolean;
};

type FormValues = {
  newPassword: string;
  confirmPassword: string;
};

const ResetPasswordForm = ({ email, isValid }: FormProps) => {
  const t = useTranslations();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      const req = await fetch(`/api/password-reset?email=${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...data
        })
      });

      if (req.ok) {
        return setFormSubmitted(true);
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
        <h1 className="text-3xl font-bold py-3 my-2">{t('reset password')}</h1>
        {!isValid && (
          <div>
            <p className="mb-2">{t('valid link required')}</p>
            <p className="mb-4">{t('go to forgotten password')}</p>
            <Button variant="highlight" linkTo="/forgot-password">
              {t('forgot password')}
            </Button>
          </div>
        )}

        {formSubmitted && <p>{t('password sent')}</p>}

        {!formSubmitted && isValid && (
          <>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <p>{t('enter new password')}</p>
              <div className="mt-6">
                <Input
                  {...register('newPassword', {
                    required: true,
                    minLength: 8
                  })}
                  type="password"
                  placeholder={`${t('placeholders.your new password')}`}
                />
                {errors.newPassword?.type === 'minLength' && (
                  <ErrorMessage text={t('errors.min length')} />
                )}
                {errors.newPassword?.type === 'required' && (
                  <ErrorMessage text={t('errors.required')} />
                )}
              </div>

              <p>{t('confirm new password')}</p>
              <div className="mt-6">
                <Input
                  {...register('confirmPassword', {
                    required: true,
                    validate: {
                      sameAs: value => getValues('newPassword') === value
                    }
                  })}
                  type="password"
                  placeholder={`${t('placeholders.your new password')}`}
                />
                {errors.confirmPassword?.type === 'sameAs' && (
                  <ErrorMessage text={t('errors.not same')} />
                )}
                {errors.confirmPassword?.type === 'required' && (
                  <ErrorMessage text={t('errors.required')} />
                )}
              </div>
              {submitError && <ErrorMessage text={t('errors.submit error')} />}
              <div className="mt-6">
                <Button variant="highlight" type="submit">
                  {t('change password')}
                </Button>
              </div>
            </form>
          </>
        )}
      </div>

      <div className="w-full text-center mt-8 text-highlight hover:text-yellow-500 text-sm">
        <Link linkTo="/login">
          <p>{t('back to login')}</p>
        </Link>
      </div>
    </div>
  );
};

export default ResetPasswordForm;