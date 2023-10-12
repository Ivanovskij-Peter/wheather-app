// import "./Description.css";
import Loader from "../../helpers/loader/Loader";

const Description = ({ isLoading, weatherDescription }: any) => {
  return (
    <div className="description">
      <h2 className="description__title">Description</h2>
      <div className="description__divider">
        {isLoading && <Loader />}
        <p className="description__text">{weatherDescription}</p>
      </div>
    </div>
  );
};
Description.defaultProps = {
  weatherDescription: "Waiting for location data.",
};

export default Description;
