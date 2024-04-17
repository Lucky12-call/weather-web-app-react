import FetchWeatherData from "./FetchWeatherData";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { imageData } from "./imageData";

const MainContainer = () => {
  const [city, setCity] = useState("jaipur");
  const [time, setTime] = useState();
  const dateObj = new Date();

  const API_KEY = "bf19e5a496586e602c553fb9a6a9776e";

  const { data, refetch } = useQuery({
    queryKey: ["weather"],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      return data;
    },
  });
  const weatherCondition = data?.weather[0].main;

  useEffect(() => {
    setInterval(() => {
      setTime(dateObj.toLocaleTimeString());
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  return (
    <div className="bg-img h-5/6 w-3/4 rounded-lg flex gap-2 shadow-lg">
      <FetchWeatherData
        data={data}
        city={city}
        setCity={setCity}
        refetch={refetch}
      />

      <div className=" flex flex-col justify-between h-full w-full rounded-lg text-white p-10">
        <div className="mt-10 flex flex-col justify-center items-center">
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
        </div>

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-5xl font-semibold">
              {Math.round(data?.main.temp)} °C
            </h1>
          </div>
          <div>
            <h1 className="text-2xl">{dateObj.toLocaleTimeString()}</h1>
            <h1 className="text-xl">{dateObj.toDateString()}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
