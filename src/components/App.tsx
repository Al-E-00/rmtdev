import { useEffect, useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";

function App() {
  const [jobItems, setJobItems] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (!searchText) return;

    const fetchData = async () => {
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
      }
    };

    fetchData();

    return () => {
      setJobItems([]);
    };
  }, [searchText]);

  return (
    <>
      <Background />

      <Header searchText={searchText} setSearchText={setSearchText} />

      <Container jobItems={jobItems} />

      <Footer />
    </>
  );
}

export default App;
