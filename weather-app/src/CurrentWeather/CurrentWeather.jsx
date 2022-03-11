import React, { useContext } from "react";
import CurrentWeatherIcon from "../CurrentWeatherIcon/CurrentWeatherIcon";
import { WeatherContext } from "../WeatherProvider/WeatherProvider";

function CurrentWeather() {
  const { name, temp, weatherState } = useContext(WeatherContext);
  return (
    <div className="weather">
      {name} &nbsp;/
      <CurrentWeatherIcon weatherState={weatherState} />
      <span>{temp}&deg;</span>
    </div>
  );
}

export default CurrentWeather;
