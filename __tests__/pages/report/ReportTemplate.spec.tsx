/* eslint-disable no-import-assign */
/* eslint-disable security/detect-non-literal-regexp */
/* eslint-disable security/detect-object-injection */
/* eslint-disable sonarjs/no-duplicate-string */
import { useSession } from 'next-auth/react';
import * as nextRouter from 'next/router';

import allMessages from '../../../messages/en';
import ReportTemplate from '../../../pages/report/[id]';
import {
  makeMockSession,
  render,
  screen,
  waitForElementToBeRemoved
} from '../../../test-utils';

jest.mock('next-auth/react');
// @ts-ignore
nextRouter.useRouter = jest.fn().mockImplementation(() => ({
  query: {
    id: 35
  },
  prefetch: jest.fn().mockReturnValue({
    catch: jest.fn()
  }),
  asPath: ''
}));

xdescribe('ReportTemplate', () => {
  let mockSession: any;

  beforeEach(() => {
    mockSession = makeMockSession();

    (useSession as jest.Mock).mockReturnValue([mockSession, false]);
  });

  it('should render', async () => {
    render(<ReportTemplate />, undefined, allMessages);

    const skeleton = screen.queryByTestId('skeleton-report');
    await waitForElementToBeRemoved(skeleton);

    screen.logTestingPlaygroundURL();
  });
});
