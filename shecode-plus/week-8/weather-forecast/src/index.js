// let apiKey = "906649fdf112556a043b2efecf09654c";
let apiKey = "c5f0e59acac64258bb92ed027d20c68f";
const baseKel = 273.15;
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function makeWeatherApiRequest(url) {
  axios.get(url).then(function (response) {
    // handle success
    console.log(response);
    updateCityName(response.data.name);
    updateDateTime(response.data.dt);
    updateWeatherDesc(response.data.weather[0].description);
    updateHumidity(response.data.main.humidity);
    updateWind(response.data.wind.speed);
    updateTemperature(response.data.main.temp);
    updateIcon(response.data.weather[0].icon);
    weatherDailyForecast(response.data.coord);
  });
}
function weatherDailyForecast(coordinates) {
  // weatherForecast();
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(function (response) {
    weatherForecast(response.data.daily.slice(0, 5));
  });
}

function updateIcon(icon) {
  let imgUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  let img = document.getElementById("weatherIcon");
  img.setAttribute("src", imgUrl);
}
function updateTemperature(temp) {
  let celciusTemperature = document.getElementById("celciusTemperature");
  let fahrenheitTemperature = document.getElementById("fahrenheitTemperature");
  let cTemp = temp - baseKel;
  let fTemp = (cTemp * 9) / 5 + 32;
  celciusTemperature.innerHTML = Math.round(cTemp);
  fahrenheitTemperature.innerHTML = Math.round(fTemp);
}

function updateWind(speed) {
  let weatherWind = document.getElementById("wind");
  weatherWind.innerHTML = `Wind: <strong>${speed}km/h`;
}
function updateHumidity(humidity) {
  let weatherHumidity = document.getElementById("humidity");
  weatherHumidity.innerHTML = `Humidity: <strong>${humidity}%</strong> `;
}

function updateWeatherDesc(description) {
  let weatherDesc = document.getElementById("tempDescription");
  weatherDesc.innerHTML = description;
}
function updateDateTime(epochTime) {
  let dt = epochTime * 1000;
  let formattedTime = formatDate(dt);

  let dayTime = document.querySelector("#day");
  dayTime.innerHTML = formattedTime;
}

function updateCityName(name) {
  let cityName = document.getElementById("cityNameDisplay");
  cityName.innerHTML = name;
}
function getWeatherByCity(event) {
  event.preventDefault();
  let cityName = document.getElementById("cityInput").value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  makeWeatherApiRequest(url);
}
let weatherForm = document.getElementById("weatherForm");
weatherForm.addEventListener("submit", getWeatherByCity);

function getCurrentPosition(event) {
  event.preventDefault();
  let pos = navigator.geolocation.getCurrentPosition(showWeatherOfPosition);
}
function showWeatherOfPosition(position) {
  console.log(position);
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}`;

  makeWeatherApiRequest(url);
}
let currentBut = document.getElementById("current");
currentBut.addEventListener("click", getCurrentPosition);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function weatherForecast(days) {
  let forecastHTML = ` <div class="row weather-forecast text-secondary" >`;

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col">
        <div class="weatherForecastPreview">
          <div class="forecastDay">${formatDay(day.dt * 1000)}</div>
            <img
            id="weatherIcon"
            src="https://openweathermap.org/img/wn/${
              day.weather[0].icon
            }@2x.png"
            alt=""
            />
          <div class="forcastTemperature">
            <span class="tempMax">${Math.round(day.temp.max)}°</span> <br>
            <span class="tempMin">${Math.round(day.temp.min)}°</span>
          </div>
        </div>
      </div>`;
  });

  forecastHTML = forecastHTML + ` </div>`;

  document.getElementById("forecast").innerHTML = forecastHTML;
}

// let searchSubmit = document.querySelector("#searchSubmit");
// searchSubmit.addEventListener("submit", makeWeatherApiRequest);

let defCity = function () {
  let cityName = "Patan";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  makeWeatherApiRequest(url);
};

defCity();
