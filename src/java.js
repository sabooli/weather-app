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

function search(cityy) {
  let apiKey = "4b0b2f517c80e7ab3164919ae7be38b7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityy}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

function showTemp(tempo) {
  console.log(tempo.data);
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
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${tempo.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", tempo.data.weather[0].main);
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
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemp);
}

function displayTemp(tempi) {
  console.log(tempi.data);
  let heading = document.querySelector("h1");
  heading.innerHTML = `${tempi.data.name}`;
  let temperatureElementt = document.querySelector("#just-now");
  temperatureElementt.innerHTML = `${Math.round(tempi.data.main.temp)}`;
  let maxiElement = document.querySelector("#highest");
  maxiElement.innerHTML = `${Math.round(tempi.data.main.temp_max)}`;
  let miniElement = document.querySelector("#lowest");
  miniElement.innerHTML = `${Math.round(tempi.data.main.temp_min)}`;
  let humidityElement = document.querySelector("#prec");
  humidityElement.innerHTML = `${tempi.data.main.humidity}`;
  let winddElement = document.querySelector("#sooz");
  winddElement.innerHTML = `${Math.round(tempi.data.wind.speed)}`;
}

let button = document.querySelector("#button-addon3");
button.addEventListener("click", getCurrentLocation);

search("Paris");
