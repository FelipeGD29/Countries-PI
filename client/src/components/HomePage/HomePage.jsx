import SearchBar from "../SearchBar/SearchBar";
import Cards from "../Cards/Cards";
import style from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={style.content}>
      <SearchBar />
      <Cards />
    </div>
  );
};

export default HomePage;
