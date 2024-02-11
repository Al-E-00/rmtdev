import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useBookmarksContext } from "./lib/hooks";

type TBookmarkIconProp = {
  id: number | undefined;
};

export default function BookmarkIcon({ id }: TBookmarkIconProp) {
  const { bookmarkedIds, handleToggleBookmark } = useBookmarksContext();
  if (!id) return;

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
