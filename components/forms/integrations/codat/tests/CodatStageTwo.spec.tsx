/* eslint-disable no-useless-escape */
/**
 * THIS IS A VERY BASIC TEST SUITE SETUP.
 * IT ONLY TESTS THE COMPONENT DOESN'T THROW WHEN RENDERING.
 * MORE TESTS SHOULD BE ADDED BY DEVS AS THE PROJECT GROWS.
 * REMOVE THIS NOTE WHEN MORE TESTS ARE ADDED.
 */
import { screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import * as nextRouter from 'next/router';
import * as useSWR from 'swr';

import allMessages from '../../../../../messages/en';
import { makeMockSession, render } from '../../../../../test-utils';
import CodatStageTwo from '../CodatStageTwo';

jest.mock('next-auth/react');
// jest.mock('useSWR');

const codatStage2 = 'codat-stage-2';

const mockCompanies = [
  {
    company_id: '456',
    connection_id: 'connection-456',
    company_name: 'Avengers',
    first: new Date('2021-01-01').toDateString(),
    last: new Date('2021-02-01').toDateString()
  },
  {
    company_id: '789',
    connection_id: 'connection-789',
    company_name: 'Guardians of the Galaxy',
    first: new Date('2021-01-01').toDateString(),
    last: new Date('2021-02-01').toDateString()
  }
];

describe('CodatStageTwo', () => {
  let mockSession: any;

  beforeEach(() => {
    mockSession = makeMockSession();

    // @ts-ignore
    // eslint-disable-next-line no-import-assign
    nextRouter.useRouter = jest.fn().mockImplementation(() => ({
      asPath: ''
    }));
    (useSession as jest.Mock).mockReturnValue([mockSession, false]);

    jest.resetAllMocks();
    jest.useFakeTimers();
  });

  it('displays correct info when data has companies', async () => {
    const selectedCompany = {
      company_id: '123',
      connection_id: 'connection-123',
      company_name: 'Justice League',
      first: new Date('2022-01-01').toDateString(),
      last: new Date('2022-02-01').toDateString()
    };

    jest.spyOn(useSWR, 'default').mockImplementationOnce(() => ({
      isError: false,
      mutate: jest.fn(),
      isValidating: false,
      data: {
        data: {
          companies: mockCompanies
        }
      }
    }));

    const setSelectedCompany = jest.fn();
    const stage = 2;
    const setStage = jest.fn();
    const loading = false;
    const enabledClassName = 'superman';
    const disabledClassName = 'batman';

    render(
      <CodatStageTwo
        selectedCompany={selectedCompany}
        setSelectedCompany={setSelectedCompany}
        stage={stage}
        setStage={setStage}
        loading={loading}
        enabledClassName={enabledClassName}
        disabledClassName={disabledClassName}
      />,
      {},
      allMessages
    );

    expect(screen.getByTestId(codatStage2)).toHaveClass('superman');
    expect(screen.getAllByText(/Justice League/i).length).toBe(2);
    expect(screen.getByText(/123/i)).toBeInTheDocument();
    expect(
      screen.getByText(/december 2021 \- january 2022/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/2 results/i)).toBeInTheDocument();

    // const input = screen.getByRole('textbox');
    // input.click();
    // userEvent.type(input, 'hello');
    // expect(input).toHaveValue('hello');
    // screen.logTestingPlaygroundURL();
  });

  it('displays correct info when data has no companies', async () => {
    const selectedCompany = {
      company_id: '123',
      connection_id: 'connection-123',
      company_name: 'Justice League',
      first: new Date('2022-01-01').toDateString(),
      last: new Date('2022-02-01').toDateString()
    };

    jest
      .spyOn(useSWR, 'default')
      .mockImplementation(() => ({
        isError: false,
        mutate: jest.fn(),
        isValidating: false,
        data: {
          data: {
            companies: []
          }
        }
      }))
      .mockImplementation(() => ({
        isError: false,
        mutate: jest.fn(),
        isValidating: false,
        data: {
          data: {
            uncategorised_accounts: []
          }
        }
      }));

    const setSelectedCompany = jest.fn();
    const stage = 2;
    const setStage = jest.fn();
    const loading = false;
    const enabledClassName = 'superman';
    const disabledClassName = 'batman';

    render(
      <CodatStageTwo
        selectedCompany={selectedCompany}
        setSelectedCompany={setSelectedCompany}
        stage={stage}
        setStage={setStage}
        loading={loading}
        enabledClassName={enabledClassName}
        disabledClassName={disabledClassName}
      />,
      {},
      allMessages
    );

    expect(screen.getByTestId(codatStage2)).toHaveClass('superman');
    expect(screen.getAllByText(/Justice League/i).length).toBe(2);
    expect(screen.getByText(/123/i)).toBeInTheDocument();
    expect(
      screen.getByText(/december 2021 \- january 2022/i)
    ).toBeInTheDocument();
    expect(screen.queryByText(/2 results/i)).toBeNull();

    // const input = screen.getByRole('textbox');
    // input.click();
    // userEvent.type(input, 'hello');
    // expect(input).toHaveValue('hello');
  });
});
