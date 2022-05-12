/* eslint-disable sonarjs/no-duplicate-string */
import { fireEvent, waitFor } from '@testing-library/dom';
import * as client from 'next-auth/react';
import { useSession } from 'next-auth/react';
import * as nextRouter from 'next/router';

import allMessages from '../../../../messages/en';
import { makeMockSession, render, screen } from '../../../../test-utils';
import LoginForm from '../LoginForm';

jest.mock('next-auth/react');
jest.mock('next/link', () => {
  // @ts-ignore
  return ({ children }) => {
    return children;
  };
});

describe('LoginForm', () => {
  let mockSession: any;
  let signInSpy: jest.SpyInstance;
  let pushSpy: jest.Mock;

  beforeEach(() => {
    mockSession = makeMockSession();
    signInSpy = jest.spyOn(client, 'signIn');
    pushSpy = jest.fn();

    // @ts-ignore
    // eslint-disable-next-line no-import-assign
    nextRouter.useRouter = jest.fn().mockImplementation(() => ({
      push: pushSpy
    }));

    (useSession as jest.Mock).mockReturnValue([mockSession, false]);
  });

  afterEach(() => {
    signInSpy.mockReset();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('render the form without issue', () => {
    expect(() =>
      render(
        <LoginForm defaultHomepageRedirect={jest.fn()} />,
        undefined,
        allMessages
      )
    ).not.toThrow();
  });

  it('submits the form without issue', async () => {
    signInSpy.mockReturnValue({ ok: true });

    render(
      <LoginForm defaultHomepageRedirect={() => jest.fn()} />,
      undefined,
      allMessages
    );

    fireEvent.input(
      screen.getByRole('textbox', {
        name: /email/i
      }),
      {
        target: {
          value: 'test@test.com'
        }
      }
    );

    fireEvent.input(screen.getByLabelText(/password/i), {
      target: {
        value: 'password'
      }
    });

    expect(
      screen.getByRole('textbox', {
        name: /email/i
      })
    ).toHaveValue('test@test.com');

    expect(screen.getByLabelText(/password/i)).toHaveValue('password');

    fireEvent.submit(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(signInSpy).toHaveBeenCalled();
      expect(pushSpy).toHaveBeenCalled();
    });
  });

  it('displays an invalid email pattern message if form submitted with invalid email', async () => {
    render(
      <LoginForm defaultHomepageRedirect={jest.fn()} />,
      undefined,
      allMessages
    );

    fireEvent.input(
      screen.getByRole('textbox', {
        name: /email/i
      }),
      {
        target: {
          value: 'potato'
        }
      }
    );

    fireEvent.input(screen.getByLabelText(/password/i), {
      target: {
        value: 'password'
      }
    });

    expect(screen.getByLabelText(/password/i)).toHaveValue('password');

    fireEvent.submit(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(signInSpy).not.toHaveBeenCalled();
    });

    expect(
      screen.getByText(/please provide a valid email\./i)
    ).toBeInTheDocument();
  });

  it('displays an email required message if form submitted with no email', async () => {
    render(
      <LoginForm defaultHomepageRedirect={jest.fn()} />,
      undefined,
      allMessages
    );

    fireEvent.input(screen.getByLabelText(/password/i), {
      target: {
        value: 'password'
      }
    });

    expect(screen.getByLabelText(/password/i)).toHaveValue('password');

    fireEvent.submit(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(signInSpy).not.toHaveBeenCalled();
    });

    expect(
      screen.getByText(/Please provide an email address\./i)
    ).toBeInTheDocument();
  });

  it('displays a password required message if form submitted with no password', async () => {
    render(
      <LoginForm defaultHomepageRedirect={jest.fn()} />,
      undefined,
      allMessages
    );

    fireEvent.input(
      screen.getByRole('textbox', {
        name: /email/i
      }),
      {
        target: {
          value: 'potato@king.com'
        }
      }
    );

    fireEvent.submit(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(signInSpy).not.toHaveBeenCalled();
    });

    expect(
      screen.getByText(/your password is required\./i)
    ).toBeInTheDocument();
  });

  it('displays an error message when details are incorrect after submitting', async () => {
    render(
      <LoginForm defaultHomepageRedirect={jest.fn()} />,
      undefined,
      allMessages
    );
    fireEvent.input(
      screen.getByRole('textbox', {
        name: /email/i
      }),
      {
        target: {
          value: 'test@test.co'
        }
      }
    );

    fireEvent.input(screen.getByLabelText(/password/i), {
      target: {
        value: 'password'
      }
    });

    expect(
      screen.getByRole('textbox', {
        name: /email/i
      })
    ).toHaveValue('test@test.co');

    expect(screen.getByLabelText(/password/i)).toHaveValue('password');

    fireEvent.submit(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(signInSpy).toHaveBeenCalled();
    });

    expect(
      screen.getByText(/your details are incorrect\. please try again\./i)
    ).toBeInTheDocument();
  });
});
