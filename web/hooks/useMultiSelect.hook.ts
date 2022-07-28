import { MouseEvent, ChangeEvent, useState, useEffect } from 'react';

export const useMultiSelect = (getFilteredItemsFromService: any) => {
  const [items, setItems] = useState<any>(null);
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [filteredItems, setFilteredItems] = useState<any>(null);
  const [isOverSelect, setIsOverSelect] = useState<boolean>(false);
  const [selectOpen, setSelectOpen] = useState<boolean>(false);
  const [searchString, setSearchString] = useState<string>('');

  const handleMouseEnter = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setIsOverSelect(true);
  };

  const toggleSelectOpen = () => {
    setSelectOpen((current) => !current);
  };

  const handleItemSelection = (id: number) => {
    console.log('Handleselectionnn', id)

    console.log("selectedItems: ", selectedItems)
    console.log("items: ", items)
    if (selectedItems.some((selectedItem: any) => selectedItem.id === id)) {
      removeItem(id);
    } else {
      const item = items?.find((itemInArray: any) => itemInArray.id === id);
      if (item) {
        setSelectedItems((current: any) => [...current, item]);
      }
    }
  };

  const removeItem = (id: number) => {
    setSelectedItems((current: any) => {
      return current.filter((currentTeam: any) => currentTeam.id !== id);
    });
  };

  const handleSearchStringChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
  };

  const handleRemove = (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, id: number) => {
    event.preventDefault();
    event.stopPropagation();
    removeItem(id);
  };

  const handleMouseLeave = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setIsOverSelect(false);
  };

  const handleFocus = () => {
    if (!isOverSelect) {
      setSelectOpen(false);
    }
  };

  const getFilteredItems = async (searchString?: string) => {
    if (!searchString?.length) {
      setFilteredItems(items);
    } else {
      setSelectOpen(true);
      console.log('searchString: ', searchString);
      setFilteredItems(await getFilteredItemsFromService(searchString));
    }
  };

  useEffect(() => {
    getFilteredItems(searchString);
  }, [searchString]);

  return {
    selectOpen,
    setSelectOpen,
    isOverSelect,
    toggleSelectOpen,
    setIsOverSelect,
    handleFocus,
    handleMouseEnter,
    handleMouseLeave,
    handleRemove,
    searchString,
    handleSearchStringChange,
    filteredItems,
    setFilteredItems,
    selectedItems,
    setSelectedItems,
    items,
    setItems,
    handleItemSelection,
  };
};
