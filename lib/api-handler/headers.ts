import config from '../../config';
import packageJson from '../../package.json';

export const environmentHeaders = {
  platform_env: config.WF_ENV, // production, staging or development
  platform_version: packageJson.version,
  platform_git_sha: `${process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA}` // commit identifier
};

export const defaultHeaders = {
  'Content-Type': 'application/json',
  // For optimum security the Cache-Control header should prevent
  // caching by downstream devices and the client itself, this
  // can be achieved by configuring the following HTTP header
  'Cache-Control': 'no-cache, no-store',
  ...environmentHeaders
};
