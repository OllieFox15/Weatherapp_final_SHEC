function search(city) {
  apiKey = `db66422e747e63d094483b92402e4d1e`;
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}
search("Auckland");

function formatDate(timestamp) {
  //calculate the date
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;
  //let days = ["Sun", "Mon", "Tues", "Wed",];

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `      <div class= "col-2" class="weather-forecast-dated" id="weather-forecast-dated" >
                <span class="weather-forecast-dated" id="weather-forecast-dated" >
                ${formatDay(forecastDay.dt)} </span>
               <img  
           src="http://openweathermap.org/img/wn/${
             forecastDay.weather[0].icon
           }@2x.png"
          alt=""
          width="52"
              <bold> <span class="weather-forecast-high" id="weather-forecast-high"> ${Math.round(
                forecastDay.temp.max
              )} &deg; 
              </bold>  <span class="weather-forecast-low" id="weather-forecast-low"> ${Math.round(
                forecastDay.temp.min
              )}&deg;   </span> 
            
                      </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = `db66422e747e63d094483b92402e4d1e`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");

  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let dateTimeElement = document.querySelector("#dateTime");
  let iconElement = document.querySelector("#icon");
  let windElement = document.querySelector("#wind");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = response.data.wind.speed;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  iconElement.setAttribute(
    "alt",
    `http://openweathermap.org/img/wn/${response.data.weather[0].description}.png`
  );
  dateTimeElement.innerHTML = formatDate(response.data.dt * 1000);

  getForecast(response.data.coord);
}

let form = document.querySelector("#searchform");
form.addEventListener("submit", handleSubmit);

/*function showPosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
}
*/
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

/*function showPosition(){
let h1 = document.querySelector('h1');
  h1.innerHTML = ``


}*/

function showWeather(response) {
  let h1 = document.querySelector("h1");
  console.log(response);
  h1.innerHTML = `${response.data.name}`;
}

function showPosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

let button = document.querySelector("#currentLocation");
button.addEventListener("click", getCurrentPosition);
