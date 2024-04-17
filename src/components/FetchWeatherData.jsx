/* eslint-disable react/prop-types */
import { IoSearch } from "react-icons/io5";
import { BsCloudSleet, BsCloudFog, BsCloudRain } from "react-icons/bs";
import { RiMistFill } from "react-icons/ri";
import { TiWeatherSunny, TiWeatherStormy, TiWeatherSnow } from "react-icons/ti";
import { LuCloudSun } from "react-icons/lu";

const FetchWeatherData = ({ data, city, setCity, refetch }) => {
  const handleClick = () => {
    refetch();
    setCity("");
  };

  const getIcon = () => {
    switch (data?.weather[0].main) {
      case "Haze":
        return <BsCloudSleet size={60} />;
      case "Mist":
        return <RiMistFill size={60} />;
      case "Fog":
        return <BsCloudFog size={60} />;
      case "Clear":
        return <TiWeatherSunny size={60} />;
      case "Storm":
        return <TiWeatherStormy size={60} />;
      case "Snow":
        return <TiWeatherSnow size={60} />;
      case "Clouds":
        return <LuCloudSun size={60} />;
      case "Rain  ":
        return <BsCloudRain size={60} />;
      default:
        <h1>no icon</h1>;
        break;
    }
  };

  return (
    <section className="bg-glass text-white h-full w-full lg:w-2/5 flex flex-col pag-5 items-center p-5 rounded-lg">
      <div className="h-40 w-full text-white rounded-lg">
        <div className="flex justify-center my-5">{getIcon()}</div>
        <h1 className="text-2xl font-semibold text-center">
          {data?.weather[0].main}
        </h1>
      </div>

      {/* search bar */}
      <div className="h-auto w-full flex justify-center items-center border-b-2 border-white mt-5 ">
        <input
          type="text"
          className="px-4 py-1.5  focus:outline-none bg-transparent rounded-lg w-full"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button type="button" onClick={handleClick}>
          <IoSearch size={20} className="mx-3" />
        </button>
      </div>

      {/* humidity and wind speed section */}
      <div className="w-full mt-5 divide-y-2 divide-solid divide-gray-600">
        <h1 className="text-xl text-bold text-center py-2">
          {data?.name}, {data?.sys.country}
        </h1>

        <div className="flex items-center justify-between text-bold py-2 transition-all duration-1000">
          <h1>Temperature</h1>
          <h1>{Math.round(data?.main.temp)}°C</h1>
        </div>

        <div className="flex items-center justify-between text-bold py-2">
          <h1>Humidity</h1>
          <h1>{data?.main.humidity}%</h1>
        </div>

        <div className="flex items-center justify-between text-bold py-2">
          <h1>Visibility</h1>
          <h1>{data?.visibility} mi</h1>
        </div>

        <div className="flex items-center justify-between text-bold py-2">
          <h1>Wind Speed</h1>
          <h1>{data?.wind.speed} km/h</h1>
        </div>
      </div>
    </section>
  );
};

export default FetchWeatherData;
