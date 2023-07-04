function formatDateTime(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let indexDay = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[indexDay];
  return `${day} ${hours}:${minutes}`;
}

function displayWeatherCondition(response) {
  console.log(response);
  let cityTemp = Math.round(response.data.main.temp);
  let cityRetrieved = response.data.name;
  let windRetrieved = Math.round(response.data.wind.speed);
  let skyDescripRetrieved = response.data.weather[0].description;
  let cityName = document.querySelector("#city");
  cityName.innerHTML = cityRetrieved;
  let cityTemperature = document.querySelector("#temperature");
  cityTemperature.innerHTML = cityTemp;
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = windRetrieved;
  let skyDescription = document.querySelector("#sky-descrip");
  skyDescription.innerHTML = skyDescripRetrieved;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
}

function searchCity(city) {
  let apiKey = "0d4847b8ed5adf866001a54ef0a28029";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let unit = "metric";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let inputCity = searchInput.value;
  searchCity(inputCity);
}

function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "0d4847b8ed5adf866001a54ef0a28029";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let unit = "metric";
  let apiUrl = `${apiEndpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  debugger;
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let now = new Date();
let currentDateTime = document.querySelector("#date-time");
currentDateTime.innerHTML = formatDateTime(now);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentPlace = document.querySelector("#current");
currentPlace.addEventListener("click", getCurrentLocation);
