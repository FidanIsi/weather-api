let searchBtn = document.querySelector(".fa-search")
let searchInput = document.querySelector(".search-input")

const apiKey = "07f82e8463c946c9903202822230511&q"
let searchCity;

searchInput.addEventListener("keyup", (e) => {
  let input = e.target.value.trim();
  searchCity = input;
});

searchBtn.addEventListener("click", () => {
  fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}=${searchCity}&aqi=no`)
  .then((x)=> {
    if(!x.ok)throw new Error("Location not found!");
    return x.json();
  })
  .then((x) => {
    renderWeatherData(x.location.country, x.location.name, x.location.localtime, x.current.temp_c, x.current.condition.icon, x.current.wind_kph, x.current.humidity, x.current.feelslike_c, x.current.uv)
  })
  .catch((x) => {
    renderLocationNotFound(x.message);
  })
})

function renderLocationNotFound(errorMsg) {
  const temperatureElement = document.querySelector(".temperature")
  temperatureElement.innerHTML = errorMsg;

  document.querySelector(".icon").style.display = "none";
  document.querySelector(".wind-icon img").style.display = "none";
  document.querySelector(".humidity-icon img").style.display = "none";
  document.querySelector(".country").style.display = "none";
  document.querySelector(".city").style.display = "none";
  document.querySelector(".time").style.display = "none";
  document.querySelector(".details").style.display = "none";

}

function renderWeatherData(country, city, localTime, temperature, conditionIcon, windkph, humidity, feels, uv) {
  document.querySelector(".icon").style.display = "inline-block";
  document.querySelector(".wind-icon img").style.display = "inline-block";
  document.querySelector(".humidity-icon img").style.display = "inline-block";
  document.querySelector(".country").style.display = "inline-block";
  document.querySelector(".city").style.display = "inline-block";
  document.querySelector(".time").style.display = "block";
  document.querySelector(".details").style.display = "block";

  const countryName = document.querySelector(".country")
  countryName.innerHTML = country + ",";

  const cityName = document.querySelector(".city")
  cityName.innerHTML = city;

  const dateTime = new Date(localTime);
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

  const time = document.querySelector(".time");
  time.innerHTML = formattedTime;

  const conditionElement = document.querySelector(".icon")
  conditionElement.src = `https:${conditionIcon}`;

  const temperatureElement = document.querySelector(".temperature")
  temperatureElement.innerHTML = temperature + " °C";

  const windSpeed = document.querySelector(".wind-speed")
  windSpeed.innerHTML = windkph + " km/h";

  const humiditySpeed = document.querySelector(".humidity-speed")
  humiditySpeed.innerHTML = humidity + " %";

  const feelsLike = document.querySelector(".feels_like")
  feelsLike.innerHTML = "Feels like: " + feels + " °C";

  const uvIndex = document.querySelector(".uv_index")
  uvIndex.innerHTML = uv;
}