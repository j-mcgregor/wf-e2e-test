/* eslint-disable no-import-assign */
/* eslint-disable security/detect-non-literal-regexp */
/* eslint-disable security/detect-object-injection */
/* eslint-disable sonarjs/no-duplicate-string */
import client from 'next-auth/client';
import * as nextRouter from 'next/router';
import React from 'react';

import allMessages from '../../../../messages/en';
import { makeMockSession, render, screen } from '../../../../test-utils';
import Speedometer from '../Speedometer';

jest.mock('next-auth/client');
// @ts-ignore
nextRouter.useRouter = jest.fn().mockImplementation(() => ({
  query: {
    id: 35
  },
  prefetch: jest.fn().mockReturnValue({
    catch: jest.fn()
  }),
  asPath: ''
}));

describe('Speedometer', () => {
  let mockSession: any;

  beforeEach(() => {
    mockSession = makeMockSession();

    (client.useSession as jest.Mock).mockReturnValue([mockSession, false]);
  });

  it('should render', () => {
    const props = {
      title: 'The Flash',
      secondaryValues: [
        {
          name: 'Barry Allen',
          value: 20,
          colour: 'red'
        }
      ],
      rotationCalculator: (x: number) => x,
      value: 10,
      weighting: 40,
      hint: <div />,
      asMetric: 'hello'
    };
    render(<Speedometer {...props} />, {}, allMessages);

    expect(screen.getByText(/the flash/i)).toBeInTheDocument();
    expect(screen.getByText(/barry allen/i)).toBeInTheDocument();
    expect(screen.getByText(/10hello/i)).toBeInTheDocument();
  });
});
