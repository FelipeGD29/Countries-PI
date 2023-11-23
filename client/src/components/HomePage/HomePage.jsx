import SearchBar from "../SearchBar";
import Cards from "../Cards"
import style from "./HomePage.module.css"
import { Link } from "react-router-dom";
const HomePage = (props) => {
  return (
    <div className={style.content}>
      <Link to="/activities">
      <button>Activities</button>
      </Link>
      <SearchBar onSearch={props.onSearch}/>
      <Cards countries={props.countries}/>
    </div>
  );
};

export default HomePage;
