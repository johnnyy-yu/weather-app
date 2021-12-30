/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
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

  const thisCity = await fetch(url);
  const response = await thisCity.text();

  const coord = JSON.parse(response);
  const latCoord = coord.coord.lat;
  const lonCoord = coord.coord.lon;

  return [latCoord.toString(), lonCoord.toString()];
}

async function fetchWeather(city, units) {
  const coordinates = await getCoord(city);
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates[0]}&lon=${coordinates[1]}&exclude=minutely,hourly&units=${units}&appid=8d5090306770f74a321e7b16c973ca04`;

  const data = await fetch(url);
  const response = await data.text();

  return JSON.parse(response);
}

async function weather(city, units = "imperial") {
  const data = await fetchWeather(city, units);

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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUVBQW1FLEtBQUs7O0FBRXhFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFFQUFxRSxlQUFlLE9BQU8sZUFBZSxpQ0FBaUMsTUFBTTs7QUFFako7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgRm9yZWNhc3REYXlzIHtcbiAgY29uc3RydWN0b3IoZGF0ZSwgbWF4LCBtaW4sIGlkLCBkZXNjcmlwdGlvbikge1xuICAgIHRoaXMuZGF0ZSA9IGRhdGU7XG4gICAgdGhpcy5tYXhfdGVtcCA9IG1heDtcbiAgICB0aGlzLm1pbl90ZW1wID0gbWluO1xuICAgIHRoaXMud2VhdGhlcl9pZCA9IGlkO1xuICAgIHRoaXMud2VhdGhlcl9kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldENvb3JkKGNpdHkpIHtcbiAgY29uc3QgdXJsID0gYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9JHtjaXR5fSZhcHBpZD04ZDUwOTAzMDY3NzBmNzRhMzIxZTdiMTZjOTczY2EwNGA7XG5cbiAgY29uc3QgdGhpc0NpdHkgPSBhd2FpdCBmZXRjaCh1cmwpO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXNDaXR5LnRleHQoKTtcblxuICBjb25zdCBjb29yZCA9IEpTT04ucGFyc2UocmVzcG9uc2UpO1xuICBjb25zdCBsYXRDb29yZCA9IGNvb3JkLmNvb3JkLmxhdDtcbiAgY29uc3QgbG9uQ29vcmQgPSBjb29yZC5jb29yZC5sb247XG5cbiAgcmV0dXJuIFtsYXRDb29yZC50b1N0cmluZygpLCBsb25Db29yZC50b1N0cmluZygpXTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZmV0Y2hXZWF0aGVyKGNpdHksIHVuaXRzKSB7XG4gIGNvbnN0IGNvb3JkaW5hdGVzID0gYXdhaXQgZ2V0Q29vcmQoY2l0eSk7XG4gIGNvbnN0IHVybCA9IGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvb25lY2FsbD9sYXQ9JHtjb29yZGluYXRlc1swXX0mbG9uPSR7Y29vcmRpbmF0ZXNbMV19JmV4Y2x1ZGU9bWludXRlbHksaG91cmx5JnVuaXRzPSR7dW5pdHN9JmFwcGlkPThkNTA5MDMwNjc3MGY3NGEzMjFlN2IxNmM5NzNjYTA0YDtcblxuICBjb25zdCBkYXRhID0gYXdhaXQgZmV0Y2godXJsKTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBkYXRhLnRleHQoKTtcblxuICByZXR1cm4gSlNPTi5wYXJzZShyZXNwb25zZSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHdlYXRoZXIoY2l0eSwgdW5pdHMgPSBcImltcGVyaWFsXCIpIHtcbiAgY29uc3QgZGF0YSA9IGF3YWl0IGZldGNoV2VhdGhlcihjaXR5LCB1bml0cyk7XG5cbiAgY29uc3QgY3VycmVudFdlYXRoZXIgPSB7XG4gICAgZGF0ZTogZGF0YS5jdXJyZW50LmR0LFxuICAgIHN1bnJpc2VfdGltZTogZGF0YS5jdXJyZW50LnN1bnJpc2UsXG4gICAgc3Vuc2V0X3RpbWU6IGRhdGEuY3VycmVudC5zdW5zZXQsXG4gICAgdGVtcDogZGF0YS5jdXJyZW50LnRlbXAsXG4gICAgaHVtaWRpdHk6IGRhdGEuY3VycmVudC5odW1pZGl0eSxcbiAgICB3aW5kX3NwZWVkOiBkYXRhLmN1cnJlbnQud2luZF9zcGVlZCxcbiAgICB3ZWF0aGVyX2lkOiBkYXRhLmN1cnJlbnQud2VhdGhlclswXS5pZCxcbiAgICB3ZWF0aGVyX2Rlc2NyaXB0aW9uOiBkYXRhLmN1cnJlbnQud2VhdGhlclswXS5tYWluLFxuICB9O1xuXG4gIGNvbnNvbGUubG9nKGN1cnJlbnRXZWF0aGVyKTtcblxuICBjb25zdCBmb3JlY2FzdFdlYXRoZXIgPSBkYXRhLmRhaWx5Lm1hcCgoZGF5cykgPT4ge1xuICAgIGNvbnN0IGRhdGUgPSBkYXlzLmR0O1xuICAgIGNvbnN0IG1heCA9IGRheXMudGVtcC5tYXg7XG4gICAgY29uc3QgbWluID0gZGF5cy50ZW1wLm1pbjtcbiAgICBjb25zdCBpZCA9IGRheXMud2VhdGhlclswXS5pZDtcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRheXMud2VhdGhlclswXS5tYWluO1xuICAgIHJldHVybiBuZXcgRm9yZWNhc3REYXlzKGRhdGUsIG1heCwgbWluLCBpZCwgZGVzY3JpcHRpb24pO1xuICB9KTtcblxuICBjb25zb2xlLmxvZyhmb3JlY2FzdFdlYXRoZXIpO1xuXG4gIGNvbnN0IGFsbFdlYXRoZXIgPSB7XG4gICAgY3VycmVudDogY3VycmVudFdlYXRoZXIsXG4gICAgZm9yZWNhc3Q6IGZvcmVjYXN0V2VhdGhlcixcbiAgfTtcblxuICByZXR1cm4gYWxsV2VhdGhlcjtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==