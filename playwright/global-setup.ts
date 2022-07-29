// global-setup.ts
import { FullConfig } from '@playwright/test';
import { WiserfundingE2E } from './playwright-helpers';

async function globalSetup(config: FullConfig) {
  await WiserfundingE2E.login(config);
}

export default globalSetup;
