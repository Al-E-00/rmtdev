import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useBookmarksContext } from "../context/BookmarksContextProvider";

type TBookmarkIconProp = {
  id: number;
};

export default function BookmarkIcon({ id }: TBookmarkIconProp) {
  const { bookmarkedIds, handleToggleBookmark } = useBookmarksContext();

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
