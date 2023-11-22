import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [name, setName] = useState("");
  const [previousName, setPreviousName] = useState([]);
  const handleChange = (event) => {
    setPreviousName(...previousName, event.target.value);
    setName(event.target.value);
  };
  return (
    <div>
      <input
        type="search"
        onChange={handleChange}
        value={name}
        placeholder="Enter a country name"
      />
      <button onClick={() => onSearch(name)}>
        Agregar
      </button>
    </div>
  );
};

export default SearchBar;
