import { createContext } from "react";
import { useJobItems, useLocalStorage } from "../components/lib/hooks";

type TBookmarksContext = {
  handleToggleBookmark: (id: number) => void;
  bookmarkedIds: number[];
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

  const handleToggleBookmark = (id: number) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds((prev) => prev.filter((item) => item !== id));
    } else {
      setBookmarkedIds((prev) => [...prev, id]);
    }
  };

  return (
    <BookmarksContext.Provider
      value={{
        bookmarkedIds,
        handleToggleBookmark,
        bookmarkedJobItems,
        isLoading,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}
