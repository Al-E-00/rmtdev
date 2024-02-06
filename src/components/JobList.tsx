import JobListItem from "./JobListItem";
import { TJobItem, TJobItemsProps } from "./types/types";

export function JobList({ jobItems }: TJobItemsProps) {
  return (
    <ul className="job-list">
      {jobItems.map((jobItem: TJobItem) => (
        <JobListItem key={jobItem.id} jobItem={jobItem} />
      ))}
    </ul>
  );
}

export default JobList;
