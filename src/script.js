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

  getForecast(city);
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

let key = "t9e2fb71e7f8f479occ3650b2b4f0a04";

function searchCity(city) {
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}&units=metric`;
  axios.get(url).then(updateWeatherInfo);
}

function handleSubmit(e) {
  e.preventDefault();
  let searchInput = document.querySelector(".search-input");
  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let url = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${key}&units=metric`;
  axios(url).then(showForecast);
  console.log(url);
}

function showForecast(response) {
  let forecast = document.querySelector("#forecast");
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml += `
      <div class="forecast-day">
        <div class="week-day">${formatDay(day.time)}</div>
        <img class="forecast-day-icon" src="${
          day.condition.icon_url
        }" alt="daily weather icon" />
        <div class="forecast-day-temp">
          <span class="temp-max red">${Math.round(
            day.temperature.maximum
          )}°</span>
          <span class="temp-min red">${Math.round(
            day.temperature.minimum
          )}°</span>
        </div>
      </div>`;
    }
  });
  forecast.innerHTML = forecastHtml;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

searchCity("Paris");
