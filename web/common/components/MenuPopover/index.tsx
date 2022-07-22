import { Fragment, SVGProps } from 'react';

import { useTranslation } from 'next-i18next';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon, LightningBoltIcon, PlusIcon } from '@heroicons/react/solid';
import { ExclamationIcon } from '@heroicons/react/outline';

import { classNames } from '@utils';

export interface PopoverItem {
  id: number;
  name: string;
  logo?: string;
  active?: boolean;
  icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  description?: string;
}

interface Props {
  title: string;
  addTitle?: string;
  announcement?: string;
  goToAdd?: () => void;
  goToItem: (id: number) => void;
  items: PopoverItem[];
}

export const MenuPopover: React.FC<Props> = ({ announcement, title, addTitle, goToAdd, goToItem, items }) => {
  const { t } = useTranslation('common');

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames(
              open ? 'text-gray-500' : 'text-gray-600',
              'group bg-white rounded-md px-2 inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'
            )}
          >
            <span>{title}</span>
            <ChevronDownIcon
              className={classNames(open ? 'text-gray-400' : 'text-gray-600', 'ml-2 h-5 w-5 group-hover:text-gray-500')}
              aria-hidden="true"
            />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform w-screen max-w-md lg:max-w-3xl">
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-y-scroll overflow-x-hidden">
                <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2">
                  {addTitle && addTitle?.length > 0 && (
                    <button
                      onClick={goToAdd}
                      className="-m-3 p-4 w-1/3 col-span-2 flex flex-row items-center justify-between gap-3 rounded-lg hover:ring-2 hover:ring-sky-500"
                    >
                      <p className="text-md font-medium text-gray-900">{addTitle}</p>
                      <PlusIcon className="w-6 h-6 text-sky-600" />
                    </button>
                  )}
                  {items.map((item) => (
                    <div
                      key={item.name}
                      onClick={() => goToItem(item.id)}
                      className="-m-3 p-3 rounded-lg hover:bg-gray-50 hover:cursor-pointer"
                    >
                      <div className=" flex items-start">
                        <div
                          className={classNames(
                            item.icon || !item.logo ? 'bg-sky-500' : '',
                            'flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md  text-white sm:h-12 sm:w-12'
                          )}
                        >
                          {item.icon ? (
                            <item.icon className="h-6 w-6" aria-hidden="true" />
                          ) : (
                            <>
                              {item.logo ? (
                                <img src={item.logo} />
                              ) : (
                                <LightningBoltIcon className="h-6 w-6" aria-hidden="true" />
                              )}
                            </>
                          )}
                        </div>
                        <div className="ml-4">
                          <p className="text-base font-medium text-gray-900">{item.name}</p>
                          <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                        </div>
                      </div>
                      {!item.active && (
                        <div className="flex flex-row items-center justify-start mt-2">
                          <ExclamationIcon className="h-5 w-5 text-amber-400 mr-1" />
                          <span className="text-sm text-gray-400">{t('header.inactive')}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {announcement && announcement?.length > 0 && (
                  <div className="p-5 bg-gray-50 sm:p-8">
                    <div className="-m-3 p-3 flow-root rounded-md">
                      <div className="flex items-center">
                        <div className="text-base font-medium text-gray-900">{t('header.announcement')}</div>
                        <span className="ml-1 inline-flex items-center py-0.5 px-2.5 rounded-full text-xs font-medium leading-5 bg-sky-100 text-sky-800">
                          !
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{announcement}</p>
                    </div>
                  </div>
                )}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};
