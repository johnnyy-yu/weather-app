class ForecastDays {
  constructor(date, max, min, id, description) {
    this.date = date;
    this.max_temp = max;
    this.min_temp = min;
    this.weather_id = id;
    this.weather_description = description;
  }
}

async function getCoord(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8d5090306770f74a321e7b16c973ca04`;

  try {
    const thisCity = await fetch(url);
    const response = await thisCity.text();

    const coord = JSON.parse(response);
    const latCoord = coord.coord.lat;
    const lonCoord = coord.coord.lon;

    return [latCoord.toString(), lonCoord.toString()];
  } catch (e) {
    return "ERROR";
  }
}

async function fetchWeather(city, units) {
  const coordinates = await getCoord(city);

  if (coordinates !== "ERROR") {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates[0]}&lon=${coordinates[1]}&exclude=minutely,hourly&units=${units}&appid=8d5090306770f74a321e7b16c973ca04`;

    const data = await fetch(url);
    const response = await data.text();

    return JSON.parse(response);
  }

  return "ERROR";
}

async function weather(city, units = "imperial") {
  const data = await fetchWeather(city, units);

  if (data !== "ERROR") {
    const currentWeather = {
      date: data.current.dt,
      sunrise_time: data.current.sunrise,
      sunset_time: data.current.sunset,
      temp: data.current.temp,
      humidity: data.current.humidity,
      wind_speed: data.current.wind_speed,
      weather_id: data.current.weather[0].id,
      weather_description: data.current.weather[0].main,
    };

    console.log(currentWeather);

    const forecastWeather = data.daily.map((days) => {
      const date = days.dt;
      const max = days.temp.max;
      const min = days.temp.min;
      const id = days.weather[0].id;
      const description = days.weather[0].main;
      return new ForecastDays(date, max, min, id, description);
    });

    console.log(forecastWeather);

    const allWeather = {
      current: currentWeather,
      forecast: forecastWeather,
    };

    return allWeather;
  }

  return console.log("Location Not Found");
}
