import { WeatherAreas } from "../datas/WeatherAreas";

export const useWeather = () => {
  const getAreaByBeachName = (beachName) => {
    const now = new Date();
    console.log(now);
    return WeatherAreas[beachName];
  };
  return {
    getAreaByBeachName,
  };
};
