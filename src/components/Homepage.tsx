import { useEffect, useState } from "react";
import Vair from "../interfaces/vair";
import VairDay from "./VairDay";
import CurrentVair from "../interfaces/currentVair";
import { fetchCurrentWeather, fetchDailyWeather } from "../api/WeatherApi";
import CurrentDay from "./CurrentDay";

// starter ud med homepage for at have et skelet jeg kan proppe noget data i
function Homepage() {
  const dummyCurrentVair: CurrentVair = {
    temperature: 5,
    apparent_temperature: 3,
    humidity: 15,
    snow: 3,
    rain: 0,
    windSpeed: 5,
  };
  const dummyVair: Vair = {
    time: "Tirsdag",
    max_temperature: 5,
    min_temperature: -3,
    snow: 4,
    rain: 0,
    windSpeed: 10,
  };

  const [forecast, setForecast] = useState<Vair[]>([]);
  const [currentVair, setCurrentVair] = useState<CurrentVair>(dummyCurrentVair);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCurrentVair = await fetchCurrentWeather();
        setCurrentVair(fetchedCurrentVair);

        const fetchedDailyVair = await fetchDailyWeather();
        setForecast(fetchedDailyVair);
      } catch (error) {
        console.error("Error fetching weather: ", error);
      }
    };
    fetchData();
  }, []);

  const currentDownpour: boolean = currentVair.rain > 0 || currentVair.snow > 0;

  return (
    <div className="homepage flex flex-col pl-4 pt-8 w-screen h-screen ">
      {/* Vejret i dag */}
      <CurrentDay currentVair={currentVair} />
      {/* Uge prognose */}
      <h2 className="text-[6vh] pl-8">Kommende uge</h2>
      <div className="week pt-6 pl-4 gap-4 flex flex-row flex-wrap lg:flex-nowrap overflow-hidden">
        {forecast.slice(1).map((vair, index) => (
          <VairDay key={index} vair={vair} />
        ))}
      </div>
    </div>
  );
}

export default Homepage;
