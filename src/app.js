// Current day

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[dayIndex];

  return `${day}, ${hours}:${minutes}`;
}

let currentDay = document.querySelector("#current-day");
let currentTime = new Date();

currentDay.innerHTML = formatDate(currentTime);

// function capitalizeFirstLetter(string) {
//   return string.charAt(0).toUpperCase() + string.slice(1);
// }

function showWeather(response) {
  let searchInput = document.querySelector(".card-title");
  let temperatureElement = document.querySelector("#temperature-value");
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;

  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  searchInput.innerHTML = city;
  temperatureElement.innerHTML = `${temperature}℃`;
}

// Search city
function search(city) {
  let apiKey = "abb718efb6610d827a11186939f62b73";

  let units = "metric";

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value.toLowerCase();
  search(city);
}

let searchCity = document.querySelector(".search");
searchCity.addEventListener("submit", handleSubmit);
search("Prague");

// function displayCurrentTemp(response) {
//   let temperature = Math.round(response.data.main.temp);
//   let cityElement = response.data.name;

//   let currentCity = document.querySelector("#current-city");
//   let currentTemperature = document.querySelector("#temperature-value");

//   console.log(response.data);

//   currentCity.innerHTML = cityElement;
//   currentTemperature.innerHTML = `${temperature}℃`;
// }

function showCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "f9b06f3baaa6db7423d401dc6531fd6a";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(url).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

// function setToCelsius(event, response) {
//   event.preventDefault();
//   let city = document.querySelector(".card-title");
//   let currentTemperature = document.querySelector("#temperature-value");

//   currentTemperature.innerHTML = Math.round(response.data.main.temp);
// }
// let celsius = document.querySelector("#celsius");
// celsius.addEventListener("click", setToCelsius);

// function setToFahrenheit(event) {
//   event.preventDefault();
//   let currentTemperature = document.querySelector("#temperature-value");
//   let calculated = Math.round((currentTemperature.innerHTML * 9) / 5 + 32);
//   currentTemperature.innerHTML = calculated;
// }
// let fahrenheit = document.querySelector("#fahrenheit");
// fahrenheit.addEventListener("click", setToFahrenheit);
