import { useJobItemsContext } from "./lib/hooks";

export default function SortingControls() {
  const { sortBy, handleChangeSortBy } = useJobItemsContext();

  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>
      <SortingButtons
        isActive={sortBy === "relevant"}
        onClick={() => handleChangeSortBy("relevant")}
      >
        Relevant
      </SortingButtons>
      <SortingButtons
        isActive={sortBy === "recent"}
        onClick={() => handleChangeSortBy("recent")}
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
