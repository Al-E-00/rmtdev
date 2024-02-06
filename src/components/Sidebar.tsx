import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import { TJobItemsProps } from "./types/types";

export default function Sidebar({ jobItems }: TJobItemsProps) {
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <ResultsCount />
        <SortingControls />
      </div>

      <JobList jobItems={jobItems} />
      <PaginationControls />
    </div>
  );
}
