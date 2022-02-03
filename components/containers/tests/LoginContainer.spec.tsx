import { screen } from '../../../test-utils';
import * as nextRouter from 'next/router';

import allMessages from '../../../messages/en';
import { render } from '../../../test-utils';
import LoginContainer from '../LoginContainer';

jest.mock('next-auth/react');

// @ts-ignore
// eslint-disable-next-line no-import-assign
nextRouter.useRouter = jest.fn().mockImplementation(() => ({}));

describe('LoginContainer', () => {
  it('render the LoginContainer without issue', () => {
    expect(() =>
      render(<LoginContainer />, undefined, allMessages)
    ).not.toThrow();
  });

  it('renders children passed to the LoginContainer', () => {
    render(
      <LoginContainer>
        <div data-testid="potato">Potato</div>
      </LoginContainer>,
      undefined,
      allMessages
    );

    const canvas = document.querySelector('canvas');

    expect(canvas).toBeInTheDocument();

    expect(screen.getByTestId('potato')).toBeInTheDocument();
  });
});
