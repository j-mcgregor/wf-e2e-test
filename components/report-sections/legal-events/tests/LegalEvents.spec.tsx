/* eslint-disable sonarjs/no-duplicate-string */
import { within } from '@testing-library/dom';
import * as nextRouter from 'next/router';
import React from 'react';

import allMessages from '../../../../messages/en';
import { render, screen } from '../../../../test-utils';
import LegalEvents from '../LegalEvents';

describe('LegalEvents', () => {
  beforeEach(() => {
    // @ts-ignore
    // eslint-disable-next-line no-import-assign
    nextRouter.useRouter = jest.fn().mockImplementation(() => ({}));
  });
  it('should render', () => {
    const props = {
      legalEvents: [
        {
          id: 1,
          date: '2013-10-25',
          description: 'LEGAL CHARGE',
          details: [
            {
              DateFullySatisfied: '20150422',
              DatePartiallySatisfied: 'null',
              PersonsEntitled: 'BANC OF AMERICA LEASING & CAPITAL LLC',
              AmountSecured: '0',
              MortgageDetails:
                'CONTAINS FIXED CHARGE.NOTIFICATION OF ADDITION TO OR AMENDMENT OF CHARGE.',
              MortgageDetailsFreeText: 'null',
              Class: 'LegalEventMortgageData'
            },
            {
              DateFullySatisfied: '20150416',
              DatePartiallySatisfied: 'null',
              PersonsEntitled: 'BANC OF AMERICA LEASING & CAPITAL LLC',
              AmountSecured: '0',
              MortgageDetails:
                'CONTAINS FIXED CHARGE.NOTIFICATION OF ADDITION TO OR AMENDMENT OF CHARGE.',
              MortgageDetailsFreeText: 'null',
              Class: 'LegalEventMortgageData'
            },
            {
              DateFullySatisfied: '20150514',
              DatePartiallySatisfied: 'null',
              PersonsEntitled:
                'LLOYDS BANK CORPORATE ASSET FINANCE (NO 4) LIMITED',
              AmountSecured: '0',
              MortgageDetails:
                'CONTAINS FIXED CHARGE.NOTIFICATION OF ADDITION TO OR AMENDMENT OF CHARGE.',
              MortgageDetailsFreeText: 'null',
              Class: 'LegalEventMortgageData'
            }
          ],
          types: ['Default', 'Charge/mortgage', 'Satisfied'],
          source: 'Companies House'
        }
      ],
      forPrint: true
    };
    render(<LegalEvents {...props} />, {}, allMessages);

    expect(
      within(screen.getByTestId('legal-row-testid')).getByText(
        props.legalEvents[0].description
      )
    );
    expect(
      within(screen.getByTestId('legal-row-testid')).getByText(
        props.legalEvents[0].date
      )
    );
    expect(
      within(screen.getByTestId('legal-row-testid')).getByText(
        props.legalEvents[0].types.join(', ')
      )
    );
    expect(
      within(
        screen.getByRole('button', {
          name: /all events/i
        })
      ).getByText(props.legalEvents.length)
    ).toBeInTheDocument();
    expect(
      within(
        screen.getByRole('button', {
          name: /charge/i
        })
      ).getByText(1)
    ).toBeInTheDocument();
    expect(
      within(
        screen.getByRole('button', {
          name: /negative events/i
        })
      ).getByText(0)
    ).toBeInTheDocument();
  });
});
