import { useRouter } from 'next/router';
import { signIn } from 'next-auth/client';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import useLocalStorage from '../../hooks/useLocalStorage';
import Link from '../elements/Link';
import Button from '../elements/Button';

type FormValues = {
  email: string;
  password: string;
  remember: boolean;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    getValues,
    formState: { errors }
  } = useForm<FormValues>();

  const [activeUser, setActiveUser] = useLocalStorage<string | null>(
    'user',
    null
  );
  const t = useTranslations();

  // only runs if form is valid
  const onSubmit = handleSubmit(data => {
    signIn('credentials', {
      email: getValues('email'),
      password: getValues('password')
    });
    data.remember && setActiveUser(data.email);
  });

  // regex to validate email address
  const validEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // variables for conditionally rendering styles for input focus when errors
  const validFocus = 'focus:ring-highlight focus:border-highlight';
  const errorFocus = 'focus:ring-red-400 focus:border-red-400';

  return (
    <div>
      <div className="mt-8">
        <div>
          <div className="mt-6 relative flex items-center">
            <div className="sm:w-full w-1/4 border-t border-white" />

            <div className="relative flex justify-center text-sm w-full text-center">
              <span className="px-2">{t('continue with')}</span>
            </div>
            <div className="sm:w-full w-1/4 border-t border-white" />
          </div>
        </div>

        <div className="mt-6">
          <form className="space-y-6" onSubmit={onSubmit} noValidate>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                {t('email')}
              </label>

              {/* inputs need breaking out into own components - WIP */}
              <input
                {...register('email', {
                  required: true,
                  pattern: validEmail
                })}
                onChange={() => clearErrors('email')}
                type="email"
                placeholder="Email"
                // render error styles if input name has an error object associated with it
                className={`${
                  errors?.email ? errorFocus : validFocus
                } appearance-none block w-full px-3 py-2 my-2 rounded-md focus:outline-none placeholder-gray-40 sm:text-sm text-black`}
              />
              {errors.email?.type === 'required' && (
                <p className="text-sm text-red-400">
                  Email address is required
                </p>
              )}
              {errors.email?.type === 'pattern' && (
                <p className="text-sm text-red-400">
                  Please enter a valid email
                </p>
              )}
              <label htmlFor="password" className="block text-sm font-medium">
                {t('password')}
              </label>
              <input
                {...register('password', { required: true })}
                onChange={() => clearErrors('password')}
                type="password"
                placeholder="Password"
                className={`${
                  errors.password ? errorFocus : validFocus
                } appearance-none block w-full px-3 py-2 my-2 rounded-md focus:outline-none placeholder-gray-400 sm:text-sm text-black`}
              />
              {errors.password?.type === 'required' && (
                <p className="text-sm text-red-400">Password is required</p>
              )}
            </div>

            <div className="flex items-center justify-between text-left">
              <div className="flex items-center w-full sm:w-auto">
                <input
                  {...register('remember')}
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 text-highlight focus:ring-highlight rounded cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm">
                  {t('remember me')}
                </label>
              </div>

              <div className="text-sm ">
                <Link
                  linkTo="/forgotten-password"
                  className="font-medium text-highlight hover:text-yellow-500"
                >
                  {t('forgot password')}
                </Link>
              </div>
            </div>

            <div>
              {/* Button component might need changing or replacing soon */}
              {/* onClick runs signIn function from next-auth with credentials from form  */}
              <Button>{t('sign in')}</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
