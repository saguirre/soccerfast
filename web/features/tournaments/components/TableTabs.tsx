import { classNames } from '@utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

const defaultTabs = [
  { name: 'tournament.positions.title', href: 'positions', current: true },
  { name: 'tournament.goalKeepers.title', href: 'goalKeepers', current: false },
  { name: 'tournament.topScorers.title', href: 'topScorers', current: false },
];

interface Props {
  selectedTab: (e: any) => void;
}
export const TableTabs: React.FC<Props> = ({ selectedTab }) => {
  const { t } = useTranslation('pages');
  const [tabs, setTabs] = useState(defaultTabs);

  return (
    <div className="w-full">
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full focus:ring-sky-500 focus:border-sky-500 border-gray-300 rounded-md"
          defaultValue={tabs.find((tab) => tab.current)?.name}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{t(tab.name)}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex justify-between w-full" aria-label="Tabs">
            {tabs.map((tab, index) => (
              <div
                onClick={() => {
                  setTabs((current) => {
                    return current.map((currentTab) => {
                      if (currentTab.name === tab.name) {
                        return { ...tab, current: true };
                      }
                      return { ...currentTab, current: false };
                    });
                  });
                  selectedTab(tab.href);
                }}
                key={`${index}${tab.current}${tab.name}`}
                className={classNames(
                  tab.current
                    ? 'border-b-[3px] border-sky-500 text-sky-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'hover:cursor-pointer py-4 px-1 text-center border-b-2 font-medium text-md w-full'
                )}
                aria-current={tab.current ? 'page' : undefined}
              >
                {t(tab.name)}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};
