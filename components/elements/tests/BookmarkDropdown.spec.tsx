import { screen } from '@testing-library/react';
import { render } from '../../../test-utils';
import BookmarkDropdown from '../BookmarkDropdown';
import allMessages from '../../../messages/en';

describe('Bookmark Dropdown', () => {
  it('renders without issue', () => {
    expect(() => render(<BookmarkDropdown />, {}, allMessages)).not.toThrow();
  });

  it('renders the menu', () => {
    render(<BookmarkDropdown />, {}, allMessages);
    const menu = screen.getByTestId('bookmark-menu');
    expect(menu).toBeInTheDocument();
  });

  // tried to access the button but it's abstracted by the HeadlessUI component I think?
  // it('renders the menu button', () => {
  //   render(<BookmarkDropdown />);
  //   const button = screen.getByTestId('delete-bookmark-btn');
  //   expect(button).toBeDefined();
  // });
});
