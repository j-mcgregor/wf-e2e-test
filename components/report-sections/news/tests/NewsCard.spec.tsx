/* eslint-disable security/detect-object-injection */
import * as nextRouter from 'next/router';
import React from 'react';

import allMessages from '../../../../messages/en';
import { render, screen } from '../../../../test-utils';
import NewsItem from '../NewsCard';

describe('NewsCard', () => {
  beforeEach(() => {
    // @ts-ignore
    // eslint-disable-next-line no-import-assign
    nextRouter.useRouter = jest.fn().mockImplementation(() => ({}));
  });
  it('should render', () => {
    const props = {
      publication: 'Loony Toons Publishing Inc.',
      title: 'Whats up Doc',
      description: 'Lorem',
      link: 'http://some-link.com',
      date: new Date('2021-12-25T12:00:00').toDateString()
    };

    render(<NewsItem {...props} />, {}, allMessages);

    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByText(props.publication)).toBeInTheDocument();
    expect(screen.getByText(props.description)).toBeInTheDocument();
    expect(
      screen.getByRole('link', {
        name: props.link
      })
    ).toBeInTheDocument();
    expect(screen.getByText(/25\/12\/2021/i)).toBeInTheDocument();
  });
});
