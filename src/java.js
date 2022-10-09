let now = new Date();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let date = now.getDate();
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let todayDate = document.querySelector("#date");
todayDate.innerHTML = `${day}, ${date} ${month}`;
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayForecast(tempo) {
  console.log(tempo.data.daily);
  let forecast = tempo.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        `
               <div class="col-1">
                <div class="card-title">${formatDay(forecastDay.dt)}</div>
                <img src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }.png" width="42"/>
              <div class="weather-forecast-temperature">
                  <span class="weather-forecast-max">${Math.round(
                    forecastDay.temp.max
                  )}°</span>
                  <span class="weather-forecast-min">${Math.round(
                    forecastDay.temp.min
                  )}°</span>
                  </div>
            </div>`;
    }
  });
  forecastElement.innerHTML = forecastHTML + `</div>`;
}
function getForecast(coordinates) {
  let apiKey = "a43564c91a6c605aeb564c9ed02e3858";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function search(cityy) {
  let apiKey = "4b0b2f517c80e7ab3164919ae7be38b7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityy}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

function showTemp(tempo) {
  let heading = document.querySelector("h1");
  heading.innerHTML = `${tempo.data.name}`;
  celciusTemperature = tempo.data.main.temp;
  let temperatureElement = document.querySelector("#just-now");
  temperatureElement.innerHTML = `${Math.round(tempo.data.main.temp)}`;
  let maxElement = document.querySelector("#highest");
  maxElement.innerHTML = `${Math.round(tempo.data.main.temp_max)}`;
  let minElement = document.querySelector("#lowest");
  minElement.innerHTML = `${Math.round(tempo.data.main.temp_min)}`;
  let precipitationElement = document.querySelector("#prec");
  precipitationElement.innerHTML = `${tempo.data.main.humidity}`;
  let windElement = document.querySelector("#sooz");
  windElement.innerHTML = `${Math.round(tempo.data.wind.speed)}`;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = `${tempo.data.weather[0].description}`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${tempo.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", tempo.data.weather[0].main);
  getForecast(tempo.data.coord);
}
function enterNew(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#city-input");
  let heading = document.querySelector("h1");
  heading.innerHTML = currentCity.value;
  let cityy = currentCity.value;
  search(cityy);
}

let submit = document.querySelector("#button-addon2");
submit.addEventListener("click", enterNew);

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
function showPosition(position) {
  let apiKey = "4b0b2f517c80e7ab3164919ae7be38b7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

let button = document.querySelector("#button-addon3");
button.addEventListener("click", getCurrentLocation);

function displayCelciusTemp(conversion) {
  conversion.preventDefault();
  fahrenheitLink.classList.remove("active");
  celciusLink.classList.add("active");
  let temperatureElement = document.querySelector("#just-now");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemp);

function displayFahrenheitTemp(convert) {
  convert.preventDefault();
  fahrenheitLink.classList.add("active");
  celciusLink.classList.remove("active");
  let temperatureElement = document.querySelector("#just-now");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

search("Paris");
