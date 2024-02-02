import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions/actions";
import { Link } from "react-router-dom";
import style from "./Detail.module.css"
const Detail = () => {
  const countryDetail = useSelector((state) => state.countryDetail);
  const dispatch = useDispatch();

  let { ID } = useParams();
  useEffect(() => {
    dispatch(getDetail(ID));
  }, [ID]);

  return (
    <div className={style.container}>
      <Link to="/home">
      <button>Home</button>
      </Link>

      <h1>{countryDetail.ID}</h1>

      <h1>Country Name: {countryDetail.name}</h1>

      <img
        src={countryDetail.flag}
        alt={countryDetail.name && countryDetail.name}
      />

      <h2>
        Continent: {countryDetail.name} belongs to the continent of{" "}
        {countryDetail.continent}
      </h2>

      {countryDetail.capital !== "none" ? (
        <h2>Capital: It's capital is called {countryDetail.capital}</h2>
      ) : (
        <h2>Capital: {countryDetail.name} doesn't have a capital</h2>
      )}

      <h2>
        Subregion: It's placed in the subregion of {countryDetail.subregion}
      </h2>

      {countryDetail.area ? (
        <h2>Area: Has an area of {countryDetail.area} km²</h2>
      ) : null}

      <h2>
        Population: {countryDetail.name} counts with a population of{" "}
        {countryDetail.population}
      </h2>
      <Link to="/activities">
      {
      countryDetail?.Activities?.length ? (
        <ul>
          Activities:
          {countryDetail?.Activities?.map((activity) => (
            <li key={activity.ID}>{activity.name}</li>
          ))}
        </ul>
      ) : (
          <p>Plan your activities here!</p>
      )
      }
        </Link>
    </div>
  );
};

export default Detail;
