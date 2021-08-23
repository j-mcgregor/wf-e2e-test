import '../styles/globals.css';

import { Provider } from 'next-auth/client';
import { NextIntlProvider } from 'next-intl';
import { RecoilRoot } from 'recoil';

// react-time-ago package :
// https://www.npmjs.com/package/react-time-ago
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import ru from 'javascript-time-ago/locale/ru';
TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

function MyApp({ Component, pageProps }) {
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
