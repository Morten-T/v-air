import Vair from "../interfaces/vair";

interface VairDayProps {
  vair: Vair;
}

function VairDay({ vair }: VairDayProps) {
  return (
    <div className="flex flex-col p-6 gap-3 box-border border-2 bg-slate-600 rounded-lg w-72 h-96">
      <h2 className="text-5xl">{vair.time}</h2>
      <div className="flex flex-col gap-2">
        <p className="text-4xl">
          {vair.min_temperature}° ↔ {vair.max_temperature}°
        </p>
        <p className="text-xl">
          Nedbør:
          {vair.rain > vair.snow
            ? " " + vair.rain + " mm regn 🌧️"
            : " " + vair.snow + " cm sne ❄️"}
          {/* lille hiccup pga. prettier fjerner mellemrum */}
        </p>
        <p className="text-xl">Vindhastighed: {vair.windSpeed} km/t</p>
      </div>
    </div>
  );
}

export default VairDay;
