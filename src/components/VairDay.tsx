import Vair from "../interfaces/vair";

interface VairDayProps {
  vair: Vair;
}

function VairDay({ vair }: VairDayProps) {
  const downPour: boolean = vair.rain > 0 || vair.snow > 0;
  const stableTemp: boolean = vair.max_temperature === vair.min_temperature;
  return (
    <div className="flex flex-col p-4 sm:p-6 gap-3 box-border border-2 bg-slate-600 rounded-lg w-full sm:w-72 h-auto sm:h-80 min-w-max sm:min-w-fit">
      {/* <div className="text-black box-border border-4 bg-slate-50">❤</div> */}
      <h2 className="text-5xl">{vair.time}</h2>
      <div className="flex flex-col gap-2">
        <p className="text-4xl">
          {stableTemp
            ? vair.max_temperature + "°"
            : `${vair.min_temperature}° / ${vair.max_temperature}°`}
        </p>
        <p className="text-xl">Vindhastighed: {vair.windSpeed} km/t</p>
        {downPour && (
          <p className="text-xl">
            Nedbør:
            {vair.rain > vair.snow
              ? " " + vair.rain + " mm regn 🌧️"
              : " " + vair.snow + " cm sne ❄️"}
            {/* lille hiccup pga. prettier fjerner mellemrum */}
          </p>
        )}
      </div>
    </div>
  );
}

export default VairDay;
