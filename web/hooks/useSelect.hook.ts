import { SelectItem } from 'models/select-item.model';
import { MouseEvent, ChangeEvent, useState, useEffect } from 'react';

export const useSelect = (getFilteredItemsFromService: any) => {
  const [items, setItems] = useState<any>(null);
  const [selectedItem, setSelectedItem] = useState<any>();
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
    if (selectedItem?.id === id) {
      removeItem();
    } else {
      const item = items?.find((itemInArray: any) => itemInArray.id === id);
      if (item) {
        setSelectedItem(item);
      }
      setSelectOpen(false);
    }
  };

  const removeItem = () => {
    setSelectedItem(undefined);
  };

  const handleSearchStringChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
  };

  const handleRemove = (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, id: number) => {
    event.preventDefault();
    event.stopPropagation();
    removeItem();
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
      const filteredItems = await getFilteredItemsFromService(searchString);
      setFilteredItems(filteredItems);
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
    selectedItem,
    setSelectedItem,
    items,
    setItems,
    handleItemSelection,
  };
};
