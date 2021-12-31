import { weather } from "./app";

let units = "imperial";

window.onload = weather("Los Angeles, US", units);

function whichUnit(unit) {
  if (unit === "f") {
    units = "imperial";
    console.log(units);
  } else {
    units = "metric";
    console.log(units);
  }
}

const events = (() => {
  document.getElementById("search").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      weather(event.target.value, units);
      event.target.value = "";
    }
  })
  document.getElementById("imperial").addEventListener("click", () => {
    whichUnit("f");
  });
  document.getElementById("metric").addEventListener("click", () => {
    whichUnit("c");
  });
})();
