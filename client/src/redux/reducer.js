import {
  GET_COUNTRIES,
  GET_DETAIL,
  GET_BY_NAME,
  CREATE_ACTIVITY,
  GET_ACTIVITIES,
  ORDER_ALPHABETICALLY,
  ORDER_POPULATION,
  FILTER_CONTINENT,
} from "./actions/action-types";

const initialState = {
  allCountries: [],
  countries: [],
  countryDetail: [],
  activities: [],
};

const reducer = (state = initialState, action) => {
  let orderedCountriesByContinent = [...state.countries];
  let orderedCountriesByPopulation = [...state.countries];
  let contientCountries = state.allCountries.filter(
    (country) => country.continent === action.payload
  );
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload,
      };

    case GET_DETAIL:
      return {
        ...state,
        countryDetail: action.payload,
      };

    case GET_BY_NAME:
      return {
        ...state,
        countries: action.payload,
      };

    case CREATE_ACTIVITY:
      return {
        ...state,
        activities: [...state.activities, action.payload],
      };

    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };

    case ORDER_ALPHABETICALLY:
      if (action.payload === "A") {
        orderedCountriesByContinent.sort((a, b) => {
          if (a.name > b.name) return 1;
          else if (a.name < b.name) return -1;
          else return 0;
        });
      } else if (action.payload === "D") {
        orderedCountriesByContinent.sort((a, b) => {
          if (a.name < b.name) return 1;
          else if (a.name > b.name) return -1;
          else return 0;
        });
      }
      return {
        ...state,
        countries: orderedCountriesByContinent,
        allCountries: orderedCountriesByContinent,
      };

    case ORDER_POPULATION:
      if (action.payload === "A") {
        orderedCountriesByPopulation.sort((a, b) => {
          if (Number(a.population) >  Number(b.population)) return 1;
          else if (Number(a.population) <  Number(b.population)) return -1;
          else return 0;
        });
      } else if (action.payload === "D") {
        orderedCountriesByPopulation.sort((a, b) => {
          if (Number(a.population) < Number(b.population)) return 1;
          else if (Number(a.population) >Number( b.population)) return -1;
          else return 0;
        });
      }
      return {
        ...state,
        countries: orderedCountriesByPopulation,
        allCountries: orderedCountriesByPopulation,
      };

    case FILTER_CONTINENT:
      return {
        ...state,
        countries: contientCountries,
      };

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
