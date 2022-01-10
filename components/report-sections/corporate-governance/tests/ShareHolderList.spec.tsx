/* eslint-disable sonarjs/no-duplicate-string */
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
          id: 'US*110178163812',
          name: 'MR EDWARD ALTMAN',
          salutation: 'MR',
          first_name: 'EDWARD',
          last_name: 'ALTMAN',
          uci: 'P458378198',
          country: 'US',
          type: 'One or more named individuals or families',
          percentage: 0,
          information_date: '04/2021',
          is_liability: false,
          also_a_manager: 'Not a manager',
          is_beneficially_held: false,
          peps_sanctions_enforcements: false
        },
        {
          id: 'IT*110178163813',
          name: 'MS GABRIELLE SABATO',
          salutation: 'MS',
          first_name: 'GABRIELLE',
          last_name: 'SABATO',
          uci: 'P340226916',
          country: 'IT',
          type: 'One or more named individuals or families',
          percentage: 0,
          information_date: '04/2021',
          is_liability: false,
          also_a_manager: 'Current manager',
          is_beneficially_held: false,
          peps_sanctions_enforcements: false
        },
        {
          id: 'YY*110140286489',
          name: 'BRAIN & CO SRL',
          salutation: null,
          first_name: null,
          last_name: null,
          uci: null,
          country: 'n.a.',
          type: 'Corporate',
          percentage: 0,
          information_date: '04/2021',
          is_liability: false,
          also_a_manager: 'Not a manager',
          is_beneficially_held: false,
          peps_sanctions_enforcements: false
        }
      ]
    };

    const expectedLinkedIn = [
      'https://www.linkedin.com/search/results/all/?keywords=Edward Altman',
      'https://www.linkedin.com/search/results/all/?keywords=Gabrielle Sabato'
    ];
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
      if (
        props.shareholders[i].type ===
        'One or more named individuals or families'
      ) {
        expect(
          within(card).getByText(
            // @ts-ignore
            new RegExp(props.shareholders[i].first_name, 'i')
          )
        ).toBeInTheDocument();
        expect(
          within(card).getByText(
            // @ts-ignore
            new RegExp(props.shareholders[i].last_name, 'i')
          )
        ).toBeInTheDocument();

        const fullName = `${toTitleCase(
          props.shareholders[i].first_name || ''
        )} ${toTitleCase(props.shareholders[i].last_name || '')}`;

        if (fullName) {
          expect(within(card).getByRole('link')).toBeInTheDocument();
          expect(within(card).getByRole('link')).toHaveAttribute(
            'href',
            expectedLinkedIn[i]
          );

          expect(within(card).getByTestId('icon-linkedin')).toBeInTheDocument();
        }
      } else {
        expect(
          within(card).getByText(
            // @ts-ignore
            new RegExp(props.shareholders[i].name, 'i')
          )
        ).toBeInTheDocument();
        expect(within(card).queryByRole('link')).toBeNull();
      }
    });
  });
});
