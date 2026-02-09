import { fetchWeatherApi } from "openmeteo";
import CurrentVairData from "../interfaces/currentVair";
import WeeklyVairData from "../interfaces/weekVair";
import { DecodeWeathercode } from "./utils";

// CAPITAL for konstanter
const AARHUS_COORDINATES = {
  latitude: 56.1567,
  longitude: 10.2108,
};

async function fetchCurrentWeather() {
  const params = {
    latitude: AARHUS_COORDINATES.latitude,
    longitude: AARHUS_COORDINATES.longitude,
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "wind_speed_10m",
      "rain",
      "snowfall",
      "weather_code",
    ],
    timezone: "Europe/Berlin",
  };
  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);

  const response = responses[0];
  const utcOffsetSeconds = response.utcOffsetSeconds();

  const current = response.current()!;

  const weatherData = {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature_2m: current.variables(0)!.value(),
      relative_humidity_2m: current.variables(1)!.value(),
      apparent_temperature: current.variables(2)!.value(),
      wind_speed_10m: current.variables(3)!.value(),
      rain: current.variables(4)!.value(),
      snowfall: current.variables(5)!.value(),
      weather_code: current.variables(6)!.value(),
    },
  };
  // rå data
  console.log(
    `\nCurrent time: ${weatherData.current.time}\n`,
    `\nCurrent temperature_2m: ${weatherData.current.temperature_2m}`,
    `\nCurrent relative_humidity_2m: ${weatherData.current.relative_humidity_2m}`,
    `\nCurrent apparent_temperature: ${weatherData.current.apparent_temperature}`,
    `\nCurrent wind_speed_10m: ${weatherData.current.wind_speed_10m}`,
    `\nCurrent rain: ${weatherData.current.rain}`,
    `\nCurrent snowfall: ${weatherData.current.snowfall}`,
    `\nCurrent weather_code: ${weatherData.current.weather_code}`,
  );
  const fetchedCurrentVair: CurrentVairData = {
    temperature: Math.round(weatherData.current.temperature_2m),
    apparent_temperature: Math.round(weatherData.current.apparent_temperature),
    humidity: Math.round(weatherData.current.relative_humidity_2m),
    snow: weatherData.current.snowfall,
    rain: weatherData.current.rain,
    windSpeed: Math.round(weatherData.current.wind_speed_10m),
    condition: weatherData.current.weather_code,
  };

  return fetchedCurrentVair;
}

async function fetchDailyWeather() {
  const params = {
    latitude: AARHUS_COORDINATES.latitude,
    longitude: AARHUS_COORDINATES.longitude,
    daily: [
      "temperature_2m_max",
      "temperature_2m_min",
      "wind_speed_10m_max",
      "rain_sum",
      "snowfall_sum",
    ],
    timezone: "Europe/Berlin",
  };
  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);
  const response = responses[0];

  const utcOffsetSeconds = response.utcOffsetSeconds();

  const daily = response.daily()!;

  const weatherData = {
    daily: {
      time: Array.from(
        {
          length:
            (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval(),
        },
        (_, i) =>
          new Date(
            (Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) *
              1000,
          ),
      ),
      temperature_2m_max: daily.variables(0)!.valuesArray(),
      temperature_2m_min: daily.variables(1)!.valuesArray(),
      wind_speed_10m_max: daily.variables(2)!.valuesArray(),
      rain_sum: daily.variables(3)!.valuesArray(),
      snowfall_sum: daily.variables(4)!.valuesArray(),
    },
  };
  // rå ugedata
  console.log(console.log("\nDaily Data: \n", weatherData.daily));
  const fetchedDailyVair: WeeklyVairData[] = weatherData.daily.time.map(
    (time, index) => ({
      time:
        time
          .toLocaleDateString("da-DK", { weekday: "long" })
          .charAt(0)
          .toUpperCase() +
        time.toLocaleDateString("da-DK", { weekday: "long" }).slice(1),
      max_temperature: Math.round(weatherData.daily.temperature_2m_max![index]),
      min_temperature: Math.round(weatherData.daily.temperature_2m_min![index]),
      snow: Number(weatherData.daily.snowfall_sum![index].toPrecision(2)),
      rain: Number(weatherData.daily.rain_sum![index].toPrecision(2)),
      windSpeed: Math.round(weatherData.daily.wind_speed_10m_max![index]),
    }),
  );
  return fetchedDailyVair;
}

export { fetchCurrentWeather, fetchDailyWeather };
