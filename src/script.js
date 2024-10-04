function updateWeatherInfo(response) {
  let tempElement = document.querySelector("#current-temp");
  let temp = response.data.temperature.current;
  let cityElement = document.querySelector("#current-city");
  let city = `${
    response.data.city.charAt(0).toUpperCase() + response.data.city.slice(1)
  }`;
  cityElement.innerHTML = city;
  tempElement.innerHTML = Math.round(temp);
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
