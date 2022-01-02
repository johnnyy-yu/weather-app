import { format } from "date-fns";

const Compass = require("cardinal-direction");

function appendData(data) {
  const weatherData = data;

  if (typeof weatherData === "object") {
    const currentWeather = (() => {
      document.getElementById("city").textContent =
        weatherData.current.city_name.charAt(0).toUpperCase() +
        weatherData.current.city_name.split(",")[0].slice(1);

      document.getElementById("current-date").textContent = format(
        new Date(weatherData.current.date * 1000),
        "MMMM d, yyyy"
      );

      document.getElementById("sunrise").textContent = `Sunrise: ${format(
        new Date(weatherData.current.sunrise_time * 1000),
        "h:m a"
      )}`;

      document.getElementById("sunset").textContent = `Sunset: ${format(
        new Date(weatherData.current.sunset_time * 1000),
        "h:m a"
      )}`;

      document.getElementById("humidity").textContent = 
        `Humidity: ${weatherData.current.humidity}%`;

      document.getElementById("wind").textContent = 
        `Wind: ${Compass.cardinalFromDegree(
        weatherData.current.wind_deg,
        Compass.CardinalSubset.Ordinal
      )} ${Math.ceil(weatherData.current.wind_speed)} mph`;

      document.getElementById("weather-pic").src = 
        `https://openweathermap.org/img/wn/${weatherData.current.weather_icon}@4x.png`;

      document.getElementById("current-temp").textContent = Math.round(
        weatherData.current.temp
      );

      document.getElementById("weather-description").textContent =
        weatherData.current.weather_description;
    })();

    const forecastWeather = (() => {
      let i = 0;

      weatherData.forecast.forEach((days) => {
        const container = `.forecast-day-${i}`;
        document.querySelector(container).textContent = "";

        Object.keys(days).forEach((key) => {
          const thisForecastDay = container;
          const forecastContainer = document.querySelector(thisForecastDay);
          let div;

          if (key === "weather_icon") {
            div = document.createElement("img");
          } else {
            div = document.createElement("div");
          }

          div.className = key;
          div.id = key + i;
          forecastContainer.appendChild(div);
        });

        const date = (() => {
          const dateID = `date${i}`;
          document.getElementById(dateID).textContent = format(
            new Date(days.date * 1000),
            "EEEE P"
          ).slice(0, -5);
        })();

        const maxTemp = (() => {
          const maxTempID = `max_temp${i}`;
          document.getElementById(maxTempID).textContent = `H: ${Math.round(
            days.max_temp
          )}`;
        })();

        const minTemp = (() => {
          const minTempID = `min_temp${i}`;
          document.getElementById(minTempID).textContent = `L: ${Math.round(
            days.min_temp
          )}`;
        })();

        const weatherIcon = (() => {
          const iconID = `weather_icon${i}`;
          const src = `https://openweathermap.org/img/wn/${days.weather_icon}@2x.png`;
          document.getElementById(iconID).src = src;
        })();

        const weatherDescription = (() => {
          const weatherDescriptionID = `weather_description${i}`;
          document.getElementById(weatherDescriptionID).textContent =
            days.weather_description;
        })();

        i += 1;
      });
    })();
  } else {
    document.querySelector(".warning-message").textContent = weatherData;
  }
}

export default appendData;
