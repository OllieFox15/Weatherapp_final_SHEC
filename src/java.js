apiKey = `db66422e747e63d094483b92402e4d1e`;
apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Auckland&appid=${apiKey}&units=metric`;

function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");

  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");

  let windElement = document.querySelector("#wind");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = response.data.wind.speed;
}
console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);
