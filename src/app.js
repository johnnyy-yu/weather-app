import appendData from "./DOM";

class ForecastDays {
  constructor(date, max, min, icon, description) {
    this.date = date;
    this.max_temp = max;
    this.min_temp = min;
    this.weather_icon = icon;
    this.weather_description = description;
  }
}

async function getCoord(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8d5090306770f74a321e7b16c973ca04`;

  const thisCity = await fetch(url);
  const response = await thisCity.text();

  const coord = JSON.parse(response);
  const latCoord = coord.coord.lat;
  const lonCoord = coord.coord.lon;
  const zipCodeToCity = coord.name;

  return [latCoord.toString(), lonCoord.toString(), zipCodeToCity];
}

async function fetchWeather(city, unit) {
  const coordinates = await getCoord(city);

  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates[0]}&lon=${coordinates[1]}&exclude=minutely,hourly&units=${unit}&appid=8d5090306770f74a321e7b16c973ca04`;

  const data = await fetch(url);
  const response = await data.text();

  return [JSON.parse(response), coordinates[2]];
}

async function weather(city, unit) {
  try {
    const weatherData = await fetchWeather(city, unit);
    const data = weatherData[0];

    const currentWeather = {
      city_name: weatherData[1],
      date: data.current.dt,
      sunrise_time: data.current.sunrise,
      sunset_time: data.current.sunset,
      temp: data.current.temp,
      humidity: data.current.humidity,
      wind_speed: data.current.wind_speed,
      wind_deg: data.current.wind_deg,
      weather_icon: data.current.weather[0].icon,
      weather_description: data.current.weather[0].main,
    };

    const forecastWeather = data.daily.map((days) => {
      const date = days.dt;
      const max = days.temp.max;
      const min = days.temp.min;
      const icon = days.weather[0].icon;
      const description = days.weather[0].main;
      return new ForecastDays(date, max, min, icon, description);
    });

    const allWeather = {
      current: currentWeather,
      forecast: forecastWeather,
    };

    return appendData(allWeather);
  } catch (e) {
    return appendData("Location Not Found");
  }
}

export default weather;
