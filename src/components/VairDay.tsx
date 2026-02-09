import Vair from "../interfaces/vair";

interface VairDayProps {
  vair: Vair;
}

function VairDay({ vair }: VairDayProps) {
  const downPour: boolean = vair.rain > 0 || vair.snow > 0;
  const stableTemp: boolean = vair.max_temperature === vair.min_temperature;
  return (
    <div className="flex flex-col p-[1.5vh] gap-[1vh] box-border border-2 bg-slate-600 rounded-lg w-[32vh] h-[36vh] min-w-fit">
      {/* <div className="text-black box-border border-4 bg-slate-50">❤</div> */}
      <h2 className="text-[5vh]">{vair.time}</h2>
      <div className="flex flex-col gap-[0.5vh]">
        <p className="text-[4vh]">
          {stableTemp
            ? vair.max_temperature + "°"
            : `${vair.min_temperature}° / ${vair.max_temperature}°`}
        </p>
        <p className="text-[2.5vh]">Vindhastighed: {vair.windSpeed} km/t</p>
        {downPour && (
          <p className="text-[2.5vh]">
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
