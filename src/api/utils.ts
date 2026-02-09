type WeatherInfo = {
  label: string;
  emoji: string;
};

const WEATHER_CODE_MAP: Record<number, WeatherInfo> = {
  0: { label: "Klar himmel", emoji: "☀️" },
  1: { label: "Mest klart", emoji: "🌤️" },
  2: { label: "Delvist skyet", emoji: "⛅" },
  3: { label: "Overskyet", emoji: "☁️" },
  45: { label: "Tåge", emoji: "🌫️" },
  48: { label: "Rimtåge", emoji: "🌫️" },
  51: { label: "Let finregn", emoji: "🌦️" },
  53: { label: "Moderat finregn", emoji: "🌦️" },
  55: { label: "Kraftigt finregn", emoji: "🌧️" },
  56: { label: "Let underkølet finregn", emoji: "🌧️" },
  57: { label: "Kraftigt underkølet finregn", emoji: "🌧️" },
  61: { label: "Let regn", emoji: "🌧️" },
  63: { label: "Moderat regn", emoji: "🌧️" },
  65: { label: "Kraftigt regn", emoji: "🌧️" },
  66: { label: "Let underkølet regn", emoji: "🌧️" },
  67: { label: "Kraftigt underkølet regn", emoji: "🌧️" },
  71: { label: "Let sne", emoji: "🌨️" },
  73: { label: "Moderat sne", emoji: "🌨️" },
  75: { label: "Kraftigt sne", emoji: "🌨️" },
  77: { label: "Snefnug", emoji: "🌨️" },
  80: { label: "Lette regnbyger", emoji: "🌦️" },
  81: { label: "Moderat regnbyger", emoji: "🌧️" },
  82: { label: "Kraftige regnbyger", emoji: "🌧️" },
  85: { label: "Let snebyger", emoji: "🌨️" },
  86: { label: "Kraftige snebyger", emoji: "🌨️" },
  95: { label: "Tordenvejr", emoji: "⛈️" },
  96: { label: "Tordenvejr med let hagl", emoji: "⛈️" },
  99: { label: "Tordenvejr med kraftigt hagl", emoji: "⛈️" },
};

function DecodeWeathercode(weathercode: number): string {
  return WEATHER_CODE_MAP[weathercode]?.label ?? "Ukendt vejr";
}

function DecodeWeatherEmoji(weathercode: number): string {
  return WEATHER_CODE_MAP[weathercode]?.emoji ?? "❓";
}

export { DecodeWeathercode, DecodeWeatherEmoji };
