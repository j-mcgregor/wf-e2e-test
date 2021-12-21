/* eslint-disable security/detect-object-injection */
/* eslint-disable security/detect-non-literal-regexp */
import * as nextRouter from 'next/router';
import React from 'react';
import { toTitleCase } from '../../../../lib/utils/text-helpers';

import allMessages from '../../../../messages/en';
import { render, screen, within } from '../../../../test-utils';
import ShareHolderList from '../ShareHolderList';

describe('ShareHolderList', () => {
  beforeEach(() => {
    // @ts-ignore
    // eslint-disable-next-line no-import-assign
    nextRouter.useRouter = jest.fn().mockImplementation(() => ({}));
  });

  it('should render', () => {
    const props = {
      shareholders: [
        {
          first_name: 'Bugs',
          last_name: 'Bunny',
          name: 'Loony Toon 1',
          peps_sanctions_enforcements: true
        },
        {
          first_name: 'Lola',
          last_name: 'Bunny',
          name: 'Loony Toon 2',
          peps_sanctions_enforcements: true
        },
        {
          first_name: 'Daffy',
          last_name: 'Duck',
          name: 'Loony Toon 3',
          peps_sanctions_enforcements: true
        }
      ]
    };
    render(
      <ShareHolderList shareholders={props.shareholders} />,
      {},
      allMessages
    );

    const cards = within(
      screen.getByTestId('corp-shareholder-section-testid')
    ).queryAllByTestId('shareholder-card-testid');

    expect(cards.length).toBe(props.shareholders.length);

    cards.forEach((card, i) => {
      expect(
        within(card).getByText(
          new RegExp(props.shareholders[i].first_name, 'i')
        )
      ).toBeInTheDocument();
      expect(
        within(card).getByText(new RegExp(props.shareholders[i].last_name, 'i'))
      ).toBeInTheDocument();

      const fullName = `${toTitleCase(
        props.shareholders[i].first_name || ''
      )} ${toTitleCase(props.shareholders[i].last_name || '')}`;

      const linkedInLink = `https://www.linkedin.com/search/results/all/?keywords=${props.shareholders[i].name}`;

      if (fullName) {
        expect(within(card).getByRole('link')).toBeInTheDocument();
        expect(within(card).getByRole('link')).toHaveAttribute(
          'href',
          linkedInLink
        );

        expect(within(card).getByTestId('icon-linkedin')).toBeInTheDocument();
      }
    });
  });
});
