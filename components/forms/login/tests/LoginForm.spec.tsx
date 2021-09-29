/* eslint-disable sonarjs/no-duplicate-string */
import { fireEvent, waitFor } from '@testing-library/dom';
import client from 'next-auth/client';
import * as nextRouter from 'next/router';

import loginMessages from '../../../../messages/en/login.en.json';
import { makeMockSession, render, screen } from '../../../../test-utils';
import LoginForm from '../LoginForm';

jest.mock('next-auth/client');
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

    (client.useSession as jest.Mock).mockReturnValue([mockSession, false]);
  });

  afterEach(() => {
    signInSpy.mockReset();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('render the form without issue', () => {
    expect(() => render(<LoginForm />, undefined, loginMessages)).not.toThrow();
  });

  it('submits the form without issue', async () => {
    signInSpy.mockReturnValue({ ok: true });

    render(<LoginForm />, undefined, loginMessages);

    fireEvent.input(
      screen.getByRole('textbox', {
        name: /email address/i
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
        name: /email address/i
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
    render(<LoginForm />, undefined, loginMessages);

    fireEvent.input(
      screen.getByRole('textbox', {
        name: /email address/i
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
      screen.getByText(/please enter a valid email\./i)
    ).toBeInTheDocument();
  });

  it('displays an email required message if form submitted with no email', async () => {
    render(<LoginForm />, undefined, loginMessages);

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

    expect(screen.getByText(/your email is required\./i)).toBeInTheDocument();
  });

  it('displays a password required message if form submitted with no password', async () => {
    render(<LoginForm />, undefined, loginMessages);

    fireEvent.input(
      screen.getByRole('textbox', {
        name: /email address/i
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
    render(<LoginForm />, undefined, loginMessages);

    fireEvent.input(
      screen.getByRole('textbox', {
        name: /email address/i
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
        name: /email address/i
      })
    ).toHaveValue('test@test.com');

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
