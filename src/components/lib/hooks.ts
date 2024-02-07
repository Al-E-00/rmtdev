import { useEffect, useState } from "react";
import { TJobDetails, TJobItem } from "./types";
import { BASE_API_URL } from "./constants";

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

  return [jobItemsSliced, isLoading, totalNumberOfResults] as const;
}

export function useJobDetails(id: number | null) {
  const [isLoading, setIsLoading] = useState(false);
  const [jobDetail, setJobDetail] = useState<TJobDetails | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_API_URL}/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const jobDetail = await response.json();
        setJobDetail(jobDetail.jobItem);
      } catch {
        throw new Error("Network response was not ok");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [id]);

  return [jobDetail, isLoading] as const;
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
