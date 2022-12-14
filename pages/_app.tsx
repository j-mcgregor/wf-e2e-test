// uncomment below to engage why did you render
// import '../lib/wdyr.ts'
import '../styles/globals.css';

import memoize from 'lodash/memoize';
import { SessionProvider } from 'next-auth/react';
import { IntlError, NextIntlProvider } from 'next-intl';
import { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import useFullStory from '../hooks/useFullstory';
import { ToastContainer } from '../components/toast/ToastContainer';
import 'react-toastify/dist/ReactToastify.css';

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
  useFullStory();
  return (
    <RecoilRoot>
      <SessionProvider session={pageProps.session}>
        <NextIntlProvider
          messages={pageProps.messages || {}}
          onError={(_: IntlError) => null}
        >
          <Component {...pageProps} />
        </NextIntlProvider>
      </SessionProvider>
      <ToastContainer />
    </RecoilRoot>
  );
}

export default MyApp;
