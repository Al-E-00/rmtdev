import { createContext, useCallback, useMemo } from "react";
import { useJobItems, useLocalStorage } from "../components/lib/hooks";
import { TJobDetails } from "../components/lib/types";

type TBookmarksContext = {
  handleToggleBookmark: (id: number) => void;
  bookmarkedIds: number[];
  bookmarkedJobItems: TJobDetails[];
  isLoading: boolean;
};

export const BookmarksContext = createContext<TBookmarksContext | null>(null);

type TBookmarkContext = {
  children: React.ReactNode;
};

export default function BookmarksContextProvider({
  children,
}: TBookmarkContext) {
  const [bookmarkedIds, setBookmarkedIds] = useLocalStorage<number[]>(
    "bookmarkedIds",
    []
  );

  const [bookmarkedJobItems, isLoading] = useJobItems(bookmarkedIds);

  const handleToggleBookmark = useCallback(
    (id: number) => {
      if (bookmarkedIds.includes(id)) {
        setBookmarkedIds((prev) => prev.filter((item) => item !== id));
      } else {
        setBookmarkedIds((prev) => [...prev, id]);
      }
    },
    [bookmarkedIds, setBookmarkedIds]
  );

  const contextValue = useMemo(
    () => ({
      bookmarkedIds,
      handleToggleBookmark,
      bookmarkedJobItems,
      isLoading,
    }),
    [bookmarkedIds, handleToggleBookmark, bookmarkedJobItems, isLoading]
  );

  return (
    <BookmarksContext.Provider value={contextValue}>
      {children}
    </BookmarksContext.Provider>
  );
}
