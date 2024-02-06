import { useEffect, useState } from "react";

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const jobItemsSliced = jobItems.slice(0, 7);

  useEffect(() => {
    if (!searchText) return;

    const fetchData = async () => {
      setIsLoading(true);
      const searchApiAdderss = `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`;

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

  return { jobItemsSliced, isLoading };
}
