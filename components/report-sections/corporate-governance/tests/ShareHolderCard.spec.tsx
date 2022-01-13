/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable security/detect-non-literal-regexp */
import * as nextRouter from 'next/router';
import React from 'react';

import allMessages from '../../../../messages/en';
import { render, screen } from '../../../../test-utils';
import ShareHolderCard from '../ShareHolderCard';

describe('ShareHolderCard', () => {
  beforeEach(() => {
    // @ts-ignore
    // eslint-disable-next-line no-import-assign
    nextRouter.useRouter = jest.fn().mockImplementation(() => ({}));
  });

  it('should render with LinkedIn link if type === "One or more named individuals or families"', () => {
    const props = {
      id: 'IT*110178163813',
      name: 'MS GABRIELLE SABATO',
      salutation: 'MS',
      first_name: 'GABRIELLE',
      last_name: 'SABATO',
      uci: 'P340226916',
      country: 'IT',
      type: 'One or more named individuals or families',
      percentage: null,
      information_date: '04/2021',
      is_liability: false,
      also_a_manager: 'Current manager',
      is_beneficially_held: false,
      peps_sanctions_enforcements: false
    };
    const linkedInLink = `https://www.linkedin.com/search/results/all/?keywords=Gabrielle Sabato`;

    render(
      <ShareHolderCard
        firstName={props.first_name}
        lastName={props.last_name}
        name={props.name}
        type={props.type}
      />,
      {},
      allMessages
    );

    expect(
      screen.getByText(new RegExp(props.first_name, 'i'))
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(props.last_name, 'i'))
    ).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', linkedInLink);
  });

  it('should display a name and LinkedIn link if firstName and lastName are null, name is present and type === "One or more named individuals or families"', () => {
    const props = {
      id: 'IT*110178163813',
      name: 'GABRIELLE SABATO',
      salutation: '',
      first_name: '',
      last_name: '',
      uci: 'P340226916',
      country: 'IT',
      type: 'One or more named individuals or families',
      percentage: null,
      information_date: '04/2021',
      is_liability: false,
      also_a_manager: 'Current manager',
      is_beneficially_held: false,
      peps_sanctions_enforcements: false
    };
    const linkedInLink = `https://www.linkedin.com/search/results/all/?keywords=GABRIELLE SABATO`;

    render(
      <ShareHolderCard
        firstName={props.first_name}
        lastName={props.last_name}
        name={props.name}
        type={props.type}
      />,
      {},
      allMessages
    );

    expect(screen.getByText(new RegExp(props.name, 'i'))).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', linkedInLink);
  });

  it('should not render with LinkedIn link if type === "Corporate"', () => {
    const props = {
      id: 'IT*110178163813',
      name: 'MS GABRIELLE SABATO',
      salutation: 'MS',
      first_name: 'GABRIELLE',
      last_name: 'SABATO',
      uci: 'P340226916',
      country: 'IT',
      type: 'Corporate',
      percentage: null,
      information_date: '04/2021',
      is_liability: false,
      also_a_manager: 'Current manager',
      is_beneficially_held: false,
      peps_sanctions_enforcements: false
    };

    render(
      <ShareHolderCard
        firstName={props.first_name}
        lastName={props.last_name}
        name={props.name}
        type={props.type}
      />,
      {},
      allMessages
    );

    expect(screen.getByText(new RegExp(props.name, 'i'))).toBeInTheDocument();
    expect(screen.queryByRole('link')).toBeNull();
  });
});
