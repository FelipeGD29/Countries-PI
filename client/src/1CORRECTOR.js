import Card from "../Card/Card";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import style from "./Cards.module.css";

const Cards = () => {
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
    console.log(currentPage);
  };

  useEffect(() => {
    firstPage();
  }, [countries]);

  const filteredCountries = countries.slice(currentPage, currentPage + 10);

  return (
    <div>
      <div className={style.pageBtns}>
        <button onClick={firstPage} className={style.button}>
          {"First Page"}
        </button>
        <button onClick={prevPage} className={style.button}>
          {"Befor"}
        </button>
        <button onClick={nextPage} className={style.button}>
          {"Next"}
        </button>
        <button onClick={lastPage} className={style.button}>
          {"Last page"}
        </button>
      </div>
      <div className={style.container}>
        {filteredCountries.map((country) => (
          <Card
            key={country.ID}
            ID={country.ID}
            flag={country.flag}
            name={country.name}
            continent={country.continent}
          />
        ))}
      </div>
    </div>
  );
};

export default Cards;
