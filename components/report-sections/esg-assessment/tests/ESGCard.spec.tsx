import * as nextRouter from 'next/router';
import React from 'react';

import allMessages from '../../../../messages/en';
import { render, screen } from '../../../../test-utils';
import ESGCard from '../ESGCard';

describe('ESG', () => {
  beforeEach(() => {
    // @ts-ignore
    // eslint-disable-next-line no-import-assign
    nextRouter.useRouter = jest.fn().mockImplementation(() => ({}));
  });
  it.skip('should render', () => {
    const props = {
      description: 'some description',
      rating: 10,
      result: 'some result',
      results: [
        { name: 'result 1', score: 0.1 },
        { name: 'result 2', score: 0.2 }
      ],
      resultText: 'some text',
      title: 'some title'
    };
    render(<ESGCard {...props} />, {}, allMessages);
    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByText(props.description)).toBeInTheDocument();
    expect(screen.getByText(props.resultText)).toBeInTheDocument();
    expect(screen.getByText(props.rating)).toBeInTheDocument();

    const lis = screen.queryAllByRole('listitem');

    expect(lis[0].textContent).toContain('result 1 10.0%');
    expect(lis[1].textContent).toContain('result 2 20.0%');
  });
});
