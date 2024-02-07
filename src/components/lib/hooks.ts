import { useEffect, useState } from "react";
import { TJobDetails, TJobItem } from "./types";
import { BASE_API_URL } from "./constants";
import { useQuery } from "@tanstack/react-query";

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<TJobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const totalNumberOfResults = jobItems.length;

  const jobItemsSliced = jobItems.slice(0, 7);

  useEffect(() => {
    if (!searchText) return;

    const fetchData = async () => {
      setIsLoading(true);
      const searchApiAdderss = `${BASE_API_URL}?search=${searchText}`;

      try {
        const response = await fetch(searchApiAdderss);
        if (!response.ok) {
          throw new Error("Network response error");
        }

        const data = await response.json();
        const jobItems = data.jobItems;

        setJobItems(jobItems);
      } catch {
        throw new Error("Error fetching data from the server");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      setJobItems([]);
    };
  }, [searchText]);

  return { jobItemsSliced, isLoading, totalNumberOfResults } as const;
}

type TFetchJobItem = {
  public: boolean;
  jobItem: TJobDetails | null;
};

const fetchJobItem = async (id: number): Promise<TFetchJobItem> => {
  const response = await fetch(`${BASE_API_URL}/${id}`);
  const data = await response.json();
  console.log(data);

  return data;
};

export function useJobDetails(id: number | null) {
  const { data, isInitialLoading } = useQuery(
    ["job-item", id],
    () => (id ? fetchJobItem(id) : null),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
      onError: (error) => {},
    }
  );

  const jobItem = data?.jobItem;
  return [jobItem, isInitialLoading] as const;
}

export function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const id = +window.location.hash.slice(1);
      setActiveId(id);
    };
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return activeId;
}

export function useActiveJobItem() {
  const activeId = useActiveId();
  const [jobDetail, isLoading] = useJobDetails(activeId);

  return [jobDetail, isLoading] as const;
}

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return debouncedValue;
}
