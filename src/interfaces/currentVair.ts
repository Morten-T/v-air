interface CurrentVair {
  temperature: number;
  apparent_temperature: number;
  condition?: number;
  humidity?: number;
  rain: number;
  snow: number;
  windSpeed: number;
}

export default CurrentVair;
