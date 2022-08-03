import { PlusIcon } from '@heroicons/react/outline';
import { MinusIcon, XIcon } from '@heroicons/react/solid';
import { classNames } from '@utils/*';
import { UserContext } from 'contexts/user.context';
import { useMultiSelect } from 'hooks/useMultiSelect.hook';
import { BracketScorer } from 'models/fixture';
import { useTranslation } from 'next-i18next';
import { Ref, MutableRefObject, useContext, forwardRef, useRef, useEffect, useLayoutEffect, useState } from 'react';

interface MatchScorerMultiSelectProps {
  teamId: number;
  teamGoals?: number;
  onChange: (selectedScorers: BracketScorer[]) => void;
}

const assignRefs = <T extends unknown>(...refs: Ref<T | null>[]) => {
  return (node: T | null) => {
    refs.forEach((r) => {
      if (typeof r === 'function') {
        r(node);
      } else if (r) {
        (r as MutableRefObject<T | null>).current = node;
      }
    });
  };
};

export const MatchScorerMultiSelect = forwardRef<HTMLDivElement, MatchScorerMultiSelectProps>(
  ({ teamId, teamGoals, onChange }, ref) => {
    const { t } = useTranslation('common');
    const localRef = useRef<HTMLDivElement | null>(null);
    const [dropdownMarginTop, setDropdownMarginTop] = useState<number | undefined>(128);
    const { userService } = useContext(UserContext);
    const {
      selectedItems,
      handleMouseLeave,
      handleMouseEnter,
      setServiceParam,
      setSelectedItems,
      toggleSelectOpen,
      setSelectOpen,
      selectOpen,
      filteredItems,
      handleRemove,
      searchString,
      setFilteredItems,
      setItems,
      handleSearchStringChange,
      handleItemSelection,
    } = useMultiSelect(userService.getFilteredUsersByTeamId, teamId, (users: any) =>
      users?.map((user: any) => ({ scorer: user, goals: 0, id: user.id }))
    );

    const getUsersByTeam = async () => {
      const usersByTeam = await userService.getUsersByTeam(teamId);
      const mappedUsers = usersByTeam?.map((user) => ({ scorer: user, goals: 0, id: user.id }));
      setItems(mappedUsers);
      setFilteredItems(mappedUsers);
    };

    const getScorersTotalGoals = (items: BracketScorer[]) => {
      return items.reduce((previousValue, newValue, index) => {
        return (previousValue += newValue?.goals || 0);
      }, 0);
    };

    const addGoalToScorer = (event: any, item: BracketScorer) => {
      event.preventDefault();
      event.stopPropagation();
      setSelectedItems((current: BracketScorer[]) => {
        return current.map((scorer: BracketScorer) => {
          if (scorer?.id === item?.id) {
            return {
              ...scorer,
              goals: getScorersTotalGoals(current) >= (teamGoals || 0) ? scorer?.goals || 0 : (scorer?.goals || 0) + 1,
            };
          } else {
            return scorer;
          }
        });
      });
    };

    const subtractGoalToScorer = (event: any, item: BracketScorer) => {
      event.preventDefault();
      event.stopPropagation();
      setSelectedItems((current: BracketScorer[]) => {
        return current.map((scorer: BracketScorer) => {
          if (scorer?.id === item?.id) {
            return {
              ...scorer,
              goals: (scorer?.goals || 0) <= 0 ? 0 : (scorer?.goals || 1) - 1,
            };
          } else {
            return scorer;
          }
        });
      });
    };

    useEffect(() => {
      getUsersByTeam();
      setServiceParam(teamId);
    }, [teamId]);

    useLayoutEffect(() => {
      setDropdownMarginTop(localRef?.current?.getBoundingClientRect()?.height);
    }, [localRef?.current?.getBoundingClientRect()]);

    useEffect(() => {
      onChange(selectedItems);
    }, [selectedItems]);

    return (
      <div className="w-full my-3" onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter}>
        <div className="w-full">
          <div className="flex flex-col items-center relative">
            <div className="w-full">
              <div
                ref={assignRefs(localRef, ref)}
                onClick={() => toggleSelectOpen()}
                className="rounded-lg border border-gray-300 shadow-sm text-sm text-gray-400 p-2 min-h-fit max-h-fit w-full"
              >
                <div className="flex flex-col flex-auto flex-wrap">
                  {selectedItems?.map((item: BracketScorer, index: number) => (
                    <div
                      key={index}
                      className="flex justify-center m-1 w-80 max-w-full font-medium py-1 pl-3 rounded-md text-slate-500 ring-1 ring-sky-500 "
                    >
                      <div className="flex flex-row items-center justify-start gap-2 h-10">
                        {item?.scorer?.avatar ? (
                          <img src={item?.scorer?.avatar} className="rounded-full h-8 w-8 aspect-square" />
                        ) : (
                          <svg
                            className="h-8 w-8 aspect-square rounded-full text-gray-300"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        )}
                        <div className="text-m font-normal leading-none max-w-full flex-initial">
                          {item?.scorer?.name}
                        </div>
                      </div>
                      <div className="flex flex-row items-center justify-start ml-2 gap-2 px-2 py-1 rounded-md">
                        <button
                          onClick={(event) => subtractGoalToScorer(event, item)}
                          type="button"
                          className={classNames(
                            (item.goals || 0) <= 0
                              ? 'text-gray-400 ring-gray-400'
                              : 'text-red-500 ring-red-500 hover:ring-2 active:ring-red-300',
                            'p-1 rounded-md ring-1'
                          )}
                        >
                          <MinusIcon className="w-4 h-4" />
                        </button>
                        <div className="mx-1 text-regular">{item.goals}</div>
                        <button
                          onClick={(event) => addGoalToScorer(event, item)}
                          type="button"
                          className={classNames(
                            getScorersTotalGoals(selectedItems) >= (teamGoals || 0)
                              ? 'text-gray-400 ring-gray-400'
                              : 'text-green-500 ring-green-500 hover:ring-2 active:ring-green-300',
                            'p-1 rounded-md ring-1'
                          )}
                        >
                          <PlusIcon className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex flex-auto flex-row-reverse items-center">
                        <div
                          onClick={(event) => handleRemove(event, item?.id)}
                          className="right-0 h-fit text-rose-500 hover:ring-1 hover:ring-rose-500 rounded-md p-0.5 mr-2"
                        >
                          <XIcon className="feather feather-x cursor-pointer w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="flex-1">
                    <input
                      value={searchString}
                      onChange={handleSearchStringChange}
                      placeholder={'Add scorers...'}
                      className="bg-transparent py-2 px-2  appearance-none outline-none h-full w-full text-gray-800 placeholder:text-gray-300 placeholder:text-base "
                    />
                  </div>
                </div>
              </div>
            </div>
            {selectOpen && (
              <div
                style={{ marginTop: dropdownMarginTop || 128 }}
                className={classNames(
                  filteredItems?.length > 0 ? '' : '',
                  'absolute ml-0.5 max-h-64 overflow-y-scroll shadow-lg bg-slate-50 z-50 w-[99%] left-0 rounded-b-lg'
                )}
              >
                <div className="flex flex-col w-full overflow-y-scroll">
                  {filteredItems?.map((item: BracketScorer, index: number) => (
                    <div
                      key={index}
                      onClick={() => {
                        handleItemSelection(item.id);
                        setSelectOpen(false);
                      }}
                      className="cursor-pointer w-full border-gray-100 rounded-b hover:bg-sky-100"
                    >
                      <div
                        className={classNames(
                          selectedItems.some((selectedItem: BracketScorer) => item.id === selectedItem.id)
                            ? 'border-l-4 border-sky-500'
                            : '',
                          'flex w-full items-center p-2 pl-2 border-transparent relative'
                        )}
                      >
                        <div className="w-full items-center flex">
                          <div className="mx-2 leading-6 text-sm">{item?.scorer?.name} </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);
