import { useEffect, useState } from "react";
import WeeklyVairData from "../interfaces/weekVair";
import VairDay from "./VairDay";
import CurrentVairData from "../interfaces/currentVair";
import { fetchCurrentWeather, fetchDailyWeather } from "../api/WeatherApi";
import CurrentDay from "./CurrentDay";
import byskilt from "../assets/AarhusByskilt.png";
import { DecodeWeatherEmoji } from "../api/utils";
import DownpourEmoji from "./DownpourEmoji";

// starter ud med homepage for at have et skelet jeg kan proppe noget data i
function Homepage() {
  const dummyCurrentVair: CurrentVairData = {
    temperature: 0,
    apparent_temperature: 0,
    humidity: 0,
    snow: 0,
    rain: 0,
    windSpeed: -1,
    condition: 0,
  };
  const dummyWeeklyVair: WeeklyVairData = {
    time: "Error",
    max_temperature: 0,
    min_temperature: 0,
    snow: 0,
    rain: 0,
    windSpeed: -1,
  };

  const [forecast, setForecast] = useState<WeeklyVairData[]>([]);
  const [currentVair, setCurrentVair] =
    useState<CurrentVairData>(dummyCurrentVair);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedCurrentVair = await fetchCurrentWeather();
        setCurrentVair(fetchedCurrentVair);

        const fetchedDailyVair = await fetchDailyWeather();
        setForecast(fetchedDailyVair);
      } catch (error) {
        console.error("Error fetching weather: ", error);
        setError("Fejl i WeatherData fetch, tjek konsollen");
        // setForecast(Array(7).fill(dummyWeeklyVair));
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="homepage flex flex-col pl-4 pt-8 w-screen h-screen gap-[3vh]">
      {isLoading && (
        <p className="text-[4vh] text-slate-200">Henter vejrdata...</p>
      )}
      {error && <p className="text-[4vh] text-red-300">{error}</p>}
      {/* Vejret i dag */}
      <div className="flex flex-row items-center">
        {!isLoading && !error && (
          <div className="flex flex-row gap-4">
            <CurrentDay currentVair={currentVair} />
            <DownpourEmoji condition={currentVair.condition!} />
          </div>
        )}
        <div className="flex-1 flex justify-center">
          <img
            src={byskilt}
            alt="Aarhus-byskilt"
            width="300vh"
            className="object-contain"
          />
        </div>
      </div>
      {/* Uge prognose */}
      {!isLoading && !error && (
        <>
          <h2 className="text-[6vh] pl-8">Kommende uge</h2>
          <div className="week pt-2 px-4 gap-4 flex flex-row flex-wrap lg:flex-nowrap overflow-hidden">
            {forecast.slice(1).map((vair, index) => (
              <VairDay key={index} vair={vair} />
            ))}
          </div>
        </>
      )}

      {/* Error block */}
      {error && !isLoading && (
        <div className="flex flex-col items-center justify-center flex-1">
          <p className="text-[5vh] text-red-400">
            Kunne ikke hente uge prognose
          </p>
        </div>
      )}
    </div>
  );
}

export default Homepage;
