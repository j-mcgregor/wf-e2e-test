import { within } from '@testing-library/dom';
import { act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CSVFileValidator from 'csv-file-validator';
import client from 'next-auth/client';
import * as nextRouter from 'next/router';

import { validReportHeaders } from '../../../../lib/settings/sme-calc.settings';
import allMessages from '../../../../messages/en';
import UploadData from '../../../../pages/report/[id]/upload-data';
import { makeMockSession, render, screen } from '../../../../test-utils';

jest.mock('next-auth/client');

xdescribe('UploadData', () => {
  let mockSession: any;
  let pushSpy: jest.SpyInstance;

  beforeEach(() => {
    mockSession = makeMockSession();
    pushSpy = jest.fn();

    (client.useSession as jest.Mock).mockReturnValue([mockSession, false]);

    // @ts-ignore
    // eslint-disable-next-line no-import-assign
    nextRouter.useRouter = jest.fn().mockImplementation(() => ({
      query: {
        id: 35
      },
      prefetch: jest.fn().mockReturnValue({
        catch: jest.fn()
      }),
      asPath: '',
      push: pushSpy
    }));
  });

  it('should redirect back to /reports when "Back to Reports" clicked', async () => {
    render(<UploadData />, undefined, allMessages);

    const link = screen.getByRole('link', {
      name: /back to report/i
    });
    link && userEvent.click(link);

    // next/link tested by mocking router.push
    expect(pushSpy).toHaveBeenCalledWith('/reports', '/reports', {
      locale: undefined,
      scroll: undefined,
      shallow: undefined
    });
  });

  // BASIC PLUMBING: SHOULD BE EXTENNDED WHEN ROUTES ARE IN
  it('should direct to FUll REPORT when "Full Report" clicked', async () => {
    render(<UploadData />, undefined, allMessages);

    const link = screen.getByRole('link', {
      name: /full report/i
    });
    link && userEvent.click(link);

    expect(
      screen.getByText(
        /make changes to any report values and re\-upload to see the effect\./i
      )
    ).toBeInTheDocument();

    // next/link tested by mocking router.push
    expect(pushSpy).toHaveBeenCalledWith('/#', '/#', {
      locale: undefined,
      scroll: false,
      shallow: undefined
    });
  });

  // BASIC PLUMBING: SHOULD BE EXTENNDED WHEN ROUTES ARE IN
  it('should direct to FINANCIALS ONLY when "Financials Only" clicked', async () => {
    render(<UploadData />, undefined, allMessages);

    const link = screen.getByRole('link', {
      name: /financials only/i
    });
    link && userEvent.click(link);

    expect(
      screen.getByText(
        /add a new year of financials and re\-upload to quickly see what this years effect\./i
      )
    ).toBeInTheDocument();

    // next/link tested by mocking router.push
    expect(pushSpy).toHaveBeenCalledWith('/#', '/#', {
      locale: undefined,
      scroll: false,
      shallow: undefined
    });
  });

  describe('VALID CSV', () => {
    fit('should upload a CSV file', () => {
      Object.defineProperty(global, 'FileReader', {
        writable: true,
        value: jest.fn().mockImplementation(() => ({
          readAsDataURL: jest.fn(),
          onLoad: jest.fn(),
          readAsText: jest.fn()
        }))
      });
      //
      const file = new File(['hello'], 'hello.csv', { type: 'text/csv' });

      render(<UploadData />, undefined, allMessages);
      const input = screen.getByLabelText(
        /Upload your CSV/i
      ) as HTMLInputElement;

      act(() => {
        userEvent.upload(input, file);
      });

      if (input) {
        expect(input.files?.[0]).toStrictEqual(file);
        expect(input.files?.item(0)).toStrictEqual(file);
        expect(input.files).toHaveLength(1);
      } else {
        throw Error('Input not found');
      }

      screen.logTestingPlaygroundURL();
      const hasRequiredDataElement =
        screen.getByText(/uploaded file/i).parentElement;

      if (hasRequiredDataElement) {
        expect(
          within(hasRequiredDataElement).getByTestId('icon-check')
        ).toBeInTheDocument();
      } else {
        throw Error('Uploaded File box not found');
      }
    });
  });

  /**
   * The file input only uploads a file with a .csv extension in the browser,
   * but the test environment has no browser to prevent it
   */
  describe('INVALID CSV', () => {
    it('should show a cross next to "VALID CSV" if not valid CSV', () => {});
    it('should show a cross next to "HAS REQUIRED FORMAT" if in wrong format', () => {});
    it('should show a cross next to "HAS REQUIRED DATA" if data not present in CSV', async () => {
      const file = new File(
        ['name,age,dob,sex,jack,be,nimble,or'],
        'hello.csv',
        {
          type: 'text/csv'
        }
      );

      const fileValidator = await CSVFileValidator(file, {
        headers: validReportHeaders.map(vh => ({
          name: vh,
          inputName: vh
        }))
      });

      const isFileValid = fileValidator.inValidMessages.length === 0;

      render(<UploadData />, undefined, allMessages);
      const input = screen.getByLabelText(
        /Upload your CSV/i
      ) as HTMLInputElement;

      userEvent.upload(input, file);

      screen.logTestingPlaygroundURL();

      expect(screen.queryByText(/hello\.csv/i)).toBeInTheDocument();

      const hasRequiredDataElement =
        screen.getByText(/has required data/i).parentElement;

      if (hasRequiredDataElement) {
        expect(
          within(hasRequiredDataElement).getByTestId('icon-cross')
        ).toBeInTheDocument();
      } else {
        throw Error('Has Required Data box not found');
      }
    });
  });
});
