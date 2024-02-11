import { createContext, useCallback, useMemo, useState } from "react";
import { useDebounce } from "../components/lib/hooks";

type TSearchContext = {
  searchText: string;
  debouncedSearchText: string;
  handleChangeSearchText: (newSearchText: string) => void;
};

export const SearchTextContext = createContext<TSearchContext | null>(null);

type TSearchContextProvider = {
  children: React.ReactNode;
};

export default function SearchTextContextProvider({
  children,
}: TSearchContextProvider) {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 250);

  const handleChangeSearchText = useCallback((newSearchText: string) => {
    setSearchText(newSearchText);
  }, []);

  const contextValue = useMemo(
    () => ({
      searchText,
      debouncedSearchText,
      handleChangeSearchText,
    }),
    [searchText, debouncedSearchText, handleChangeSearchText]
  );

  return (
    <SearchTextContext.Provider value={contextValue}>
      {children}
    </SearchTextContext.Provider>
  );
}
