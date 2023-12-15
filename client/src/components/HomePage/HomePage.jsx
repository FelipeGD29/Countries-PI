import SearchBar from "../SearchBar/SearchBar";
import Cards from "../Cards/Cards";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import style from "./HomePage.module.css";

const HomePage = () => {
  const countries = useSelector((state) => state.countries);
  const [currentPage, setCurrentPage] = useState(0);

  let nextPage = () => {
    if (countries.length <= currentPage + 10) {
      setCurrentPage(currentPage);
    } else setCurrentPage(currentPage + 10);
  };

  let prevPage = () => {
    if (currentPage < 9) {
      setCurrentPage(0);
    } else {
      setCurrentPage(currentPage - 10);
    }
  };

  const firstPage = () => {
    setCurrentPage(0);
  };

  const lastPage = () => {
    setCurrentPage(countries.length - 10);
  };

  useEffect(() => {
    firstPage();
  }, [countries]);
  
  const filteredCountries = countries.slice(currentPage, currentPage + 10);
  return (
    <div className={style.content}>
      <SearchBar />
      <Cards nextPage={nextPage} prevPage={prevPage} firstPage={firstPage} lastPage={lastPage} filteredCountries={filteredCountries} />
    </div>
  );
};

export default HomePage;
