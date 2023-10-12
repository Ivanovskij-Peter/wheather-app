// type Props = {
//   locationData: string[];
// };

const WeatherData = async (locationData: any) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${
        locationData[0].lat
      }&lon=${locationData[0].lon}&APPID=${import.meta.env.VITE_OWM}`
    );
    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    return await Promise.reject("Unable to fetch weather data.");
  }
};
export default WeatherData;
