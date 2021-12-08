import * as nextRouter from 'next/router';
import React from 'react';

import allMessages from '../../../../messages/en';
import { render, screen, within } from '../../../../test-utils';
import CorporateOverview from '../CorporateOverview';

describe('CorporateOverview', () => {
  beforeEach(() => {
    // @ts-ignore
    // eslint-disable-next-line no-import-assign
    nextRouter.useRouter = jest.fn().mockImplementation(() => ({}));
  });

  it('should render', () => {
    const props = {
      ceo: 'Bugs Bunny',
      cfo: 'Lola Bunny',
      chairman: 'Daffy Duck',
      directors: 3,
      seniorManagement: 4,
      shareholders: 5
    };
    render(
      <CorporateOverview
        ceo={props.ceo}
        cfo={props.cfo}
        chairman={props.chairman}
        directors={props.directors}
        seniorManagement={props.seniorManagement}
        shareholders={props.shareholders}
      />,
      {},
      allMessages
    );

    expect(
      within(screen.getByTestId('corp-ceo-testid')).getByText(props.ceo)
    ).toBeInTheDocument();
    expect(
      within(screen.getByTestId('corp-cfo-testid')).getByText(props.cfo)
    ).toBeInTheDocument();
    expect(
      within(screen.getByTestId('corp-chairman-testid')).getByText(
        props.chairman
      )
    ).toBeInTheDocument();
    expect(
      within(screen.getByTestId('corp-directors-testid')).getByText(
        props.directors
      )
    ).toBeInTheDocument();
    expect(
      within(screen.getByTestId('corp-shareholders-testid')).getByText(
        props.shareholders
      )
    ).toBeInTheDocument();
    expect(
      within(screen.getByTestId('corp-snr-mgmt-testid')).getByText(
        props.seniorManagement
      )
    ).toBeInTheDocument();
  });
});
