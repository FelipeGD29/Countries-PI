import { useEffect } from "react";
import { getActivities } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import style from "./AllActivities.module.css";

const AllActivities = () => {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities);

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);
  return (
    <div className={style.container}>
      <h1>YOUR ACTIVITIES:</h1>
      <div className={style.containerInterno}>
        <ul className={style.activity}>
          {activities.map((activity) => (
            <li key={activity.ID}>
              <input type="checkbox" />
              <label>Activity Name: {activity.name}</label>
              <p>Difficulty: {activity.difficulty}</p>
              <p>Duration: {activity.duration}</p>
              <p>Season: {activity.season}</p>{" "}
              {activity.Countries.map(({ ID, name, flag }) => (
                <div key={ID} className={style.countries}>
                  <img src={flag} alt={name} className={style.flag} />
                  <p className={style.name}>{name}</p>
                </div>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AllActivities;
