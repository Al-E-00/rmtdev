import { useState } from "react";

export default function SearchForm() {
  const [searchText, setSearchText] = useState("");
  const [responseData, setResponseData] = useState([]);

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleFormInput = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchText(event.target.value);

    const searchApiAdderss = `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`;

    try {
      const response = await fetch(searchApiAdderss);
      if (!response.ok) {
        throw new Error("Network response error");
      }

      const data = await response.json();
      const jobItems = data.jobItems;

      setResponseData(jobItems);
    } catch {
      throw new Error("Error fetching data from the server");
    }
  };

  return (
    <form onSubmit={onFormSubmit} action="#" className="search">
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
        onChange={handleFormInput}
        value={searchText}
      />
    </form>
  );
}
