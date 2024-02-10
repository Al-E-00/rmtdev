import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useContext } from "react";
import { BookmarksContext } from "../context/BookmarksContextProvider";

type TBookmarkIconProp = {
  id: number;
};

export default function BookmarkIcon({ id }: TBookmarkIconProp) {
  const { handleToggleBookmark, bookmarkedIds } = useContext(BookmarksContext);

  const isFilled = bookmarkedIds.includes(id);

  return (
    <button
      onClick={(e) => {
        handleToggleBookmark(id);
        e.stopPropagation();
        e.preventDefault();
      }}
      className="bookmark-btn"
    >
      <BookmarkFilledIcon className={`${isFilled ? "filled" : ""}`} />
    </button>
  );
}
