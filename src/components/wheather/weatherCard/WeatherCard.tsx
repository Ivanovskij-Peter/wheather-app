import Loader from "../../../helpers/loader/Loader";
import { speedTranslator } from "../../../helpers/speedTranslator";
import { tempTranslator } from "../../../helpers/tempTranslator";
import "./WeatherCard.css";

interface IWeatherProps {
  isLoading: boolean;
  units: string;
  country?: string;
  USstate?: string;
  setUnits: React.Dispatch<React.SetStateAction<string>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

const WeatherCard = ({
  isLoading,
  data,
  units,
  country,
  USstate,
  setUnits,
}: IWeatherProps) => {
  // Display state if country is US.
  const stateDisplay = () => {
    if (data?.sys.country === "US") {
      return `, ${USstate}`;
    } else {
      return "";
    }
  };

  // Handle unit change.
  const handleUnitChange = () => {
    if (units === "metric") {
      setUnits("imperial");
    } else {
      setUnits("metric");
    }
  };

  // Set wind direction.
  const windDirStyle = {
    transform: `rotate(${data?.wind.deg + 90}deg)`,
  };

  return (
    <article className="weathercard">
      {isLoading && <Loader />}
      <div className="weathercard__data">
        <div className="weathercard__meta">
          <div className="weathercard__meta-location">{`${
            data?.name
          }${stateDisplay()}, ${country}`}</div>
        </div>
        <div className="weathercard__temp">
          <span className="temp">
            {tempTranslator(data?.main.temp, units).value.toFixed(1)}
          </span>
          <span className="tempunit">
            {tempTranslator(data?.main.temp, units).unit}
          </span>
        </div>
        <div className="weathercard__wind">
          <div className="weathercard__wind-speed">
            <span className="speed">
              {speedTranslator(data?.wind.speed, units).value.toFixed(1)}
            </span>
            <span className="windunit">
              {speedTranslator(data?.wind.speed, units).unit}
            </span>
          </div>
          <div className="weathercard__wind-dir" style={windDirStyle}>
            <span className="screen-reader-text">{data?.wind.deg}</span>
          </div>
        </div>
        <button id="units" onClick={handleUnitChange}>
          Change units
        </button>
      </div>
    </article>
  );
};

WeatherCard.defaultProps = {
  data: {
    name: "--",
    sys: {
      country: "--",
    },
    main: {
      temp: 273,
    },
    wind: {
      speed: 0,
      deg: 0,
    },
  },
  units: "metric",
  setUnits: () => {},
};
export default WeatherCard;
