import { TriangleDownIcon } from "@radix-ui/react-icons";
import BookmarksPopover from "./BookmarksPopover";
import { useState } from "react";

export default function BookmarksButton() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <section>
      <button
        onClick={() => setIsPopoverOpen((prev) => !prev)}
        className="bookmarks-btn"
      >
        Bookmarks <TriangleDownIcon />
      </button>

      {isPopoverOpen && <BookmarksPopover />}
    </section>
  );
}
