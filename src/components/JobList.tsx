import JobListItem from "./JobListItem";
import Spinner from "./Spinner";
import { useActiveId } from "./lib/hooks";
import { TJobItem } from "./lib/types";

type TJobListProps = {
  jobItems: TJobItem[];
  isLoading: boolean;
};

export function JobList({ jobItems, isLoading }: TJobListProps) {
  const activeId = useActiveId();

  return (
    <ul className="job-list">
      {isLoading ? (
        <Spinner />
      ) : (
        jobItems.map((jobItem: TJobItem) => {
          const isActive = jobItem.id === activeId;

          return (
            <JobListItem
              key={jobItem.id}
              jobItem={jobItem}
              isActive={isActive}
            />
          );
        })
      )}
    </ul>
  );
}

export default JobList;
