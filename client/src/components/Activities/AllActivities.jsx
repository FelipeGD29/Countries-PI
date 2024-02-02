import { useEffect } from "react";
import { getActivities, orderDuration } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import style from "./AllActivities.module.css";

const AllActivities = () => {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities);
  const allActivities = useSelector((state) => state.allActivities);

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  const handleOrder = (event) => {
    if (event.target.name === "orderDuration") {
      dispatch(orderDuration(event.target.value));
    }
  };
  const showAllActivities = () => {
    dispatch(getActivities())
  }

  return (
    <div className={style.container}>
      <h1>YOUR ACTIVITIES:</h1>
      {activities.length === 0 ? (
        <p>There aren't activities planned yet</p>
      ) : (
        <>
          <div className={style.containerInterno}>
          <label>Duration</label>
        <select
          className={style.select}
          name="orderDuration"
          id="orderDuration"
          onChange={handleOrder}
        >
          <option value="A">Ascendent</option>
          <option value="D">Descendent</option>
        </select>
        <button onClick={showAllActivities}>Show All</button>
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
        </>
      )}
    </div>
  );
};

export default AllActivities;
