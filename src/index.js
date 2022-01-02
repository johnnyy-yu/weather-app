import { celsiusToFahrenheit, fahrenheitToCelsius } from "temperature";
import { weather } from "./app";
import "./style.css";
import background from "./stephen-leonardi-tIPb-Y9l7nA-unsplash.jpg";

let units = "imperial";

window.onload = weather("Los Angeles, US", units);

function unitColorToggler() {
  if (units === "imperial") {
    document.getElementById("imperial").style.color = "silver";
    document.getElementById("f").style.color = "silver";
    document.getElementById("metric").style.color = "white";
    document.getElementById("c").style.color = "white";
  } else {
    document.getElementById("imperial").style.color = "white";
    document.getElementById("f").style.color = "white";
    document.getElementById("metric").style.color = "silver";
    document.getElementById("c").style.color = "silver";
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
      const before = temp.textContent.slice(3);
      temp.textContent = `H: ${Math.round(celsiusToFahrenheit(before))}`;
    });

    Array.from(minTemps).forEach((temp) => {
      const before = temp.textContent.slice(3);
      temp.textContent = `L: ${Math.round(celsiusToFahrenheit(before))}`;
    });
  } else if (unit === "C") {
    const currentBefore = currentTemp.textContent;
    currentTemp.textContent = Math.round(fahrenheitToCelsius(currentBefore));

    Array.from(maxTemps).forEach((temp) => {
      const before = temp.textContent.slice(3);
      temp.textContent = `H: ${Math.round(fahrenheitToCelsius(before))}`;
    });

    Array.from(minTemps).forEach((temp) => {
      const before = temp.textContent.slice(3);
      temp.textContent = `L: ${Math.round(fahrenheitToCelsius(before))}`;
    });
  }
}

const events = (() => {
  document.getElementById("search").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      weather(event.target.value, units);
      event.target.value = "";
      document.querySelector(".warning-message").textContent = "";
    }
  });
  document.getElementById("imperial").addEventListener("click", () => {
    if (units === "metric") {
      convertTemp("F");
      unitColorToggler();
      units = "imperial";
    }
  });
  document.getElementById("metric").addEventListener("click", () => {
    if (units === "imperial") {
      convertTemp("C");
      unitColorToggler();
      units = "metric";
    }
  });
  document.getElementById("f").addEventListener("click", () => {
    if (units === "metric") {
      convertTemp("F");
      unitColorToggler();
      units = "imperial";
    }
  });
  document.getElementById("c").addEventListener("click", () => {
    if (units === "imperial") {
      convertTemp("C");
      unitColorToggler();
      units = "metric";
    }
  });
})();
