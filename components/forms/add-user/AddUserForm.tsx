import { useTranslations } from 'next-intl';
import React from 'react';
import Button from '../../elements/Button';
import Input from '../../elements/Input';

const AddNewUserForm = () => {
  const t = useTranslations();
  const [role, setRole] = React.useState('User');

  return (
    <>
      <div className="bg-white shadow">
        <div className="p-5">
          <h2 className="text-xl font-semibold">{t('new_user_form_title')}</h2>
          <p className="text-gray-500">{t('new_user_form_description')}</p>
        </div>
        <form className="space-y-4">
          <div className="p-5">
            <div className="flex flex-col-reverse md:flex-row justify-between gap-4">
              <div className="w-96">
                <Input label="Full name *" type="text" />
              </div>
              <div>
                <label className="block text-sm font-medium">Role</label>
                <div className="flex w-52 my-2 h-9">
                  <Button
                    variant="alt"
                    newClassName={`${
                      role === 'User' ? 'bg-alt text-white' : ''
                    } rounded-l-md w-full border-[1px] border-r-[1px] border-primary`}
                    onClick={() => setRole('User')}
                    type="button"
                  >
                    User
                  </Button>
                  <Button
                    variant="highlight"
                    newClassName={`${
                      role === 'Admin' ? 'bg-highlight text-white ' : ''
                    } rounded-r-md w-full border-[1px] border-l-0 border-primary`}
                    onClick={() => setRole('Admin')}
                    type="button"
                  >
                    Admin
                  </Button>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <Input label="Email *" type="email" />
            </div>
          </div>
          <div className="bg-gray-50 p-5">
            <Button
              variant="alt"
              newClassName="w-max bg-alt text-white py-2 px-8"
            >
              Add new user
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNewUserForm;
