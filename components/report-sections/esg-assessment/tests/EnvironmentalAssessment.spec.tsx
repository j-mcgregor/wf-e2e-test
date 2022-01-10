import * as nextRouter from 'next/router';
import React from 'react';

import allMessages from '../../../../messages/en';
import { render, screen } from '../../../../test-utils';
import EnvironmentalAssessment from '../EnvironmentalAssessment';

describe('EnvironmentalAssessment', () => {
  beforeEach(() => {
    // @ts-ignore
    // eslint-disable-next-line no-import-assign
    nextRouter.useRouter = jest.fn().mockImplementation(() => ({}));
  });

  it('should render', () => {
    render(
      <EnvironmentalAssessment industry_string="Spaceforce" />,
      {},
      allMessages
    );

    expect(screen.getByText(/environmental/i)).toBeInTheDocument();
    expect(screen.getByText(/industry/i)).toBeInTheDocument();
    expect(screen.getByText(/spaceforce/i)).toBeInTheDocument();
  });
});
