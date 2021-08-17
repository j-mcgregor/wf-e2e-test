import '../styles/globals.css';

import { NextIntlProvider } from 'next-intl';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <NextIntlProvider messages={pageProps.messages}>
        <Component {...pageProps} />
      </NextIntlProvider>
    </RecoilRoot>
  );
}

export default MyApp;
