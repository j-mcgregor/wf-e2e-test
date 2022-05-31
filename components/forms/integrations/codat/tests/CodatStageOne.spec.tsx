/**
 * THIS IS A VERY BASIC TEST SUITE SETUP.
 * IT ONLY TESTS THE COMPONENT DOESN'T THROW WHEN RENDERING.
 * MORE TESTS SHOULD BE ADDED BY DEVS AS THE PROJECT GROWS.
 * REMOVE THIS NOTE WHEN MORE TESTS ARE ADDED.
 */
import { screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import * as nextRouter from 'next/router';

import allMessages from '../../../../../messages/en';
import { makeMockSession, render } from '../../../../../test-utils';
import CodatStageOne from '../CodatStageOne';

jest.mock('next-auth/react');

const codatStage1 = 'codat-stage-1';

describe('CodatStageOne', () => {
  let mockSession: any;

  beforeEach(() => {
    mockSession = makeMockSession();

    // @ts-ignore
    // eslint-disable-next-line no-import-assign
    nextRouter.useRouter = jest.fn().mockImplementation(() => ({
      asPath: ''
    }));
    (useSession as jest.Mock).mockReturnValue([mockSession, false]);
  });

  it('sets stage two when clicked', () => {
    const loading = false;
    const disabledClassName = 'batman';
    const enabledClassName = 'superman';
    const stage = 0;
    const setStage = jest.fn();

    render(
      <CodatStageOne
        loading={loading}
        disabledClassName={disabledClassName}
        enabledClassName={enabledClassName}
        stage={stage}
        setStage={setStage}
      />,
      {},
      allMessages
    );

    const button = screen.getByRole('button', {
      name: /codat integration use codat to connect to the most recent data on the companies you have access to\./i
    });

    expect(button).toBeInTheDocument();

    button.click();

    const outerContainer = screen.getByTestId(codatStage1);
    expect(outerContainer.classList).toContain('superman');

    expect(setStage).toHaveBeenCalledWith(2);
  });
  it('doesnt set the next stage when loading=true', () => {
    const loading = true;
    const disabledClassName = 'batman';
    const enabledClassName = 'superman';
    const stage = 2;
    const setStage = jest.fn();

    render(
      <CodatStageOne
        loading={loading}
        disabledClassName={disabledClassName}
        enabledClassName={enabledClassName}
        stage={stage}
        setStage={setStage}
      />,
      {},
      allMessages
    );

    const button = screen.getByRole('button', {
      name: /codat integration use codat to connect to the most recent data on the companies you have access to\./i
    });

    button.click();

    const outerContainer = screen.getByTestId(codatStage1);
    expect(outerContainer.classList).toContain('batman');

    expect(setStage).not.toHaveBeenCalled();
  });
  it('doesnt set the next stage when stage > 1 and loading=true', () => {
    const loading = true;
    const disabledClassName = 'batman';
    const enabledClassName = 'superman';
    const stage = 2;
    const setStage = jest.fn();

    render(
      <CodatStageOne
        loading={loading}
        disabledClassName={disabledClassName}
        enabledClassName={enabledClassName}
        stage={stage}
        setStage={setStage}
      />,
      {},
      allMessages
    );

    const button = screen.getByRole('button', {
      name: /codat integration use codat to connect to the most recent data on the companies you have access to\./i
    });

    button.click();

    const outerContainer = screen.getByTestId(codatStage1);
    expect(outerContainer.classList).toContain('batman');

    expect(setStage).not.toHaveBeenCalled();
  });
});
