import { useSession } from 'next-auth/react';
import * as nextRouter from 'next/router';

import allMessages from '../../../../messages/en';
import { makeMockSession, render } from '../../../../test-utils';
import PreferenceForm from '../PreferenceForm';

jest.mock('next-auth/react');

// @ts-ignore
// eslint-disable-next-line no-import-assign
nextRouter.useRouter = jest.fn().mockImplementation(() => ({}));

describe.skip('PreferenceForm', () => {
  let mockSession: any;

  beforeEach(() => {
    mockSession = makeMockSession();

    (useSession as jest.Mock).mockReturnValue([mockSession, false]);
  });

  it('render the form without issue', () => {
    expect(() =>
      render(<PreferenceForm />, undefined, allMessages)
    ).not.toThrow();
  });
});
