import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import Flag from 'react-world-flags';

import { classNames } from '@utils';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const flagOptions = [
  { language: 'es', code: 'ESP', description: 'common:languages.spanish', current: false },
  { language: 'en', code: 'USA', description: 'common:languages.english', current: true },
];

export const LanguageDropdown: React.FC = () => {
  const { t, i18n } = useTranslation('common');
  const router = useRouter();
  const [selected, setSelected] = useState(flagOptions.find((option) => option.language === i18n.language));

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    router.push(`/${language}${router.asPath}`, `/${language}${router.asPath}`, { locale: language });
  };

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="sr-only">Change language</Listbox.Label>
          <div className="relative">
            <Listbox.Button className="flex flex-row items-center justify-center gap-2 bg-transparent p-3 rounded-full text-sm font-medium text-slate-800 hover:ring-2 hover:ring-sky-500 focus:outline-none focus:z-10 focus:ring-2 focus:ring-sky-500">
              <span className="sr-only">Change language</span>
              <div className="flex justify-center items-center w-6 h-6">
                <Flag code={selected?.code} className="rounded-sm" />
              </div>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="origin-top-right absolute z-10 right-0 mt-1 w-fit rounded-md shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none">
                {flagOptions.map((option) => (
                  <Listbox.Option
                    key={option.code}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-sky-500' : 'text-gray-900',
                        'cursor-default select-none relative px-6 py-2 text-sm hover:cursor-pointer'
                      )
                    }
                    value={option}
                    onClick={() => changeLanguage(option.language)}
                  >
                    {({ active }) => (
                      <div className="flex flex-row gap-3 items-center justify-end">
                        <div className="flex flex-row gap-3 items-center justify-between">
                          <p className={classNames(active ? 'text-white' : 'text-gray-500', '')}>
                            {t(option.description)}
                          </p>
                        </div>
                        <div className="w-6 h-6 flex items-center justify-center">
                          <Flag code={option.code} className="rounded-sm" />
                        </div>
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};
