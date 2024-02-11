import { createContext, useState } from "react";
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

  const handleChangeSearchText = (newSearchText: string) => {
    setSearchText(newSearchText);
  };

  return (
    <SearchTextContext.Provider
      value={{ searchText, debouncedSearchText, handleChangeSearchText }}
    >
      {children}
    </SearchTextContext.Provider>
  );
}
