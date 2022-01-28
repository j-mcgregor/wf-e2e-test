/* eslint-disable security/detect-non-literal-regexp */
import { within } from '@testing-library/react';
import * as nextRouter from 'next/router';
import React from 'react';
import { mockSubsidiaries } from '../../../../lib/mock-data/subsidiaries';

import allMessages from '../../../../messages/en';
import { render, screen } from '../../../../test-utils';
import { SubsidiaryList } from '../SubsidiaryList';

describe('SubsidiaryList', () => {
  beforeEach(() => {
    // @ts-ignore
    // eslint-disable-next-line no-import-assign
    nextRouter.useRouter = jest.fn().mockImplementation(() => ({}));
  });

  it('should render all subsidiaries passed to it as cards', () => {
    render(<SubsidiaryList subsidiaries={mockSubsidiaries} />, {}, allMessages);

    const cards = screen.getAllByRole('listbox');

    expect(screen.queryByText('Aladdin')).toBeNull();
    expect(cards.length).toBe(4);

    cards.forEach((card, i) => {
      expect(
        within(card).getByText(new RegExp(`subsidiary ${i + 1} ltd`, 'i'))
      ).toBeInTheDocument();
    });
  });

  it('should render the placeholder if no subsidiaries are present', () => {
    render(<SubsidiaryList subsidiaries={[]} />, {}, allMessages);
    expect(
      screen.getByText(/this company has no subsidiaries\./i)
    ).toBeInTheDocument();
    expect(screen.queryAllByRole('listbox').length).toBe(0);
  });
});
