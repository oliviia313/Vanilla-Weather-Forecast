function handleSubmit(e) {
  e.preventDefault();
  let searchInput = document.querySelector(".search-input");
  let cityElement = document.querySelector("#current-city");
  let city = `${
    searchInput.value.charAt(0).toUpperCase() + searchInput.value.slice(1)
  }`;
  cityElement.innerHTML = city;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
