import axios from "axios"
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Detail = () => {
    const {ID} = useParams()
    const [country, setCountry] = useState({});
    useEffect(() => {
        axios(
          `http://localhost:3001/countries/${ID}`
        ).then(({ data }) => {
          if (data.name) {
            setCountry(data);
          } else {
            window.alert(`There is not a country with the id ${ID}`);
          }
        });
        return setCountry({});
      }, [ID]);
    
    return(
        <div>
            <h1>{country.ID}</h1>
            <h1>Country Name: {country.name}</h1>
            <img src={country.flag} alt={country.name && country.name} />
            <h2>Continent: {country.name} belongs to the continent of {country.continent}</h2>
            <h2>Capital: {country.capital}</h2>
            {country.subregion?country.subregion == country.continent?null:<h2>Subregion: It has a subregion named {country.subregion}</h2>:null}
            {country.area?<h2>Area: And an area of {country.area} km²</h2>:null}
            <h2>Population: {country.name} counts with a population of {country.population}</h2>

        </div>
    )
};

export default Detail