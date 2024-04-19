import "./App.css";
import React, { useState}from "react";
import { useContext } from "react";
import WeatherContext from "./WeatherContext";

const api = {
  key: ""
  base: "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/",
};

function App() {
  const [inputval, setInputval] = useState("");
  const [weather, setWeather] = useState(null);

  const buttonPress = () => {
    apiRequest();
  };

  const apiRequest = () => {
    fetch(`${api.base}/${inputval}?key=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setWeather(result);
      });
  };

  const inputChange = (event) => {
    setInputval(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <input
            type="text"
            placeholder="Search Location"
            onChange={inputChange}
          />
          <button onClick={buttonPress}>Search</button>
        </div>
        <WeatherContext.Provider value={weather}>
          <WeatherDisplay />
        </WeatherContext.Provider>
      </header>
    </div>
  );
}

export default App;

function WeatherDisplay() {
  const weather = useContext(WeatherContext);

  return (
    <div>
      {weather !== null &&
      weather.latitude !== null &&
      weather.currentConditions.temp !== null ? (
        <div>
          <h1>{weather.resolvedAddress}</h1>
          <h1>
            It's currently {weather.currentConditions.temp} with a real feel of{" "}
            {weather.currentConditions.feelslike}
          </h1>
          <h1>
           Today there will be a high of {weather.days[0].tempmax} and a low of {weather.days[0].tempmin}
          </h1>
          <h1>{weather.days[0].description}</h1>
          <h1>Forecast: {weather.description}</h1>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
