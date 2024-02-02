import style from "./LandingPage.module.css";
/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
const LandingPage = () => {
  return (
    <div className={style.content}>
      <h1>
        Welcome to <span className={style.highlight}>myWorld</span>, where you can find <span className={style.highlight}>yours</span>.
      </h1>
      <Link to="/home">
        <button>Let's explore it</button>
      </Link>
    </div>
  );
};

export default LandingPage;
