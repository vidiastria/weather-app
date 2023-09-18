function formatDate(date) {
    let hour = date.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    let dayIndex = date.getDay();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let day = days[dayIndex];

    let monthIndex = date.getMonth();
    let months = [
        "Jan",
        "Feb",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
    ];
    let month = months[monthIndex];
    let tanggal = date.getDate();
    let year = date.getFullYear();
    return `${day} ${tanggal} ${month}, ${year} | ${hour}:${minutes}`;
}

let currentDate = document.querySelector("#current-date");
let currentTime = new Date();
currentDate.innerHTML = formatDate(currentTime);

// function Geo Location
function showWeather(response) {
    console.log(response);
    let tempElement = document.querySelector("#currentTemp");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description-content");
    let humidityElement = document.querySelector("#humidity-content");
    let windElement = document.querySelector("#wind-content");

    tempElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;ß
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);

    /*
    h1.innerHTML = `Now ${temperature}°`;
    let newCity = response.data.name;
    document.querySelector("#current-city").innerHTML = `${newCity}`; */
}
let apiKey = `92ae1b187edd2a2ef4402a40ac2b91dd`;
let apiText = `https://api.openweathermap.org/data/2.5/weather?q=Jakarta&appid=${apiKey}&units=metric`;
axios.get(apiText).then(showWeather);

function showPosition(position) {
    let lati = position.coords.latitude;
    let longi = position.coords.longitude;
    let apiUrl = `${apiText}?lat=${lati}&lon=${longi}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
}

function getCurrentPosition(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showPosition);
}
let buttonGeoTag = document.querySelector("#btnGeotag");
buttonGeoTag.addEventListener("click", getCurrentPosition);

// Form Search + Submit
function showTemp(response) {
    document.querySelector("#currentTemp").innerHTML = Math.round(
        response.data.main.temp
    );
    document.querySelector("#current-city").innerHTML = response.data.name;
}

function showCityTemp(city) {
    let apiUrl = `${apiText}?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemp);
}

function getCity(event) {
    event.preventDefault();
    let currentCity = document.querySelector("#search-city").value;
    showCityTemp(currentCity);
}

// Celcius - Fahrenheit click, still on progress
// Click C
function clickCelcius(event) {
    event.preventDefault();
    let currentCels = document.querySelector("#currentTemp");
    currentCels = currentCels.innerHTML = `C`;
}
let celciusLink = document.querySelector("#linkCelcius");
celciusLink.addEventListener("click", clickCelcius);

// Click F
function clickFahrent(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#currentTemp");
    let fahrentTemperature = (temperatureElement.innerHTML * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrentTemperature);
}

let celciusTemperature = null;
let form = document.querySelector("#search-form");
form.addEventListener("submit", getCity);

let fahrentLink = document.querySelector("#linkFahrent");
fahrentLink.addEventListener("click", clickFahrent);

// function C to F, calculate for the real degrees
