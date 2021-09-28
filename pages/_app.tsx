import '../styles/globals.css';

import { Provider } from 'next-auth/client';
import { NextIntlProvider } from 'next-intl';
import { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import  memoize from 'lodash/memoize';

// ignore in-browser next/js recoil warnings until its fixed.
const mutedConsole = memoize((console) => ({
  ...console,
  warn: (...args: any) => args[0].includes('Duplicate atom key')
    ? null
    : console.warn(...args)
}))
global.console = mutedConsole(global.console);

if (process.env.NODE_ENV !== 'production') {
  require('../__mocks__/service-worker/index');
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Provider session={pageProps.session}>
        <NextIntlProvider messages={pageProps.messages}>
          <Component {...pageProps} />
        </NextIntlProvider>
      </Provider>
    </RecoilRoot>
  );
}

export default MyApp;
