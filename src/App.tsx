import { useEffect, useState } from "react";
import "./App.css";
import WeatherForm from "./components/wheather/weaterForm/WeatherForm";
import WeatherCard from "./components/wheather/weatherCard/WeatherCard";
import useApiRequests from "./api/useApiRequests";
import Description from "./components/description/Description";

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [units, setUnits] = useState<string>("metric");
  const [errorMsg, setErrorMsg] = useState("");
  const [weatherDataLoading, setWeatherDataLoading] = useState(false);
  const [weatherDescriptLoading, setWeatherDescriptLoading] = useState(false);

  const { error, promptData, locationData, weatherData, weatherDescription } =
    useApiRequests(prompt);

  const handleSubmit = (message: string) => {
    setErrorMsg("");
    setWeatherDataLoading(true);
    setWeatherDescriptLoading(true);
    setPrompt(message);
  };

  useEffect(() => {
    if (error) {
      setErrorMsg(error);
      setWeatherDataLoading(false);
    }
  }, [error]);

  useEffect(() => {
    if (weatherData) {
      setWeatherDataLoading(false);
    }
  }, [weatherData]);

  useEffect(() => {
    if (weatherDescription) {
      setWeatherDescriptLoading(false);
    }
  }, [weatherDescription]);

  useEffect(() => {
    if (promptData && promptData.units) {
      setUnits(promptData.units);
    }
  }, [promptData]);
  return (
    <div className="container">
      <header className="header">
        <h1 className="page-title">Current Weather</h1>
        <WeatherForm
          onSubmit={handleSubmit}
          isLoading={weatherDescriptLoading || weatherDataLoading}
        />
        {error && <p className="error">{errorMsg}</p>}
        {weatherDescription ? (
          <Description
            isLoading={weatherDescriptLoading}
            weatherDescription={weatherDescription}
          />
        ) : (
          <Description isLoading={weatherDescriptLoading} />
        )}
      </header>
      <main className="main-content">
        {weatherData?.name && !errorMsg ? (
          <WeatherCard
            isLoading={weatherDataLoading}
            data={weatherData}
            units={units}
            country={promptData?.country}
            USstate={locationData[0]?.state}
            setUnits={setUnits}
          />
        ) : (
          <WeatherCard
            isLoading={weatherDataLoading}
            setUnits={setUnits}
            units={""}
          />
        )}
      </main>
    </div>
  );
};

export default App;
