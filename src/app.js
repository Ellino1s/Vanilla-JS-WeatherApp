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

  let today = date.getDate();

  let monthIndex = date.getMonth();
  let months = [
    "Juniary",
    "Febriary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let month = months[monthIndex];

  return `${day}, ${today} ${month}, ${hours}:${minutes}`;
}

let currentDay = document.querySelector("#current-day");
let currentTime = new Date();

currentDay.innerHTML = formatDate(currentTime);

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Wed", "Thu", "Fri"];
  let forecastHTML = `<div class="forecast row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="card-days col-2">
        <p class="weather-forecast-date">${day}</p>
          <img src="images/sun.svg" alt="Weather icon" class="days-icon">
          <div class="days-info weather-forecast-temperature">
            <span class="weather-forecast-temp-max">15°</span>
            <span class="weather-forecast-temp-min">7°</span>
          </div>
      </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function formatHoursSunrise(timestamp) {
  let time = new Date(timestamp);
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes} AM`;
}

function formatHoursSunset(timestamp) {
  let time = new Date(timestamp);
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes} PM`;
}

function displayTemperature(response) {
  let searchInput = document.querySelector(".card-title");
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let sunriseElement = document.querySelector("#sunrise");
  let sunsetElement = document.querySelector("#sunset");
  let iconElement = document.querySelector("#icon");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  cityElement.innerHTML = response.data.name;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  sunriseElement.innerHTML = formatHoursSunrise(
    response.data.sys.sunrise * 1000
  );
  sunsetElement.innerHTML = formatHoursSunset(response.data.sys.sunset * 1000);
  iconElement.setAttribute(
    "src",
    `images/${response.data.weather[0].icon}.svg`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

// Search city
function search(city) {
  let apiKey = "abb718efb6610d827a11186939f62b73";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value.toLowerCase();
  search(city);
}

let searchCity = document.querySelector(".search");
searchCity.addEventListener("submit", handleSubmit);

search("Prague");
displayForecast();
