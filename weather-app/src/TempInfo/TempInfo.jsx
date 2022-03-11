import React, { useContext } from "react";
import { WeatherContext } from "../WeatherProvider/WeatherProvider";

function TempInfo() {
  const { feels_like, temp_min, temp_max } = useContext(WeatherContext);
  return (
    <div className="temperature-info">
      <div>
        체감온도 <span>{feels_like}&deg;</span>
      </div>
      <div>
        최저기온 <span>{temp_min}&deg;</span>
      </div>
      <div>
        최고기온 <span>{temp_max}&deg;</span>
      </div>
    </div>
  );
}

export default TempInfo;
