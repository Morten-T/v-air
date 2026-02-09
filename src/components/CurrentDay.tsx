import CurrentVair from "../interfaces/currentVair";
import Vair from "../interfaces/vair";

interface CurrentDayProps {
  currentVair: CurrentVair;
}

function CurrentDay({ currentVair }: CurrentDayProps) {
  const date = new Date();
  const ugedag = date.toLocaleDateString("da-DK", { weekday: "long" });
  const dato = date.toLocaleDateString("da-DK", {
    day: "numeric",
    month: "long",
  });

  const currentDownpour: boolean = currentVair.rain > 0 || currentVair.snow > 0;

  return (
    <div className="flex flex-col p-8">
      <h2 className="text-[6vh]">
        {ugedag.charAt(0).toUpperCase() + ugedag.slice(1)} den {dato}
      </h2>
      <div className="flex flex-col gap-2 ">
        <p className="text-[6vh]">Temperatur {currentVair.temperature}°</p>
        <p className="text-[5vh]">
          Føles som {currentVair.apparent_temperature}°
        </p>
        <p className="text-[3vh]">
          Vindhastighed: {currentVair.windSpeed} km/t
        </p>
        <p className="text-[3vh]">Luftfugtighed: {currentVair.humidity}%</p>
        {currentDownpour ? (
          <p className="text-[3vh]">
            Nedbør:
            {/* ulempe: det skal sne ret meget før sne bliver vist */}
            {currentVair.rain > currentVair.snow
              ? " " + currentVair.rain + " mm regn 🌧️"
              : " " + currentVair.snow + " cm sne ❄️"}
            {/* lille hiccup pga. prettier fjerner mellemrum */}
          </p>
        ) : (
          <div>
            <p className="text-[3vh]">Ingen nedbør</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CurrentDay;
