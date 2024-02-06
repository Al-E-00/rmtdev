import { useEffect, useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import Logo from "./Logo";
import BookmarksButton from "./BookmarksButton";
import SearchForm from "./SearchForm";
import Sidebar, { SidebarTop } from "./Sidebar";
import JobItemContent from "./JobItemContent";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import JobList from "./JobList";
import PaginationControls from "./PaginationControls";

function App() {
  const [jobItems, setJobItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <>
      <Background />

      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>

        <SearchForm searchText={searchText} setSearchText={setSearchText} />
      </Header>

      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount />
            <SortingControls />
          </SidebarTop>

          <JobList jobItems={jobItems} isLoading={isLoading} />
          <PaginationControls />
        </Sidebar>
        <JobItemContent />
      </Container>

      <Footer />
    </>
  );
}

export default App;
