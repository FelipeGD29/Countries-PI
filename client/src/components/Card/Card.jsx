import { Link } from "react-router-dom";
import style from "./Card.module.css";

const Card = ({ ID, flag, name, continent }) => {
  return (
    <div className={style.container}>
      <Link to={`/detail/${ID}`}>
        <img src={flag} alt={name} className={style.flag} />
        <div className={style.text}>
          <h2>{name}</h2>
          <h3>{continent}</h3>
        </div>
      </Link>
    </div>
  );
};

export default Card;
