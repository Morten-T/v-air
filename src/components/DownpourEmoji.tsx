import { DecodeWeatherEmoji } from "../api/utils";

function DownpourEmoji({ condition }: { condition: number | undefined }) {
  const downpurType = condition ? DecodeWeatherEmoji(condition) : "❓";

  return <p className="text-[14vh]">{downpurType}</p>;
}

export default DownpourEmoji;
