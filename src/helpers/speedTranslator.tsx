export const speedTranslator = (speed: number, units: string) => {
  const allSpeeds = {
    metric: {
      value: speed,
      unit: "m/s",
    },
    imperial: {
      value: speed * 3.281,
      unit: "ft/s",
    },
  };
  if (units === "metric") {
    return allSpeeds.metric;
  } else if (units === "imperial") {
    return allSpeeds.imperial;
  } else {
    return allSpeeds.metric;
  }
};
