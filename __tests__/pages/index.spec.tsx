import React from 'react';

import Dashboard from '../../pages';
import { render, screen } from '../../test-utils';
import * as nextRouter from 'next/router';
import client from 'next-auth/client';
import '@testing-library/jest-dom';
jest.mock('next-auth/client');

// @ts-ignore
nextRouter.useRouter = jest.fn().mockImplementation(() => ({}));

describe('Dashboard', () => {
  it('renders a heading', () => {
    const mockSession = {
      user: {
        name: 'John Doe',
        email: 'test@test.com',
        id: 1,
        recent_usage: {
          last_login: 1629657065187,
          api_requests: 142,
          reports_ran: 32
        },
        reports: [
          {
            id: 1,
            company_name: 'Bird Feeding Corp',
            sme_zscore: 456,
            bond_rating: 'AA',
            created_at: 1629660518563,
            bookmarked: false
          },
          {
            id: 2,
            company_name: 'Swan Feeding Corp',
            sme_zscore: 322,
            bond_rating: 'A-',
            created_at: 1629660001000,
            bookmarked: false
          },
          {
            id: 3,
            company_name: 'Geese Feeding Corp',
            sme_zscore: 345,
            bond_rating: 'A',
            created_at: 1629660000000,
            bookmarked: false
          },
          {
            id: 4,
            company_name: 'Pigeon Feeding Corp',
            sme_zscore: 311,
            bond_rating: 'B+',
            created_at: 1629659000000,
            bookmarked: false
          },
          {
            id: 5,
            company_name: 'Dove Feeding Corp',
            sme_zscore: 222,
            bond_rating: 'D',
            created_at: 1629657000000,
            bookmarked: true
          },
          {
            id: 6,
            company_name: 'Dove Feeding Corp',
            sme_zscore: 222,
            bond_rating: 'D',
            created_at: 1629657000000,
            bookmarked: false
          },
          {
            id: 7,
            company_name: 'Bird Feeding Corp',
            sme_zscore: 456,
            bond_rating: 'AA',
            created_at: 1629660518563,
            bookmarked: false
          },
          {
            id: 8,
            company_name: 'Swan Feeding Corp',
            sme_zscore: 322,
            bond_rating: 'A-',
            created_at: 1629660001000,
            bookmarked: true
          },
          {
            id: 9,
            company_name: 'Geese Feeding Corp',
            sme_zscore: 345,
            bond_rating: 'A',
            created_at: 1629660000000,
            bookmarked: true
          },
          {
            id: 10,
            company_name: 'Pigeon Feeding Corp',
            sme_zscore: 311,
            bond_rating: 'B+',
            created_at: 1629659000000,
            bookmarked: false
          },
          {
            id: 11,
            company_name: 'Dove Feeding Corp',
            sme_zscore: 222,
            bond_rating: 'D',
            created_at: 1629657000000,
            bookmarked: false
          },
          {
            id: 12,
            company_name: 'Dove Feeding Corp',
            sme_zscore: 222,
            bond_rating: 'D',
            created_at: 1629657000000
          },
          {
            id: 13,
            company_name: 'Bird Feeding Corp',
            sme_zscore: 456,
            bond_rating: 'AA',
            created_at: 1629660518563,
            bookmarked: false
          },
          {
            id: 14,
            company_name: 'Swan Feeding Corp',
            sme_zscore: 322,
            bond_rating: 'A-',
            created_at: 1629660001000,
            bookmarked: false
          },
          {
            id: 15,
            company_name: 'THIRD NEWEST ENTRY TEST',
            sme_zscore: 345,
            bond_rating: 'A',
            created_at: 1630408290506,
            bookmarked: false
          },
          {
            id: 16,
            company_name: 'Pigeon Feeding Corp',
            sme_zscore: 311,
            bond_rating: 'B+',
            created_at: 1629659000000,
            bookmarked: false
          },
          {
            id: 17,
            company_name: 'Dove Feeding Corp',
            sme_zscore: 222,
            bond_rating: 'D',
            created_at: 1629657000000,
            bookmarked: false
          },
          {
            id: 18,
            company_name: 'Dove Feeding Corp',
            sme_zscore: 222,
            bond_rating: 'D',
            created_at: 1629657000000,
            bookmarked: false
          },
          {
            id: 19,
            company_name: 'Bird Feeding Corp',
            sme_zscore: 456,
            bond_rating: 'AA',
            created_at: 1629660518563,
            bookmarked: false
          },
          {
            id: 20,
            company_name: 'Swan Feeding Corp',
            sme_zscore: 322,
            bond_rating: 'A-',
            created_at: 1629660001000,
            bookmarked: false
          },
          {
            id: 21,
            company_name: 'Geese Feeding Corp',
            sme_zscore: 345,
            bond_rating: 'A',
            created_at: 1629660000000,
            bookmarked: false
          },
          {
            id: 22,
            company_name: 'SECOND NEWEST ENTRY TEST',
            sme_zscore: 311,
            bond_rating: 'B+',
            created_at: 1630411549699,
            bookmarked: true
          },
          {
            id: 23,
            company_name: 'Dove Feeding Corp',
            sme_zscore: 222,
            bond_rating: 'D',
            created_at: 1629657000000,
            bookmarked: false
          },
          {
            id: 24,
            company_name: 'Dove Feeding Corp',
            sme_zscore: 222,
            bond_rating: 'D',
            created_at: 1629657000000,
            bookmarked: false
          },
          {
            id: 25,
            company_name: 'Dove Feeding Corp',
            sme_zscore: 222,
            bond_rating: 'D',
            created_at: 1629657000000,
            bookmarked: false
          },
          {
            id: 26,
            company_name: 'Bird Feeding Corp',
            sme_zscore: 456,
            bond_rating: 'AA',
            created_at: 1629660518563,
            bookmarked: false
          },
          {
            id: 27,
            company_name: 'Swan Feeding Corp',
            sme_zscore: 322,
            bond_rating: 'A-',
            created_at: 1629660001000,
            bookmarked: false
          },
          {
            id: 28,
            company_name: 'Geese Feeding Corp',
            sme_zscore: 345,
            bond_rating: 'A',
            created_at: 1629660000000,
            bookmarked: false
          },
          {
            id: 29,
            company_name: 'Pigeon Feeding Corp',
            sme_zscore: 311,
            bond_rating: 'B+',
            created_at: 1629659000000,
            bookmarked: false
          },
          {
            id: 30,
            company_name: 'Dove Feeding Corp',
            sme_zscore: 222,
            bond_rating: 'D',
            created_at: 1629657000000,
            bookmarked: false
          },
          {
            id: 31,
            company_name: 'Dove Feeding Corp',
            sme_zscore: 222,
            bond_rating: 'D',
            created_at: 1629657000000,
            bookmarked: false
          },
          {
            id: 32,
            company_name: 'Dove Feeding Corp',
            sme_zscore: 222,
            bond_rating: 'D',
            created_at: 1629657000000,
            bookmarked: false
          },
          {
            id: 33,
            company_name: 'Dove Feeding Corp',
            sme_zscore: 222,
            bond_rating: 'D',
            created_at: 1629657000000,
            bookmarked: false
          },
          {
            id: 34,
            company_name: 'Dove Feeding Corp',
            sme_zscore: 222,
            bond_rating: 'D',
            created_at: 1629657000000,
            bookmarked: false
          },
          {
            id: 35,
            company_name: 'NEWEST TEST ENTRY',
            sme_zscore: 222,
            bond_rating: 'D',
            created_at: 1630411922216,
            bookmarked: false
          }
        ]
      },
      expires: '2021-10-09T09:00:41.059Z'
    };

    (client.useSession as jest.Mock).mockReturnValue([mockSession, false]);

    render(<Dashboard />);

    screen.logTestingPlaygroundURL();
    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i
    });

    expect(heading).toBeInTheDocument();
  });
});
