import { createContext, useEffect, useState } from "react";

export const BookmarksContext = createContext(null);

type TBookmarkContext = {
  children: React.ReactNode;
};

export default function BookmarksContextProvider({
  children,
}: TBookmarkContext) {
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>(() =>
    JSON.parse(localStorage.getItem("bookmarkedIds") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("bookmarkedIds", JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  const handleToggleBookmark = (id: number) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds((prev) => prev.filter((item) => item !== id));
    } else {
      setBookmarkedIds((prev) => [...prev, id]);
    }
  };

  return (
    <BookmarksContext.Provider
      value={{ handleToggleBookmark, bookmarkedIds, setBookmarkedIds }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}
