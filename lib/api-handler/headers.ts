import config from '../../config';
import packageJson from '../../package.json';

export const environmentHeaders = {
  'Platform-Env': config.WF_ENV, // production, release or development
  'Platform-Version': packageJson.version,
  'Platform-Git-SHA': `${process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA}` // commit identifier
};

export const defaultHeaders = {
  'Content-Type': 'application/json',
  ...environmentHeaders
};
