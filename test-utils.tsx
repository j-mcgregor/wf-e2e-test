import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'next-auth/client';
import { NextIntlProvider } from 'next-intl';
import React, { FC, ReactElement } from 'react';
import { RecoilRoot } from 'recoil';

import messages from './messages/en';

const Providers: FC = ({ children }) => {
  return (
    <RecoilRoot>
      <NextIntlProvider messages={messages} locale="en">
        {children}
      </NextIntlProvider>
    </RecoilRoot>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: Providers, ...options });

export * from '@testing-library/react';
export { customRender as render };
