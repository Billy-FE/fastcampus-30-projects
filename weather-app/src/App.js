import WeatherApp from "./WeatherApp";
import WeatherProvider from "./WeatherProvider/WeatherProvider";

function App() {
  return (
    <WeatherProvider>
      <WeatherApp />
    </WeatherProvider>
  );
}

export default App;
