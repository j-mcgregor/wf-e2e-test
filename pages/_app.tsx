import '../styles/globals.css';

import { Provider } from 'next-auth/client';
import { IntlErrorCode, NextIntlProvider } from 'next-intl';
import { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

// function onError(error: any) {
//   if (error.code === IntlErrorCode.MISSING_MESSAGE) {
//     // Missing translations are expected and should only log an error
//     console.error(error);
//   } else {
//     // Other errors indicate a bug in the app and should be reported
//     console.log(error);
//   }
// }

// function getMessageFallback({ namespace, key, error }: any) {
//   const path = [namespace, key].filter(part => part != null).join('.');

//   if (error.code === IntlErrorCode.MISSING_MESSAGE) {
//     return `${path} is not yet translated`;
//   } else {
//     return `Dear developer, please fix this message: ${path}`;
//   }
// }

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Provider session={pageProps.session}>
        <NextIntlProvider
          messages={pageProps.messages}
          // onError={onError}
          // getMessageFallback={getMessageFallback}
        >
          <Component {...pageProps} />
        </NextIntlProvider>
      </Provider>
    </RecoilRoot>
  );
}

export default MyApp;
