import { useState } from "react";
import Vair from "../interfaces/vair";
import VairDay from "./VairDay";
import CurrentVair from "../interfaces/currentVair";

// starter ud med homepage for at have et skelet jeg kan proppe noget data i
function Homepage() {
  const dummyCurrentVair: CurrentVair = {
    temperature: 5,
    humidity: 15,
    snow: 3,
    rain: 0,
    windSpeed: 5,
  };

  // tid er formatteret som "2026-02-09T03:00";
  const dummyVair: Vair = {
    time: "Tirsdag",
    max_temperature: 5,
    min_temperature: -3,
    snow: 3,
    rain: 4,
    windSpeed: 10,
  };

  const [forecast, setForecast] = useState<Vair[]>([]);
  const [currentVair, setCurrentVair] = useState<CurrentVair>(dummyCurrentVair);

  return (
    <div>
      <div className="flex flex-col p-8 gap-4">
        <h2 className="text-6xl">Vejret lige nu</h2>
        <div className="flex flex-col gap-6 ">
          <p className="text-6xl">{currentVair.temperature}°</p>
          <p className="text-2xl">
            Nedbør:
            {/* ulempe: det skal sne ret meget før sne bliver vist */}
            {currentVair.rain > currentVair.snow
              ? " " + currentVair.rain + " mm regn 🌧️"
              : " " + currentVair.snow + " cm sne ❄️"}
            {/* lille hiccup pga. prettier fjerner mellemrum */}
          </p>
          <p className="text-2xl">
            Vindhastighed: {currentVair.windSpeed} km/t
          </p>
          <p className="text-2xl">Luftfugtighed: {currentVair.humidity}%</p>
        </div>
      </div>
      {/* Uge prognose */}
      <h2 className="text-6xl p-8">Kommende uge</h2>
      <div className="pt-8 pl-4 gap-4 flex flex-row">
        <VairDay vair={dummyVair} />
        <VairDay vair={dummyVair} />
        <VairDay vair={dummyVair} />
        <VairDay vair={dummyVair} />
        <VairDay vair={dummyVair} />
        <VairDay vair={dummyVair} />
      </div>
    </div>
  );
}

export default Homepage;
