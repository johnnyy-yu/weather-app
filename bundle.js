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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUVBQW1FLEtBQUs7O0FBRXhFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx1RUFBdUUsZUFBZSxPQUFPLGVBQWUsaUNBQWlDLE1BQU07O0FBRW5KO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEZvcmVjYXN0RGF5cyB7XG4gIGNvbnN0cnVjdG9yKGRhdGUsIG1heCwgbWluLCBpZCwgZGVzY3JpcHRpb24pIHtcbiAgICB0aGlzLmRhdGUgPSBkYXRlO1xuICAgIHRoaXMubWF4X3RlbXAgPSBtYXg7XG4gICAgdGhpcy5taW5fdGVtcCA9IG1pbjtcbiAgICB0aGlzLndlYXRoZXJfaWQgPSBpZDtcbiAgICB0aGlzLndlYXRoZXJfZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRDb29yZChjaXR5KSB7XG4gIGNvbnN0IHVybCA9IGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7Y2l0eX0mYXBwaWQ9OGQ1MDkwMzA2NzcwZjc0YTMyMWU3YjE2Yzk3M2NhMDRgO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgdGhpc0NpdHkgPSBhd2FpdCBmZXRjaCh1cmwpO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpc0NpdHkudGV4dCgpO1xuXG4gICAgY29uc3QgY29vcmQgPSBKU09OLnBhcnNlKHJlc3BvbnNlKTtcbiAgICBjb25zdCBsYXRDb29yZCA9IGNvb3JkLmNvb3JkLmxhdDtcbiAgICBjb25zdCBsb25Db29yZCA9IGNvb3JkLmNvb3JkLmxvbjtcblxuICAgIHJldHVybiBbbGF0Q29vcmQudG9TdHJpbmcoKSwgbG9uQ29vcmQudG9TdHJpbmcoKV07XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gXCJFUlJPUlwiO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGZldGNoV2VhdGhlcihjaXR5LCB1bml0cykge1xuICBjb25zdCBjb29yZGluYXRlcyA9IGF3YWl0IGdldENvb3JkKGNpdHkpO1xuXG4gIGlmIChjb29yZGluYXRlcyAhPT0gXCJFUlJPUlwiKSB7XG4gICAgY29uc3QgdXJsID0gYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9vbmVjYWxsP2xhdD0ke2Nvb3JkaW5hdGVzWzBdfSZsb249JHtjb29yZGluYXRlc1sxXX0mZXhjbHVkZT1taW51dGVseSxob3VybHkmdW5pdHM9JHt1bml0c30mYXBwaWQ9OGQ1MDkwMzA2NzcwZjc0YTMyMWU3YjE2Yzk3M2NhMDRgO1xuXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IGZldGNoKHVybCk7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBkYXRhLnRleHQoKTtcblxuICAgIHJldHVybiBKU09OLnBhcnNlKHJlc3BvbnNlKTtcbiAgfVxuXG4gIHJldHVybiBcIkVSUk9SXCI7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHdlYXRoZXIoY2l0eSwgdW5pdHMgPSBcImltcGVyaWFsXCIpIHtcbiAgY29uc3QgZGF0YSA9IGF3YWl0IGZldGNoV2VhdGhlcihjaXR5LCB1bml0cyk7XG5cbiAgaWYgKGRhdGEgIT09IFwiRVJST1JcIikge1xuICAgIGNvbnN0IGN1cnJlbnRXZWF0aGVyID0ge1xuICAgICAgZGF0ZTogZGF0YS5jdXJyZW50LmR0LFxuICAgICAgc3VucmlzZV90aW1lOiBkYXRhLmN1cnJlbnQuc3VucmlzZSxcbiAgICAgIHN1bnNldF90aW1lOiBkYXRhLmN1cnJlbnQuc3Vuc2V0LFxuICAgICAgdGVtcDogZGF0YS5jdXJyZW50LnRlbXAsXG4gICAgICBodW1pZGl0eTogZGF0YS5jdXJyZW50Lmh1bWlkaXR5LFxuICAgICAgd2luZF9zcGVlZDogZGF0YS5jdXJyZW50LndpbmRfc3BlZWQsXG4gICAgICB3ZWF0aGVyX2lkOiBkYXRhLmN1cnJlbnQud2VhdGhlclswXS5pZCxcbiAgICAgIHdlYXRoZXJfZGVzY3JpcHRpb246IGRhdGEuY3VycmVudC53ZWF0aGVyWzBdLm1haW4sXG4gICAgfTtcblxuICAgIGNvbnNvbGUubG9nKGN1cnJlbnRXZWF0aGVyKTtcblxuICAgIGNvbnN0IGZvcmVjYXN0V2VhdGhlciA9IGRhdGEuZGFpbHkubWFwKChkYXlzKSA9PiB7XG4gICAgICBjb25zdCBkYXRlID0gZGF5cy5kdDtcbiAgICAgIGNvbnN0IG1heCA9IGRheXMudGVtcC5tYXg7XG4gICAgICBjb25zdCBtaW4gPSBkYXlzLnRlbXAubWluO1xuICAgICAgY29uc3QgaWQgPSBkYXlzLndlYXRoZXJbMF0uaWQ7XG4gICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRheXMud2VhdGhlclswXS5tYWluO1xuICAgICAgcmV0dXJuIG5ldyBGb3JlY2FzdERheXMoZGF0ZSwgbWF4LCBtaW4sIGlkLCBkZXNjcmlwdGlvbik7XG4gICAgfSk7XG5cbiAgICBjb25zb2xlLmxvZyhmb3JlY2FzdFdlYXRoZXIpO1xuXG4gICAgY29uc3QgYWxsV2VhdGhlciA9IHtcbiAgICAgIGN1cnJlbnQ6IGN1cnJlbnRXZWF0aGVyLFxuICAgICAgZm9yZWNhc3Q6IGZvcmVjYXN0V2VhdGhlcixcbiAgICB9O1xuXG4gICAgcmV0dXJuIGFsbFdlYXRoZXI7XG4gIH1cblxuICByZXR1cm4gY29uc29sZS5sb2coXCJMb2NhdGlvbiBOb3QgRm91bmRcIik7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=