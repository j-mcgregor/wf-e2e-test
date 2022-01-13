import * as nextRouter from 'next/router';
import React from 'react';

import allMessages from '../../../../messages/en';
import { render, screen } from '../../../../test-utils';
import { SubsidiaryCard } from '../SubsidiaryCard';

describe('SubsidiaryCard', () => {
  beforeEach(() => {
    // @ts-ignore
    // eslint-disable-next-line no-import-assign
    nextRouter.useRouter = jest.fn().mockImplementation(() => ({}));
  });
  it('should render a card with a name', () => {
    render(<SubsidiaryCard name="pogo" />, {}, allMessages);

    expect(screen.getByText('pogo')).toBeInTheDocument();
  });
});
