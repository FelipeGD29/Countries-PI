import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import validation from "./validation";
import style from "./Activities.module.css";

const Activities = ({ createActivity }) => {
  const [activityData, setActivityData] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
  });
  const [difficultyData, setDifficultyData] = useState("")
  const [seasonData, setSeasonData] = useState("")


  const [errors, setErrors] = useState({});

  const handleChange = (event, option) => {
    let { name, value } = event.target;
    setActivityData({
      ...activityData,
      [name]: value,
    });
    if (option === 'difficulty') {
      setDifficultyData(value);
    } else if (option === 'season') {
      setSeasonData(value);
    }
  };

  useEffect(() => {
    setErrors(validation(activityData));
  }, [activityData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setActivityData({
      ...activityData,
      difficulty: difficultyData,
      season: seasonData,
    })
    console.log(activityData);
    createActivity(activityData);
  };

  return (
    <div className={style.content}>
      <Link to="/home">
        <button>Home</button>
      </Link>

      <form onSubmit={handleSubmit} className={style.form}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={activityData.name}
          onChange={handleChange}
          placeholder="Name your activity"
        />
        {errors.name && <p className={style.error}>{errors.name}</p>}
        
        <label>Difficulty</label>
        <select name="difficulty" id="difficulty" value={difficultyData} onChange={(event) => handleChange(event, "difficulty")}>
        <option value="" selected>-- Options --</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        
        <label>Duration</label>
        <input
         type="text"
         name="duration"
         value={activityData.duration}
         onChange={handleChange}
         placeholder="Place your duration in hours"
        />
          {errors.duration && <p className={style.error}>{errors.duration}</p>}
        
        <label>Season</label>
        <select name="season" id="season" value={seasonData} onChange={(event) => handleChange(event, "season")}>
        <option value="" selected>-- Options --</option>
          <option value="Summer">Summer</option>
          <option value="Fall">Fall</option>
          <option value="Winter">Winter</option>
          <option value="Spring">Spring</option>
        </select>
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Activities;
