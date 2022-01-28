import * as nextRouter from 'next/router';
import React from 'react';

import allMessages from '../../../../messages/en';
import { render, screen } from '../../../../test-utils';
import EntityCard from '../../../cards/EntityCard';

describe('SubsidiaryCard', () => {
  beforeEach(() => {
    // @ts-ignore
    // eslint-disable-next-line no-import-assign
    nextRouter.useRouter = jest.fn().mockImplementation(() => ({}));
  });
  it('should render a card with a name', () => {
    render(<EntityCard name="pogo" />, {}, allMessages);

    expect(screen.getByText('pogo')).toBeInTheDocument();
  });
});
