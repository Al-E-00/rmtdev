import JobListItem from "./JobListItem";
import Spinner from "./Spinner";
import { TJobItem } from "./lib/types";

type TJobListProps = {
  jobItems: TJobItem[];
  isLoading: boolean;
};

export function JobList({ jobItems, isLoading }: TJobListProps) {
  return (
    <ul className="job-list">
      {isLoading && <Spinner />}

      {jobItems.map((jobItem: TJobItem) => (
        <JobListItem key={jobItem.id} jobItem={jobItem} />
      ))}
    </ul>
  );
}

export default JobList;
