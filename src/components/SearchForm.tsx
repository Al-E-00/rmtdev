import { useSearchTextContext } from "./lib/hooks";

export default function SearchForm() {
  const { searchText, handleChangeSearchText } = useSearchTextContext();
  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleFormInput = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleChangeSearchText(event.target.value);
  };

  return (
    <form onSubmit={onFormSubmit} action="#" className="search">
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        name="search"
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
