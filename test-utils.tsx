import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useSession } from 'next-auth/react';
import { NextIntlProvider } from 'next-intl';
import React, { ReactElement } from 'react';
import { RecoilRoot } from 'recoil';
import { SWRConfig } from 'swr';

import { mockReports } from './lib/mock-data/users';
import { IntlMessages } from './types/global';

const makeProviders =
  (messages?: IntlMessages) =>
  // eslint-disable-next-line react/display-name
  ({ children }: { children?: React.ReactNode }) => {
    return (
      <RecoilRoot>
        <NextIntlProvider messages={messages} locale="en">
          <SWRConfig value={{ dedupingInterval: 0 }}>{children}</SWRConfig>
        </NextIntlProvider>
      </RecoilRoot>
    );
  };

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
  messages?: IntlMessages
) => render(ui, { wrapper: makeProviders(messages), ...options });

const makeMockSession = (): ReturnType<typeof useSession> => {
  return {
    data: {
      user: {
        name: 'John Doe',
        email: 'test@test.com',
        image: ''
      },
      expires: '2021-10-09T09:00:41.059Z'
    },
    status: 'authenticated'
  };
};

export * from '@testing-library/react';
export { customRender as render, makeMockSession, userEvent };
