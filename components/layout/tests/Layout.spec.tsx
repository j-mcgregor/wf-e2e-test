/* eslint-disable sonarjs/no-duplicate-string */
import client from 'next-auth/client';
import * as nextRouter from 'next/router';
import * as Recoil from 'recoil';

import allMesages from '../../../messages/en';
import { makeMockSession, render, screen, within } from '../../../test-utils';
import Layout from '../Layout';

jest.mock('next-auth/client');
jest.mock('next/link', () => {
  // @ts-ignore
  return ({ children }) => {
    return children;
  };
});

describe('Layout', () => {
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

  it('render the Layout without issue', () => {
    expect(() => render(<Layout />, undefined, allMesages)).not.toThrow();
  });

  it('renders all sidenav components with children when valid session', async () => {
    render(
      <Layout>
        <div data-testid="potato">Batman</div>
      </Layout>,
      {},
      allMesages
    );

    expect(
      screen.getByRole('button', {
        name: /open sidebar/i
      })
    ).toBeInTheDocument();
    expect(screen.getByTestId('potato')).toBeInTheDocument();
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/sme calc/i)).toBeInTheDocument();
    // expect(screen.getByText(/sme prospector/i)).toBeInTheDocument();
    expect(screen.getByText(/batched reports/i)).toBeInTheDocument();
    expect(screen.getByText(/api documentation/i)).toBeInTheDocument();
    expect(screen.getByText(/settings/i)).toBeInTheDocument();
    expect(screen.getByText(/our tools/i)).toBeInTheDocument();
    expect(screen.getByText(/support/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: /logout/i
      })
    ).toBeInTheDocument();

    expect(
      within(screen.getByRole('main')).getByText(/batman/i)
    ).toBeInTheDocument();

    expect(pushSpy).not.toHaveBeenCalled();
  });

  it('redirects to /login if NOT LOADING and NO SESSION and NOT NOAUTHREQUIRED', () => {
    // below gives: const [session = null, loading = false] = useSession();
    (client.useSession as jest.Mock).mockReturnValue([null, false]);

    // implied, but good to specify
    render(<Layout noAuthRequired={false} />, {}, allMesages);

    expect(pushSpy).toHaveBeenCalled();
  });

  it('does not redirect to /login if LOADING or NO SESSION or NOAUTHREQUIRED are truthy', () => {
    (client.useSession as jest.Mock).mockReturnValue([null, false]);

    const { rerender } = render(<Layout noAuthRequired />, {}, allMesages);

    expect(pushSpy).not.toHaveBeenCalled();

    (client.useSession as jest.Mock).mockReturnValue([null, true]);

    expect(pushSpy).not.toHaveBeenCalled();

    // reset session
    (client.useSession as jest.Mock).mockReturnValue([null, false]);

    rerender(<Layout noAuthRequired />);

    expect(pushSpy).not.toHaveBeenCalled();

    (client.useSession as jest.Mock).mockReturnValue([mockSession, false]);

    expect(pushSpy).not.toHaveBeenCalled();
  });

  it('renders a skeleton when NOT NOAUTHREQUIRED and LOADING', () => {
    (client.useSession as jest.Mock).mockReturnValue([mockSession, true]);

    render(<Layout />, {}, allMesages);

    expect(screen.getByTestId('skeleton-layout')).toBeInTheDocument();
    // 9 skeleton rows by default
    expect(screen.getAllByRole('listitem').length).toBe(9);
  });

  it('sets state with useSetRecoilState if valid session', () => {
    const mockSetState = jest.fn();
    const mockRecoilSetState = jest
      .spyOn(Recoil, 'useSetRecoilState')
      .mockReturnValue(mockSetState);

    const expectedSetStateBody = {
      ...mockSession,
      key: 'appState'
    };

    delete expectedSetStateBody['expires'];

    render(<Layout />, {}, allMesages);

    expect(mockRecoilSetState).toHaveBeenCalledWith({
      key: 'appState'
    });

    expect(mockSetState).toHaveBeenCalledWith(expectedSetStateBody);
  });
});
