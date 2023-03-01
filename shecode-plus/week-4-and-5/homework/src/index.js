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
let hour = now.getHours();

// let hour
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

//
function showTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#number");
  temperatureElement.innerHTML = `${temperature}`;

  //   update city name

  let currentCity = document.querySelector("#cityName");
  currentCity.innerHTML = response.data.name;
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
let form = document.querySelector("#search");
form.addEventListener("click", search);

function showPosition(position) {
  let h2 = document.getElementById("current-latitude-longitude");
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let apiUrlLat = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`;
  axios.get(`${apiUrlLat}&appid=${apiKey}`).then(showTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let current = document.querySelector("#current");
current.addEventListener("click", getCurrentPosition);

// let cel = document.querySelector("#celcius");
// cel.addEventListener("click", function (event) {
//   event.preventDefault();
//   let num = document.querySelector("#number");
//   num.innerHTML = "23";
// });

// let fah = document.querySelector("#fahrenheit");
// fah.addEventListener("click", function (event) {
//   event.preventDefault();
//   let num = document.querySelector("#number");
//   num.innerHTML = "73";
// });

// search engine

// let apiKey = "906649fdf112556a043b2efecf09654c";
// // let city = "Sydney";
// let apiUrl =
//   `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

// // Make a request for a user with a given ID
// function showTemperature(response) {
//   console.log(response.data);
//   let temperature = Math.round(response.data.main.temp);
//   let temperatureElement = document.querySelector("#number");
//   temperatureElement.innerHTML = `${temperature}`;

// }

// let h2 = document.querySelector("#cityName");
// h2.innerHTML = city;

// axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);

// 1. addEventListener to button
// 2. call search function
// 3. inside search function update the city display name
// 4. with the same city name call weather api from inside the function
// 5.
