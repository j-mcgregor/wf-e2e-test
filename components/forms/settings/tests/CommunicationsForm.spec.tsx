import { useSession } from 'next-auth/react';
import * as nextRouter from 'next/router';

import allMessages from '../../../../messages/en';
import { makeMockSession, render } from '../../../../test-utils';
import CommunicationForm from '../CommunicationForm';

jest.mock('next-auth/react');

// @ts-ignore
// eslint-disable-next-line no-import-assign
nextRouter.useRouter = jest.fn().mockImplementation(() => ({}));

describe.skip('CommunicationForm', () => {
  let mockSession: any;

  beforeEach(() => {
    mockSession = makeMockSession();

    (useSession as jest.Mock).mockReturnValue([mockSession, false]);
  });

  it('render the form without issue', () => {
    expect(() =>
      render(<CommunicationForm />, undefined, allMessages)
    ).not.toThrow();
  });
});
