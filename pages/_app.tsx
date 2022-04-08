// uncomment below to engage why did you render
// import '../lib/wdyr.ts'
import '../styles/globals.css';

import memoize from 'lodash/memoize';
import { SessionProvider } from 'next-auth/react';
import { NextIntlProvider } from 'next-intl';
import { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import useFullstory from '../hooks/useFullstory';

// ignore in-browser next/js recoil warnings until its fixed.
const mutedConsole = memoize(console => ({
  ...console,
  warn: (...args: any) =>
    args[0].includes('Duplicate atom key') ? null : console.warn(...args)
}));
global.console = mutedConsole(global.console);

if (
  process.env.NODE_ENV !== 'production' &&
  process.env.NODE_ENV !== 'development'
) {
  require('../__mocks__/service-worker/index');
}

function MyApp({ Component, pageProps }: AppProps) {
  useFullstory();

  return (
    <RecoilRoot>
      <SessionProvider session={pageProps.session}>
        <NextIntlProvider messages={pageProps.messages || {}}>
          <Component {...pageProps} />
        </NextIntlProvider>
      </SessionProvider>
    </RecoilRoot>
  );
}

export default MyApp;
