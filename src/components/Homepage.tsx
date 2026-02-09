import { useEffect, useState } from "react";
import Vair from "../interfaces/vair";
import VairDay from "./VairDay";
import CurrentVair from "../interfaces/currentVair";
import { fetchCurrentWeather, fetchDailyWeather } from "../api/WeatherApi";

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
  const date = new Date();
  const ugedag = date.toLocaleDateString("da-DK", { weekday: "long" });
  const dato = date.toLocaleDateString("da-DK", {
    day: "numeric",
    month: "long",
  });

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
    <div className="homepage flex flex-col pl-4 pt-8 w-screen h-screen box-border border-4 border-yellow-300">
      <div className="flex flex-col p-8 gap-4">
        <h2 className="text-6xl">
          {ugedag.charAt(0).toUpperCase() + ugedag.slice(1)} den {dato}
        </h2>
        <div className="flex flex-col gap-6 ">
          <p className="text-6xl">Temperatur {currentVair.temperature}°</p>
          <p className="text-5xl">
            Føles som {currentVair.apparent_temperature}°
          </p>
          <p className="text-2xl">
            Vindhastighed: {currentVair.windSpeed} km/t
          </p>
          <p className="text-2xl">Luftfugtighed: {currentVair.humidity}%</p>
        </div>
        {currentDownpour ? (
          <p className="text-2xl">
            Nedbør:
            {/* ulempe: det skal sne ret meget før sne bliver vist */}
            {currentVair.rain > currentVair.snow
              ? " " + currentVair.rain + " mm regn 🌧️"
              : " " + currentVair.snow + " cm sne ❄️"}
            {/* lille hiccup pga. prettier fjerner mellemrum */}
          </p>
        ) : (
          <div>
            <p className="text-2xl">Ingen nedbør</p>
          </div>
        )}
      </div>
      {/* Uge prognose */}
      <h2 className="text-6xl p-8">Kommende uge</h2>
      <div className="week pt-8 pl-4 gap-4 flex flex-row flex-wrap lg:flex-nowrap overflow-hidden">
        {forecast.slice(1).map((vair, index) => (
          <VairDay key={index} vair={vair} />
        ))}
      </div>
    </div>
  );
}

export default Homepage;
