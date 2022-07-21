// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn:
      SENTRY_DSN ||
      'https://1570e51fee894af7a30df4019d41d0f7@o1006047.ingest.sentry.io/5966515',
    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: 0.2,
    environment:
      process.env.NEXT_PUBLIC_GIT_BRANCH === 'main'
        ? 'production'
        : process.env.NEXT_PUBLIC_GIT_BRANCH === 'prerelease'
        ? 'staging'
        : process.env.NEXT_PUBLIC_GIT_BRANCH === 'development'
        ? 'development'
        : 'local'
    // Note: if you want to override the automatic release value, do not set a
    // `release` value here - use the environment variable `SENTRY_RELEASE`, so
    // that it will also get attached to your source maps
  });
}
