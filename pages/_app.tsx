import '../styles/globals.css';

import { Provider } from 'next-auth/client';
import { NextIntlProvider } from 'next-intl';
import { RecoilRoot } from 'recoil';
import { AppProps } from 'next/app';

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
