import { TriangleDownIcon } from "@radix-ui/react-icons";
import BookmarksPopover from "./BookmarksPopover";
import { useRef, useState } from "react";
import { useOnClickOutside } from "./lib/hooks";

export default function BookmarksButton() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useOnClickOutside([buttonRef, popoverRef], () => setIsPopoverOpen(false));

  return (
    <section>
      <button
        ref={buttonRef}
        onClick={() => setIsPopoverOpen((prev) => !prev)}
        className="bookmarks-btn"
      >
        Bookmarks <TriangleDownIcon />
      </button>

      {isPopoverOpen && <BookmarksPopover ref={popoverRef} />}
    </section>
  );
}
