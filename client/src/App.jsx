import { Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage";
import HomePage from "./components/HomePage/HomePage";
import Detail from "./components/Detail/Detail";
import Activities from "./components/Activities/Activities";
import { useEffect } from "react";
import { getCountries, orderAlphabetically } from "./redux/actions/actions";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCountries = async () => {
      await dispatch(getCountries());
      await dispatch(orderAlphabetically("A"));
    };

    fetchCountries();
  }, [dispatch]);
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/detail/:ID" element={<Detail />} />
        <Route path="/activities" element={<Activities />} />
      </Routes>
    </div>
  );
}

export default App;
