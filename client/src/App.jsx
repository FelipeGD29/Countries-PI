import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage";
import HomePage from "./components/HomePage/HomePage";
import Detail from "./components/Detail";

function App() {
  const [countries, setCountries] = useState([]);
  const onSearch = async (name) => {
    try {
      const { data } = await axios(`http://localhost:3001/search?name=${name}`);
      const dataID = data.map((country) => country.ID)

      if (!countries.some((country) => country.ID === dataID[0])) {
        setCountries((previousCountries) => [...previousCountries, ...data]);
      } else {
        window.alert(`¡${name} ya fue agregado anteriormente!`);
      }
    } catch (error) {
      window.alert(`El país ${name} no ha sido encontrado`);
    }
  };
  

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/home"
          element={<HomePage onSearch={onSearch} countries={countries} />}
        />
        <Route path="/detail/:ID" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;