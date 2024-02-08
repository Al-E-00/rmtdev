import { TSortBy } from "./lib/types";

type TSortingControlsProps = {
  onClick: (sorting: TSortBy) => void;
  sortBy: TSortBy;
};

export default function SortingControls({
  onClick,
  sortBy,
}: TSortingControlsProps) {
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>
      <SortingButtons
        isActive={sortBy === "relevant"}
        onClick={() => onClick("relevant")}
      >
        Relevant
      </SortingButtons>
      <SortingButtons
        isActive={sortBy === "recent"}
        onClick={() => onClick("recent")}
      >
        Recent
      </SortingButtons>
    </section>
  );
}

type TSortingButtons = {
  isActive: boolean;
  onClick: () => void;
  children: string;
};

function SortingButtons({ isActive, onClick, children }: TSortingButtons) {
  return (
    <button
      onClick={onClick}
      className={`sorting__button sorting__button--recent ${
        isActive ? "sorting__button--active" : ""
      }`}
    >
      {children}
    </button>
  );
}
