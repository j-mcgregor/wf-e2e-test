import { useTranslations } from 'next-intl';
import Link from '../elements/Link';
import Logo from '../elements/Logo';
import TextInput from '../elements/TextInput';
import Button from '../elements/Button';

const ForgotPasswordForm = () => {
  const t = useTranslations();
  return (
    <form action="#" method="POST" className="space-y-6">
      <div>
        <Logo />
        <h1 className="text-3xl font-bold py-3 my-2">
          {t('forgotten password')}
        </h1>
        <p>{t('enter email')}</p>
        <div className="mt-6">
          <TextInput
            label={t('email address')}
            inputId="email"
            inputName="email"
            inputType="email"
            autoComplete="email"
            isRequired
          />
        </div>
      </div>
      <div>
        <Link linkTo="#">
          <Button
            buttonType="submit"
            backgroundColor="highlight"
            hoverColor="yellow-500"
            focusColor="yellow-500"
          >
            {t('sign in')}
          </Button>
        </Link>
      </div>

      <div className="w-full text-center mt-8 text-highlight hover:text-yellow-500 text-sm">
        <Link linkTo="/login">
          <p>{t('back to login')}</p>
        </Link>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
