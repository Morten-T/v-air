import { useState } from "react";
import Vair from "../interfaces/vair";

// starter ud med homepage for at have et skelet jeg kan proppe noget data i
function Homepage() {
  const [forecast, setForecast] = useState<Vair[]>([]);
  const [currentVair, setCurrentVair] = useState<Vair>({
    temperature: 2,
    snow: 3,
    rain: 0,
    windSpeed: 5,
  });

  return (
    <div>
      <div className="flex flex-col p-8 gap-4">
        <h2 className="text-6xl ">Vejret i dag</h2>
        <div className="flex flex-col gap-6">
          <p className="text-6xl">{currentVair.temperature}°</p>
          <p className="text-2xl">
            Nedbør:
            {currentVair.rain > currentVair.snow
              ? currentVair.rain + " mm regn"
              : currentVair.snow + " cm sne"}
          </p>
          <p className="text-2xl">
            Vindhastighed: {currentVair.windSpeed} km/t
          </p>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
