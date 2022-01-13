/* eslint-disable security/detect-non-literal-regexp */
import userEvent from '@testing-library/user-event';
import * as nextRouter from 'next/router';

import allMessages from '../../../messages/en';
import { render, screen } from '../../../test-utils';
import AlternativeSearchBox from '../AlternativeSearchBox';

jest.mock('next-auth/client');

// @ts-ignore
// eslint-disable-next-line no-import-assign
nextRouter.useRouter = jest.fn().mockImplementation(() => ({}));

describe('AlternativeSearchBox', () => {
  it('render the AlternativeSearchBox without issue', async () => {
    render(
      <AlternativeSearchBox setChosenResult={jest.fn()} countryCode="FR" />,
      undefined,
      allMessages
    );

    expect(screen.queryByText(/searching\.\.\./i)).toBeNull();

    userEvent.type(
      screen.getByPlaceholderText(/enter company name\.\.\./i),
      'boo{enter}'
    );

    expect(
      screen.getByPlaceholderText(/enter company name\.\.\./i)
    ).toHaveValue('boo');

    expect(screen.getByText(/searching\.\.\./i)).toBeInTheDocument();

    for (let i = 0; i < 4; i++) {
      expect(
        await screen.findByText(new RegExp(`company_number ${i}`, 'i'))
      ).toBeInTheDocument();
      expect(
        await screen.findByText(new RegExp(`address_snippet ${i}`, 'i'))
      ).toBeInTheDocument();
    }
  });
});
