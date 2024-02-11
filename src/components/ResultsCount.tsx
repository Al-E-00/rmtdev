import { useJobItemsContext } from "./lib/hooks";

export default function ResultsCount() {
  const { totalNumberOfResults } = useJobItemsContext();

  return (
    <p className="count">
      <span className="u-bold">{totalNumberOfResults}</span>{" "}
      {`result${totalNumberOfResults > 1 ? "s" : ""}`}
    </p>
  );
}
