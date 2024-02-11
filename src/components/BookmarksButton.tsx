import { TriangleDownIcon } from "@radix-ui/react-icons";
import BookmarksPopover from "./BookmarksPopover";
import { useEffect, useRef, useState } from "react";

export default function BookmarksButton() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement &&
        !buttonRef.current?.contains(e.target) &&
        !popoverRef.current?.contains(e.target)
      ) {
        setIsPopoverOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

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
