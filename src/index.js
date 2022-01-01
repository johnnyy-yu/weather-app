import { celsiusToFahrenheit, fahrenheitToCelsius } from "temperature";
import { weather } from "./app";
import "./style.css";
import background from "./stephen-leonardi-tIPb-Y9l7nA-unsplash.jpg";

// const background = () => {
//   const image = new Image();
//   image.src = background;
// }

let units = "imperial";

window.onload = weather("Los Angeles, US", units);

function whichUnit(unit) {
  if (unit === "f") {
    units = "imperial";
  } else {
    units = "metric";
  }
}

function convertTemp(unit) {
  const maxTemps = document.getElementsByClassName("max_temp");
  const minTemps = document.getElementsByClassName("min_temp");
  const currentTemp = document.getElementById("current-temp");

  if (unit === "F") {
    const currentBefore = currentTemp.textContent;
    currentTemp.textContent = Math.round(celsiusToFahrenheit(currentBefore));

    Array.from(maxTemps).forEach((temp) => {
      const before = temp.textContent;
      temp.textContent = Math.round(celsiusToFahrenheit(before));
    });

    Array.from(minTemps).forEach((temp) => {
      const before = temp.textContent;
      temp.textContent = Math.round(celsiusToFahrenheit(before));
    });
  } else if (unit === "C") {
    const currentBefore = currentTemp.textContent;
    currentTemp.textContent = Math.round(fahrenheitToCelsius(currentBefore));

    Array.from(maxTemps).forEach((temp) => {
      const before = temp.textContent;
      temp.textContent = Math.round(fahrenheitToCelsius(before));
    });

    Array.from(minTemps).forEach((temp) => {
      const before = temp.textContent;
      temp.textContent = Math.round(fahrenheitToCelsius(before));
    });
  }
}

const events = (() => {
  document.getElementById("search").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      weather(event.target.value, units);
      event.target.value = "";
    }
  });
  document.getElementById("imperial").addEventListener("click", () => {
    if (units === "metric") {
      whichUnit("f");
      convertTemp("F");
    }
  });
  document.getElementById("metric").addEventListener("click", () => {
    if (units === "imperial") {
      whichUnit("c");
      convertTemp("C");
    }
  });
  document.getElementById("f").addEventListener("click", () => {
    if (units === "metric") {
      convertTemp("F");
      units = "imperial";
    }
  });
  document.getElementById("c").addEventListener("click", () => {
    if (units === "imperial") {
      convertTemp("C");
      units = "metric";
    }
  });
})();
