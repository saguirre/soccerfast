import { Menu, Transition } from '@headlessui/react';
import { UserIcon } from '@heroicons/react/solid';
import { classNames } from '@utils';
import { User } from '@models';
import Link from 'next/link';
import { Fragment } from 'react';
import { useTranslation } from 'next-i18next';

const userNavigation = [
  { name: 'profile', href: '/profile' },
  { name: 'logout', href: '/' },
];

interface Props {
  user: User | null;
  logout: () => void;
}

export const UserDropdown: React.FC<Props> = ({ user, logout }) => {
  const { t } = useTranslation('common');

  return (
    <div className="flex items-center">
      <Menu as="div" className="ml-4 relative flex-shrink-0">
        <div>
          <Menu.Button className="flex flex-row items-center justify-between hover:ring-2 hover:ring-offset-2 hover:ring-offset-sky-500 rounded-xl hover:ring-white hover:cursor-pointer p-2">
            <span className="ml-2 mr-3">{user?.name}</span>
            <span className="sr-only">Open user menu</span>
            {user?.avatar ? (
              <div className="flex items-center mr-3 h-11 w-11 justify-center text-sm rounded-full text-white focus:outline-none">
                <img src={user?.avatar} className="h-full w-full" />
              </div>
            ) : (
              <div className="bg-sky-600 flex p-2 mr-3 items-center justify-center text-sm rounded-full text-white focus:outline-none ">
                <UserIcon className="h-7 w-7" />
              </div>
            )}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="z-50 origin-top-right absolute right-6 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            {userNavigation.map((item) => {
              return (
                <Link key={item.href} href={item.href}>
                  <Menu.Item key={item.name}>
                    {({ active }) => (
                      <div
                        onClick={() => item.name == 'logout' && logout()}
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'block hover:cursor-pointer px-4 py-3 text-md text-gray-700'
                        )}
                      >
                        {t(`dropdown.${item.name}`)}
                      </div>
                    )}
                  </Menu.Item>
                </Link>
              );
            })}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
