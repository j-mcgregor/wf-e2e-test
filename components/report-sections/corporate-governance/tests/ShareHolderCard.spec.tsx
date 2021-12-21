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

  it('should render', () => {
    const props = {
      firstName: 'Daffy',
      lastName: 'Duck',
      linkedin: 'http://linkedin.com/daffy',
      name: 'Loony Toon'
    };
    const linkedInLink = `https://www.linkedin.com/search/results/all/?keywords=${props.name}`;

    render(
      <ShareHolderCard
        firstName={props.firstName}
        lastName={props.lastName}
        name={props.name}
      />,
      {},
      allMessages
    );

    expect(screen.getByText(/daffy duck/i)).toBeInTheDocument();
    expect(screen.getByText(props.name)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', linkedInLink);
  });
});

// it('Directors', async () => {
//   const { directors } = personal;

//   render(<ReportTemplate isTesting />, undefined, allMessages);

//   const skeleton = screen.queryByTestId('skeleton-report');
//   skeleton && (await waitForElementToBeRemoved(skeleton));

//   expect(
//     within(screen.getByTestId('corp-senior-profiles-testid')).getByText(
//       /directors/i
//     )
//   ).toBeInTheDocument();

//   const cards = within(
//     screen.getByTestId('corp-directors-list-testid')
//   ).queryAllByTestId('personal-card-testid');

//   expect(cards.length).toBe(directors.length);

//   cards.forEach((card, i) => {
//     expect(
//       within(card).getByText(new RegExp(directors[i].title, 'i'))
//     ).toBeInTheDocument();
//     expect(
//       within(card).getByText(new RegExp(directors[i].name, 'i'))
//     ).toBeInTheDocument();
//     expect(
//       within(card).getByText(new RegExp(directors[i].role, 'i'))
//     ).toBeInTheDocument();
//     expect(
//       within(card).getByText(new RegExp(directors[i].date_of_birth, 'i'))
//     ).toBeInTheDocument();
//     expect(
//       within(card).getByText(new RegExp(directors[i].nationality, 'i'))
//     ).toBeInTheDocument();
//   });
// });

// it('Senior Management', async () => {
//   const { senior_management } = personal;

//   render(<ReportTemplate isTesting />, undefined, allMessages);

//   const skeleton = screen.queryByTestId('skeleton-report');
//   skeleton && (await waitForElementToBeRemoved(skeleton));

//   expect(
//     within(screen.getByTestId('corp-senior-profiles-testid')).getByText(
//       /senior management/i
//     )
//   ).toBeInTheDocument();

//   const cards = within(
//     screen.getByTestId('corp-snr-mgmt-list-testid')
//   ).queryAllByTestId('personal-card-testid');

//   expect(cards.length).toBe(senior_management.length);

//   cards.forEach((card, i) => {
//     expect(
//       within(card).getByText(new RegExp(senior_management[i].title, 'i'))
//     ).toBeInTheDocument();
//     expect(
//       within(card).getByText(new RegExp(senior_management[i].name, 'i'))
//     ).toBeInTheDocument();
//     expect(
//       within(card).getByText(new RegExp(senior_management[i].role, 'i'))
//     ).toBeInTheDocument();
//     expect(
//       within(card).getByText(
//         new RegExp(senior_management[i].date_of_birth, 'i')
//       )
//     ).toBeInTheDocument();
//     expect(
//       within(card).getByText(
//         new RegExp(senior_management[i].nationality, 'i')
//       )
//     ).toBeInTheDocument();
//   });
// });
