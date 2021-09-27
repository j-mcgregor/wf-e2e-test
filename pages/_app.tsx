import '../styles/globals.css';

import { Provider } from 'next-auth/client';
import { NextIntlProvider } from 'next-intl';
import { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

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
