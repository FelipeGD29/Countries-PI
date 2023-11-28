import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import validation from "./validation";
import { useDispatch, useSelector } from "react-redux";
import { createActivity } from "../../redux/actions/actions";
import style from "./Activities.module.css";

const Activities = () => {
  const [activityData, setActivityData] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    CountryID: "",
  });
  const [difficultyData, setDifficultyData] = useState("");
  const [seasonData, setSeasonData] = useState("");
  const [countryID, setCountryID] = useState("");
  const countries = useSelector((state) => state.countries);

  const [errors, setErrors] = useState({});

  const handleChange = (event, option) => {
    let { name, value } = event.target;
    setActivityData({
      ...activityData,
      [name]: value,
    });
    if (option === "difficulty") {
      setDifficultyData(value);
    } else if (option === "season") {
      setSeasonData(value);
    } else if (option === "country") {
      setCountryID(value);
    }
  };

  useEffect(() => {
    setErrors(validation(activityData));
  }, [activityData]);

  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    setActivityData({
      ...activityData,
      difficulty: difficultyData,
      season: seasonData,
      CountryID: countryID,
    });
    if (
      activityData.name !== "" &&
      activityData.difficulty !== "" &&
      activityData.duration !== "" &&
      activityData.season !== "" &&
      activityData.CountryID !== ""
    ) {
      dispatch(createActivity(activityData));
      alert("Activity created SUCCESSFULLY");
      setActivityData({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        CountryID: "",
      });
    } else alert("Complete all areas");
  };

  return (
    <div className={style.content}>
      <div className={style.homeBtn}>
      <Link to="/home">
        <button className={style.button}>Home</button>
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
          value={difficultyData}
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
          value={seasonData}
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
          {countries.map((country) => (
            <option key={country.ID} value={country.ID}>
              {country.name}
            </option>
          ))}
        </select>

        <button type="submit" className={style.button}>Submit</button>
      </form>
    </div>
  );
};

export default Activities;
