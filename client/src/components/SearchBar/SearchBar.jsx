import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getName,
  getCountries,
  orderAlphabetically,
  filterContinent,
  orderPopulation,
} from "../../redux/actions/actions";
import { Link } from "react-router-dom";
import style from "./SearchBar.module.css";

const SearchBar = () => {
  const [name, setName] = useState("");
  const [previousName, setPreviousName] = useState([]);
  const handleChange = (event) => {
    setPreviousName(...previousName, event.target.value);
    setName(event.target.value);
  };

  const dispatch = useDispatch();

  const onSearch = () => {
    dispatch(getName(name));
  };

  const showAllCountries = () => {
    const fetchCountries = async () => {
      await dispatch(getCountries());
      await dispatch(orderAlphabetically("A"));
    };
    fetchCountries();
  };

  const handleOrder = (event) => {
    if (event.target.name === "orderAlphabetically")
      dispatch(orderAlphabetically(event.target.value));
    if (event.target.name === "orderPopulation")
      dispatch(orderPopulation(event.target.value));
  };

  const handleContinent = (event) => {
    if (event.target.value === "All") dispatch(getCountries());
    dispatch(filterContinent(event.target.value));
  };

  return (
    <div className={style.container}>
      <Link to="/activities">
        <button className={style.button}>Activities</button>
      </Link>
      <div className={style.searchBar}>
        <input
          type="search"
          onChange={handleChange}
          value={name}
          placeholder="Enter a country name"
          autoComplete="off"
          className={style.input}
        />
        <button onClick={onSearch} className={style.button}>
          Search
        </button>
        <button onClick={showAllCountries} className={style.button}>
          Show All
        </button>
      </div>
      <div>
        <label>Alphabetically</label>
        <select
        className={style.select}
          name="orderAlphabetically"
          id="orderAlphabetically"
          onChange={handleOrder}
        >
          <option value="A">A-Z</option>
          <option value="D">Z-A</option>
        </select>

        <label>Population</label>
        <select
        className={style.select}
        name="orderPopulation"
        id="orderPopulation"
        onChange={handleOrder}
        >
          <option value="A">Ascendent</option>
          <option value="D">Descendent</option>
        </select>

        <label>Filter by Continent</label>
        <select
        className={style.select}
        name="continent"
        id="continent"
        onChange={handleContinent}
        >
          <option value="All">All</option>
          <option value="North America">North America</option>
          <option value="South America">South America</option>
          <option value="Europe">Europe</option>
          <option value="Asia">Asia</option>
          <option value="Oceania">Oceania</option>
          <option value="Antartica">Antartica</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
