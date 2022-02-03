/**
 * THIS IS A VERY BASIC TEST SUITE SETUP.
 * IT ONLY TESTS THE COMPONENT DOESN'T THROW WHEN RENDERING.
 * MORE TESTS SHOULD BE ADDED BY DEVS AS THE PROJECT GROWS.
 * REMOVE THIS NOTE WHEN MORE TESTS ARE ADDED.
 */
import { useSession } from 'next-auth/react';
import * as nextRouter from 'next/router';

import allMessages from '../../../messages/en';
import { makeMockSession, render } from '../../../test-utils';
import LinkCard from '../LinkCard';

jest.mock('next-auth/react');

describe('LinkCard', () => {
  let mockSession: any;

  beforeEach(() => {
    mockSession = makeMockSession();

    // @ts-ignore
    // eslint-disable-next-line no-import-assign
    nextRouter.useRouter = jest.fn().mockImplementation(() => ({}));
    (useSession as jest.Mock).mockReturnValue([mockSession, false]);
  });

  it('render the LinkCard without issue', () => {
    expect(() =>
      render(
        <LinkCard
          icon={<svg />}
          iconColor="blue"
          header="some header"
          description="some description"
          linkTo="/"
          className="classy"
        />,
        {},
        allMessages
      )
    ).not.toThrow();
  });
});
