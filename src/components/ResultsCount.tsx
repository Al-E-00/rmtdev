type TResultsCountProps = {
  totalNumberOfResults: number;
};

export default function ResultsCount({
  totalNumberOfResults,
}: TResultsCountProps) {
  return (
    <p className="count">
      <span className="u-bold">{totalNumberOfResults}</span>{" "}
      {`result${totalNumberOfResults > 1 ? "s" : ""}`}
    </p>
  );
}
