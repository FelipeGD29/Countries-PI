import SearchBar from "../SearchBar";
import Cards from "../Cards"
import style from "./HomePage.module.css"
const HomePage = (props) => {
  return (
    <div className={style.content}>
      <SearchBar onSearch={props.onSearch}/>
      <Cards countries={props.countries}/>
    </div>
  );
};

export default HomePage;
