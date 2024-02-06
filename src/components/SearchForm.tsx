type TSearchFormProps = {
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  searchText: string;
};

export default function SearchForm({
  setSearchText,
  searchText,
}: TSearchFormProps) {
  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleFormInput = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchText(event.target.value);
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
