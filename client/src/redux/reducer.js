import {
  GET_COUNTRIES,
  GET_DETAIL,
  GET_BY_NAME,
  CREATE_ACTIVITY,
  GET_ACTIVITIES,
  ORDER_ALPHABETICALLY,
  ORDER_POPULATION,
  FILTER_CONTINENT,
  ORDER_DURATION,
} from "./actions/action-types";

const initialState = {
  allCountries: [],
  countries: [],
  countryDetail: [],
  activities: [],
  allActivities: [],
};

const reducer = (state = initialState, action) => {
  let orderedCountriesByContinent = [...state.countries];
  let orderedCountriesByPopulation = [...state.countries];
  let contientCountries = state.allCountries.filter(
    (country) => country.continent === action.payload
  );
  let orderedActivitiesByDuration = [...state.activities];
  

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
        allActivities: [...state.allActivities, action.payload],
      };

    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
        allActivities: action.payload,
      };

    case ORDER_ALPHABETICALLY:
      
        orderedCountriesByContinent.sort((a, b) => {
          if (a.name > b.name) return 1;
          else if (a.name < b.name) return -1;
          else return 0;
        });
        if (action.payload === "D") {
          orderedCountriesByContinent.sort((a, b) => {
            if (a.name < b.name) return 1;
            else if (a.name > b.name) return -1;
            else return 0;
          });
      }
      return {
        ...state,
        countries: orderedCountriesByContinent,
        allCountries: orderedCountriesByContinent
      };

    case ORDER_POPULATION:
      if (action.payload === "A") {
        orderedCountriesByPopulation.sort((a, b) => {
          if (Number(a.population) > Number(b.population)) return 1;
          else if (Number(a.population) < Number(b.population)) return -1;
          else return 0;
        });
      } else if (action.payload === "D") {
        orderedCountriesByPopulation.sort((a, b) => {
          if (Number(a.population) < Number(b.population)) return 1;
          else if (Number(a.population) > Number(b.population)) return -1;
          else return 0;
        });
      }
      return {
        ...state,
        countries: orderedCountriesByPopulation,
      };

    case FILTER_CONTINENT:
      return {
        ...state,
        countries: contientCountries,
      };

    case ORDER_DURATION:
      if (action.payload === "A") {
        orderedActivitiesByDuration.sort((a, b) => {
          if (a.duration > b.duration) return 1;
          else if (a.duration < b.duration) return -1;
          else return 0;
        });
      } else if (action.payload === "D") {
        orderedActivitiesByDuration.sort((a, b) => {
          if (a.duration < b.duration) return 1;
          else if (a.duration > b.duration) return -1;
          else return 0;
        });
      }
      return {
        ...state,
        activities: orderedActivitiesByDuration
      };

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
