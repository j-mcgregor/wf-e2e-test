/* eslint-disable no-import-assign */
/* eslint-disable security/detect-non-literal-regexp */
/* eslint-disable security/detect-object-injection */
/* eslint-disable sonarjs/no-duplicate-string */
import React from 'react';

import allMessages from '../../../../messages/en';
import {
  makeMockSession,
  render,
  screen,
  within
} from '../../../../test-utils';
import NewsFeed from '../NewsFeed';
import * as nextRouter from 'next/router';
import { useSession } from 'next-auth/react';
import { waitForElementToBeRemoved } from '@testing-library/dom';

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

describe('NewsFeed', () => {
  let mockSession: any;

  beforeEach(() => {
    mockSession = makeMockSession();

    (useSession as jest.Mock).mockReturnValue([mockSession, false]);
  });

  it.skip('should render', async () => {
    render(
      <NewsFeed companyName="Loony Tunes Inc." items={[{}, {}, {}, {}]} />,
      {},
      allMessages
    );

    // await waitForElementToBeRemoved(
    //   screen.getByRole('heading', {
    //     name: /error fetching news/i
    //   })
    // );

    const cards = screen.queryAllByTestId('news-card-testid');

    expect(cards.length).toBe(4);

    cards.forEach((card, i) => {
      expect(within(card).getByText(`source ${i}`)).toBeInTheDocument();
      expect(within(card).getByText(`title ${i}`)).toBeInTheDocument();
      expect(within(card).getByText(`content ${i}`)).toBeInTheDocument();
      expect(
        within(card).getByRole('link', {
          name: `http://url.com/${i}`
        })
      ).toBeInTheDocument();
    });
  });
});
