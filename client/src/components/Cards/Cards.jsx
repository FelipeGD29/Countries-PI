import Card from "../Card/Card";
import style from "./Cards.module.css";

const Cards = ({firstPage, prevPage, nextPage, lastPage, filteredCountries}) => {
  return (
    <div>
      <div>
        <button onClick={firstPage} className={style.button}>
          {"First Page"}
        </button>
        <button onClick={prevPage} className={style.button}>
          {"Before"}
        </button>
        <button onClick={nextPage} className={style.button}>
          {"Next"}
        </button>
        <button onClick={lastPage} className={style.button}>
          {"Last page"}
        </button>
      </div>
      <div className={style.container}>
        {filteredCountries?.map((country) => (
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
