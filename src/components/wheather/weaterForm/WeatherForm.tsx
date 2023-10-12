import React, { useState } from "react";
import "./WeatherForm.css";

type Props = {
  onSubmit: (location: string) => void;
  isLoading: boolean;
};

const WeatherForm = ({ onSubmit, isLoading }: Props) => {
  const [inputLocation, setInputLocation] = useState("");

  console.log("isLoading:", isLoading);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onSubmit(inputLocation);
  };

  return (
    <form className="locationform" onSubmit={handleSubmit}>
      <div className="locationform__elements">
        <label htmlFor="location">Enter location:</label>
        <input
          id="location"
          type="text"
          value={inputLocation}
          onChange={(e) => setInputLocation(e.target.value)}
          placeholder="City,state code (if USA),country code"
          disabled={isLoading}
        />
        <input type="submit" value="Submit" disabled={isLoading} />
      </div>
    </form>
  );
};

export default WeatherForm;
