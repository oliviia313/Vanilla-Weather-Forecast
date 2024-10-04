function updateWeatherInfo(response) {
  let tempElement = document.querySelector("#current-temp");
  let temp = response.data.temperature.current;
  let cityElement = document.querySelector("#current-city");
  let city = `${
    response.data.city.charAt(0).toUpperCase() + response.data.city.slice(1)
  }`;
  let descElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dayTime = document.querySelector("#dayTime");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = city;
  dayTime.innerHTML = formatDate(date);
  descElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  iconElement.innerHTML = `<img class="temp-icon" src="${response.data.condition.icon_url}" alt="weather icon" />`;
  tempElement.innerHTML = Math.round(temp);
}

function formatDate(date) {
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekDay = days[day];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${weekDay} ${hours}:${minutes}`;
}

function searchCity(city) {
  let key = "t9e2fb71e7f8f479occ3650b2b4f0a04";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}&units=metric`;
  axios.get(url).then(updateWeatherInfo);
}

function handleSubmit(e) {
  e.preventDefault();
  let searchInput = document.querySelector(".search-input");
  searchCity(searchInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
searchCity("Paris");
