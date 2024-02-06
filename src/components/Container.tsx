import JobItemContent from "./JobItemContent";
import Sidebar from "./Sidebar";
import { TJobItemsProps } from "./types/types";

export default function Container({ jobItems }: TJobItemsProps) {
  return (
    <div className="container">
      <Sidebar jobItems={jobItems} />
      <JobItemContent />
    </div>
  );
}
