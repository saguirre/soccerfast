import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  MouseEvent,
  MutableRefObject,
  Ref,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { useTranslation } from 'next-i18next';
import { ChevronUpIcon } from '@heroicons/react/outline';
import { ChevronDownIcon, XIcon } from '@heroicons/react/solid';

import { classNames } from '@utils';
import { SelectItem } from '@models/*';

export interface FormMultiSelectProps {
  handleMouseLeave: (event: MouseEvent) => void;
  handleMouseEnter: (event: MouseEvent) => void;
  toggleSelectOpen: () => void;
  handleRemove: (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, id: number) => void;
  handleItemSelection: (id: number) => void;
  selectOpen: boolean;
  selectedItems: SelectItem[];
  items: SelectItem[];
  searchString: string;
  handleSearchStringChange: (event: ChangeEvent<HTMLInputElement>) => void;
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

export const FormMultiSelect = forwardRef<HTMLDivElement, FormMultiSelectProps>(
  (
    {
      selectOpen,
      selectedItems,
      items,
      searchString,
      handleMouseEnter,
      handleMouseLeave,
      handleItemSelection,
      handleSearchStringChange,
      toggleSelectOpen,
      handleRemove,
    },
    ref
  ) => {
    const { t } = useTranslation('common');
    const localRef = useRef<HTMLDivElement | null>(null);
    const [dropdownMarginTop, setDropdownMarginTop] = useState<number | undefined>(56);

    useLayoutEffect(() => {
      setDropdownMarginTop(localRef?.current?.getBoundingClientRect()?.height);
    }, [selectedItems]);

    return (
      <div
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        className="col-span-12 mb-6 flex flex-col items-center h-12 mx-auto"
      >
        <div className="w-full">
          <div className="flex flex-col items-center relative">
            <div className="w-full">
              <div
                ref={assignRefs(localRef, ref)}
                onClick={() => toggleSelectOpen()}
                className="my-2 p-1 flex border border-gray-300 shadow-sm bg-white rounded-md"
              >
                <div className="flex flex-auto flex-wrap">
                  {selectedItems?.map((item: SelectItem, index: number) => (
                    <div
                      key={index}
                      className="flex justify-center items-center m-1 font-medium py-1 px-2 rounded-md text-sky-500 ring-1 ring-sky-500 "
                    >
                      <div className="text-xs font-normal leading-none max-w-full flex-initial">{item?.name}</div>
                      <div className="flex flex-auto flex-row-reverse">
                        <div onClick={(event) => handleRemove(event, item.id)}>
                          <XIcon className="feather feather-x cursor-pointer text-sky-500 hover:text-sky-400 rounded-full w-4 h-4 ml-2" />
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="flex-1">
                    <input
                      value={searchString}
                      onChange={handleSearchStringChange}
                      placeholder={t('multiselect.placeholder')}
                      className="bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-gray-800 placeholder:text-gray-300 placeholder:text-base "
                    />
                  </div>
                </div>
                <div className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200">
                  <button
                    type="button"
                    className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none"
                  >
                    {selectOpen ? (
                      <ChevronUpIcon className="feather feather-chevron-up w-4 h-4" />
                    ) : (
                      <ChevronDownIcon className="feather feather-chevron-up w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            {selectOpen && (
              <div
                style={{ marginTop: (dropdownMarginTop || 56) + 10 }}
                className="absolute max-h-64 overflow-y-scroll shadow-lg bg-white z-50 w-full left-0 rounded"
              >
                <div className="flex flex-col w-full overflow-y-scroll">
                  {items?.map((item: SelectItem, index: number) => (
                    <div
                      key={index}
                      onClick={() => handleItemSelection(item.id)}
                      className="cursor-pointer w-full border-gray-100 rounded-b hover:bg-sky-100"
                    >
                      <div
                        className={classNames(
                          selectedItems?.some((selectedItem: SelectItem) => item.id === selectedItem.id)
                            ? 'border-l-4 border-sky-500'
                            : '',
                          'flex w-full items-center p-2 pl-2 border-transparent relative'
                        )}
                      >
                        <div className="w-full items-center flex">
                          <div className="mx-2 leading-6">{item?.name} </div>
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
