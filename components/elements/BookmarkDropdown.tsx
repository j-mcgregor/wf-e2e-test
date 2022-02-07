import { Menu } from '@headlessui/react';
import { DotsVerticalIcon } from '@heroicons/react/solid';
import { TrashIcon } from '@heroicons/react/outline';
import { useTranslations } from 'next-intl';

interface BookmarkDropdownProps {
  deleteBookmark: () => void;
}
const BookmarkDropdown = ({ deleteBookmark }: BookmarkDropdownProps) => {
  const t = useTranslations();

  return (
    <div data-testid="bookmark-menu" className="">
      <Menu>
        <Menu.Button className={'w-12 h-12 text-center z-50 relative'}>
          <DotsVerticalIcon className="hover:opacity-60 h-5 mx-auto " />
        </Menu.Button>
        <Menu.Items>
          <Menu.Item>
            {({ active }) => {
              return (
                <button
                  onClick={deleteBookmark}
                  data-testid="delete-bookmark-btn"
                  className={`${
                    active && 'text-highlight'
                  } absolute right-1 top-7 w-56  z-50 bg-white p-2 rounded font-bold shadow  border-2 border-highlight flex items-center justify-evenly `}
                >
                  <TrashIcon className="h-6 w-6" />
                  <span>{t('delete_bookmark')}</span>
                </button>
              );
            }}
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default BookmarkDropdown;
