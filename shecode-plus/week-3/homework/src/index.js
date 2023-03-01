let weather = {
  bhaktapur: {
    temp: 19.7,
    humidity: 80,
  },
  semarang: {
    temp: 17.3,
    humidity: 50,
  },
  "kuala lumpur": {
    temp: 30.2,
    humidity: 20,
  },
  // "san francisco": {
  //   temp: 20.9,
  //   humidity: 100
  // },
  sydney: {
    temp: -5,
    humidity: 20,
  },
};
console.log(weather);
// write your code here

function citySearch() {
  let city = prompt("Enter a city");
  // alert("anything");
  console.log(city);
  if (weather[city] == undefined) {
    alert(
      `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+ ${city}`
    );
  } else {
    let temperature = Math.round(weather[city]["temp"]);
    alert(
      `It is currently ${temperature} in ${city} with a humidity of ${weather[city]["humidity"]} `
    );
  }
}
// Math.round(weather[city]["temp"]} in ${city})
