import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { imageData } from "./imgData";

const FetchWeatherData = () => {
  const [city, setCity] = useState("jaipur");

  const API_KEY = "bf19e5a496586e602c553fb9a6a9776e"; 

  const { data, refetch } = useQuery({
    queryKey: ["weather"],
    queryFn: async () => {
      const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      return data;
    }
  });

  const weatherCondition = data?.weather.map((dis) => dis.main);

  return (
    <section className="h-full w-full lg:h-5/6 lg:w-2/5 flex flex-col justify-around items-center bg-indigo-100 rounded-lg shadow-[0_0_15px_gray]">
      {/* search bar */}
      <div className="h-auto w-4/5 flex justify-center items-center bg-white mt-5 rounded-md">
        <input
          type="text"
          className="px-5 py-3 outline-none rounded-lg w-full"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button type="button" onClick={() => refetch()}>
          <img
            src="images/search.png"
            className="h-6 cursor-pointer px-5"
            alt="searchIcon"
          />
        </button>
      </div>

      {/* main image */}
      <div className="mt-5 flex flex-col justify-center items-center">
        {imageData.map((image) => {
          if (weatherCondition == image.imgName) {
            return (
              <img
                src={image.imgSrc}
                alt={image.imgName}
                key={image.id}
                className="drop-shadow-xl"
              />
            );
          }
        })}
        <h1 className="text-2xl text-bold">
          {data?.weather.map((dis) => dis.description)}
        </h1>
      </div>

      {/* temperature and city section */}
      <div className="mt-5 flex flex-col justify-center items-center">
        <h1 className="text-5xl text-bold">{Math.round(data?.main.temp)}°C</h1>
        <h1 className="text-5xl text-bold">{data?.name}</h1>
      </div>

      {/* humidity and wind speed section */}
      <div className="flex flex-col md:flex-row m-2 md:justify-around items-center w-full mt-5">
        <div className="flex items-center justify-around text-bold text-2xl">
          <img src="images/humidity.png" className="h-16 mr-2" alt="humidity" />
          <div className="my-5">
            <h1>{data?.main.humidity}%</h1>
            <h1>Humidity</h1>
          </div>
        </div>

        <div className="flex items-center justify-around text-bold text-2xl">
          <img src="images/wind.png" className="h-16 mr-2" alt="wind" />
          <div className="my-5">
            <h1>{data?.wind.speed} km/h</h1>
            <h1>Wind Speed</h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FetchWeatherData;
