/* eslint-disable sonarjs/no-identical-functions */
import client from 'next-auth/client';
import * as nextRouter from 'next/router';

import { mockServerPost } from '../../../../__mocks__/service-worker/server';
import forgotPasswordMessages from '../../../../messages/en/forgotten-password.en.json';
import {
  fireEvent,
  makeMockSession,
  render,
  screen,
  waitFor
} from '../../../../test-utils';
import ForgotPasswordForm from '../ForgotPasswordForm';

jest.mock('next-auth/client');

// @ts-ignore
// eslint-disable-next-line no-import-assign
nextRouter.useRouter = jest.fn().mockImplementation(() => ({
  prefetch: jest.fn().mockReturnValue({
    catch: jest.fn()
  })
}));

describe('ForgotPasswordForm', () => {
  let mockSession: any;

  beforeEach(() => {
    mockSession = makeMockSession();

    (client.useSession as jest.Mock).mockReturnValue([mockSession, false]);
  });

  it('renders the form without issue', () => {
    expect(() =>
      render(<ForgotPasswordForm />, undefined, forgotPasswordMessages)
    ).not.toThrow();
  });

  it('contains the right information', async () => {
    mockServerPost(
      'http://localhost:3000/api/password-reset',
      200,
      JSON.stringify({ ok: true })
    );
    render(<ForgotPasswordForm />, undefined, forgotPasswordMessages);

    expect(
      screen.getByRole('heading', {
        name: /forgotten password/i
      })
    ).toBeVisible();

    expect(
      screen.getByText(
        /enter the email you registered with to receive a password reset link\./i
      )
    ).toBeVisible();

    fireEvent.input(
      screen.getByRole('textbox', {
        name: /email address/i
      }),
      {
        target: {
          value: 'batman@wayneindustries.net'
        }
      }
    );

    await waitFor(() => {
      fireEvent.submit(
        screen.getByRole('button', {
          name: /reset password/i
        })
      );
    });

    await waitFor(() => {
      screen.logTestingPlaygroundURL();
      expect(
        screen.queryByRole('textbox', {
          name: /email address/i
        })
      ).not.toBeInTheDocument();
      expect(
        screen.getByText(
          /if your email exists in our system we will send you a reset link\. please check your spam in case the email ends up in there\./i
        )
      ).toBeInTheDocument();
    });
  });

  it('contains the correct error if submission failed', async () => {
    mockServerPost(
      'http://localhost:3000/api/password-reset',
      400,
      JSON.stringify({ ok: false })
    );
    render(<ForgotPasswordForm />, undefined, forgotPasswordMessages);

    expect(
      screen.getByRole('heading', {
        name: /forgotten password/i
      })
    ).toBeVisible();

    expect(
      screen.getByText(
        /enter the email you registered with to receive a password reset link\./i
      )
    ).toBeVisible();

    fireEvent.input(
      screen.getByRole('textbox', {
        name: /email address/i
      }),
      {
        target: {
          value: 'batman@wayneindustries.net'
        }
      }
    );

    await waitFor(() => {
      fireEvent.submit(
        screen.getByRole('button', {
          name: /reset password/i
        })
      );
    });

    await waitFor(() => {
      expect(
        screen.getByText(
          /there was an error submitting your email\. please contact support\./i
        )
      ).toBeInTheDocument();
    });
  });
});
