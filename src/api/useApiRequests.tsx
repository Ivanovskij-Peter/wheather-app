import { useState, useEffect } from "react";
import LocationToCoordinates from "./LocationToCoordinates";
import WeatherData from "./weatherData";
import PromptToLocation from "./PromptToLocation";
import WeatherDescript from "../components/description/WeatherDescription";

interface IpromptData {
  USstate: string;
  country: string;
  locationString: string;
  units: string;
}

interface IlocationData {
  country: string;
  lat: number;
  lon: number;
  name: string;
  state: string;
}

interface IweatherData {
  base: string;
  clouds: { all: number };
  cod: number;
  coord: { lon: number; lat: number };
  dt: number;
  id: number;
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  name: string;
  sys: {
    country: string;
  };
  wind: {
    deg: number;
    speed: number;
  };
}

const useApiRequests = (prompt: string) => {
  const [error, setError] = useState<string>("");
  const [promptData, setPromptData] = useState<IpromptData>();
  const [locationData, setLocationData] = useState<IlocationData[]>([]);
  const [weatherData, setWeatherData] = useState<IweatherData>();
  const [weatherDescription, setWeatherDescription] = useState(null);

  console.log("weatherData:", weatherData);

  // Fetch location and weather data from API.
  useEffect(() => {
    const fetchData = async () => {
      if (!prompt) return; // return if prompt is null or undefined

      try {
        const promptDataRes = await PromptToLocation(prompt);
        setPromptData(promptDataRes);

        const locationDataRes = await LocationToCoordinates(
          promptDataRes.locationString
        );
        setLocationData(locationDataRes);

        const weatherDataRes = await WeatherData(locationDataRes);
        setWeatherData(weatherDataRes);

        const weatherDescriptRes = await WeatherDescript(
          prompt,
          weatherDataRes
        );
        setWeatherDescription(weatherDescriptRes);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(error);
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [prompt]); // run effect when `prompt` changes

  return { error, promptData, locationData, weatherData, weatherDescription };
};

export default useApiRequests;
