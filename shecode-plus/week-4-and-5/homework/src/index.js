let apiKey = "906649fdf112556a043b2efecf09654c";

let now = new Date();
let dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let dayOfWeek = dayNames[now.getDay()];

// let hour
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}

// minute
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

let currentTime = dayOfWeek + " " + hour + ":" + minute;

console.log(currentTime); // or display on your HTML page with document.write(currentTime);

let daySelector = document.querySelector("#day");
daySelector.innerHTML = currentTime;

// temperature
function showTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#number");
  temperatureElement.innerHTML = `${temperature}`;

  // update city name
  let currentCity = document.querySelector("#cityName");
  currentCity.innerHTML = response.data.name;

  // update the temperature-description
  let description = document.querySelector("#temperature-description");
  description.innerHTML = response.data.weather[0].description;
}
function search(event) {
  event.preventDefault();
  let city = document.querySelector("#cityInput");
  console.log(city.value);
  let citySelector = document.querySelector("#cityName");
  citySelector.innerHTML = city.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
  city.value = "";
}

function showPosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let apiUrlLat = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`;
  axios.get(`${apiUrlLat}&appid=${apiKey}`).then(showTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentBut = document.querySelector("#current");
currentBut.addEventListener("click", getCurrentPosition);

let searchBut = document.querySelector("#search");
searchBut.addEventListener("click", search);
