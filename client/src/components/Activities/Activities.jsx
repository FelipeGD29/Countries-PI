import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import validation from "./validation";
import { useDispatch, useSelector } from "react-redux";
import { createActivity } from "../../redux/actions/actions";
import AllActivities from "./AllActivities";
import style from "./Activities.module.css";

const Activities = () => {
  const [activityData, setActivityData] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    CountryID: [],
  });

  const countries = useSelector((state) => state.countries);

  const [errors, setErrors] = useState({});

  const handleChange = (event, option) => {
    let { name, value } = event.target;

    if (option === "country") {
      const selectedCountries = Array.from(
        event.target.selectedOptions,
        (option) => option.value
      );
      setActivityData({
        ...activityData,
        CountryID: [...activityData.CountryID, ...selectedCountries],
      });
    } else {
      setActivityData({
        ...activityData,
        [name]: value,
      });
    }
  };

  const handleRemoveCountry = useCallback((countryID) => {
    const updatedCountries = activityData.CountryID.filter(
      (ID) => ID !== countryID
    );
    setActivityData({
      ...activityData,
      CountryID: updatedCountries,
    });
  }, [activityData]);

  useEffect(() => {
    setErrors(validation(activityData));
  }, [activityData]);

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    if (
      activityData.name !== "" &&
      activityData.difficulty !== "" &&
      activityData.duration !== "" &&
      activityData.season !== "" &&
      activityData.CountryID.length !== 0
    ) {
      dispatch(createActivity(activityData));
      alert("Activity created SUCCESSFULLY");
      setActivityData({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        CountryID: [],
      });
    } else {
      alert("Complete all areas");
      event.preventDefault();
    }
  };

  return (
    <div className={style.content}>
      <div className={style.homeBtn}>
        <Link to="/home">
          <button>Home</button>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className={style.form}>
        <label>Name</label>
        <input
          className={style.input}
          type="text"
          name="name"
          value={activityData.name}
          onChange={handleChange}
          placeholder="Name your activity"
          autoComplete="off"
        />
        {errors.name && <p className={style.error}>{errors.name}</p>}

        <label>Difficulty</label>
        <select
          className={style.select}
          name="difficulty"
          id="difficulty"
          value={activityData.difficulty}
          onChange={(event) => handleChange(event, "difficulty")}
        >
          <option value="" defaultValue={1}>
            -- Options --
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <label>Duration</label>
        <input
          className={style.input}
          type="text"
          name="duration"
          value={activityData.duration}
          onChange={handleChange}
          placeholder="Place your duration in hours"
          autoComplete="off"
        />
        {errors.duration && <p className={style.error}>{errors.duration}</p>}

        <label>Season</label>
        <select
          className={style.select}
          name="season"
          id="season"
          value={activityData.season}
          onChange={(event) => handleChange(event, "season")}
        >
          <option value="" defaultValue={"Summer"}>
            -- Options --
          </option>
          <option value="Summer">Summer</option>
          <option value="Fall">Fall</option>
          <option value="Winter">Winter</option>
          <option value="Spring">Spring</option>
        </select>

        <label>Country</label>
        <select
          className={style.select}
          name="CountryID"
          id="CountryID"
          onChange={(event) => handleChange(event, "country")}
        >
          {countries.map(({ ID, name }) => (
            <option key={ID} value={ID}>
              {name}
            </option>
          ))}
        </select>

        {activityData.CountryID.map((country) => (
          <div key={country} className={style.countriesAdded}>
            <input
              type="checkbox"
              onClick={() => handleRemoveCountry(country)}
              className={style.checkbox}
            />
            <p>{country}</p>
          </div>
        ))}

        <button type="submit">Submit</button>
      </form>
      <AllActivities />
    </div>
  );
};

export default Activities;
