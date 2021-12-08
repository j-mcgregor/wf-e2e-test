import * as nextRouter from 'next/router';
import React from 'react';

import allMessages from '../../../../messages/en';
import { render, screen } from '../../../../test-utils';
import ReliabilityIndex from '../ReliabilityIndex';

describe('ReliabilityIndex', () => {
  beforeEach(() => {
    // @ts-ignore
    // eslint-disable-next-line no-import-assign
    nextRouter.useRouter = jest.fn().mockImplementation(() => ({}));
  });
  it('should render', () => {
    render(<ReliabilityIndex reliability={1} />, {}, allMessages);

    // TODO: finish tests when localization for t('reliable'), t('caution') and t('concern') are done

    // screen.logTestingPlaygroundURL();
    // expect(screen.getByText(props.title)).toBeInTheDocument();
  });
});
