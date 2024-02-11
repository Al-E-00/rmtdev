import { createContext, useCallback, useMemo, useState } from "react";
import { useSearchQuery, useSearchTextContext } from "../components/lib/hooks";
import { TJobItem, TPageDirection, TSortBy } from "../components/lib/types";
import { RESULTS_PER_PAGE } from "../components/lib/constants";

type TJobItemsContext = {
  jobItems: TJobItem[] | undefined;
  isLoading: boolean;
  currentPage: number;
  sortBy: TSortBy;
  jobItemsSorted: TJobItem[];
  jobItemsSliced: TJobItem[];
  totalNumberOfResults: number;
  totalNumberOfPages: number;
  handleChangePage: (direction: TPageDirection) => void;
  handleChangeSortBy: (newSortBy: TSortBy) => void;
};

export const JobItemsContext = createContext<TJobItemsContext | null>(null);

type TJobItemsContextProvider = {
  children: React.ReactNode;
};

export default function JobItemsContextProvider({
  children,
}: TJobItemsContextProvider) {
  //dependency on other context
  const { debouncedSearchText } = useSearchTextContext();

  //states
  const { jobItems, isLoading } = useSearchQuery(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<TSortBy>("relevant");

  //derived / computed state
  const jobItemsSorted = useMemo(
    () =>
      [...(jobItems || [])].sort((a, b) => {
        if (sortBy === "relevant") {
          return b.relevanceScore - a.relevanceScore;
        } else {
          return a.daysAgo - b.daysAgo;
        }
      }) || [],
    [jobItems, sortBy]
  );
  const jobItemsSliced = useMemo(
    () =>
      jobItemsSorted.slice(
        (currentPage - 1) * RESULTS_PER_PAGE,
        currentPage * RESULTS_PER_PAGE
      ) || [],
    [jobItemsSorted, currentPage]
  );
  const totalNumberOfResults = jobItems?.length || 0;
  const totalNumberOfPages = Math.ceil(totalNumberOfResults / RESULTS_PER_PAGE);

  //event handlers / actions
  const handleChangePage = useCallback((direction: TPageDirection) => {
    if (direction === "prev") {
      setCurrentPage((prev) => prev - 1);
    } else if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    }
  }, []);

  const handleChangeSortBy = useCallback((newSortBy: TSortBy) => {
    setCurrentPage(1);
    setSortBy(newSortBy);
  }, []);

  const contextValue = useMemo(
    () => ({
      jobItems,
      isLoading,
      currentPage,
      sortBy,
      jobItemsSorted,
      jobItemsSliced,
      totalNumberOfResults,
      totalNumberOfPages,
      handleChangePage,
      handleChangeSortBy,
    }),
    [
      jobItems,
      isLoading,
      currentPage,
      sortBy,
      jobItemsSorted,
      jobItemsSliced,
      totalNumberOfResults,
      totalNumberOfPages,
      handleChangePage,
      handleChangeSortBy,
    ]
  );

  return (
    <JobItemsContext.Provider value={contextValue}>
      {children}
    </JobItemsContext.Provider>
  );
}
