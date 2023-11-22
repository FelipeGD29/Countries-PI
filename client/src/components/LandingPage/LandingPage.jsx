import style from "./LandingPage.module.css"
/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
const LandingPage = () => {
  return (
    <div className={style.content}>
      
      <Link to="/home">
        <button className={style.button}>Let's explore the World</button>
      </Link>
    
    </div>
  );
};

export default LandingPage;

