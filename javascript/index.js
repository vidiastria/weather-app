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
    let h1 = document.querySelector("#currentTemp");
    let temperature = Math.round(response.data.main.temp);
    h1.innerHTML = `Now ${temperature}°`;

    document.querySelector("#current-city").innerHTML = `On Your Location`;
}
let apiKey = `92ae1b187edd2a2ef4402a40ac2b91dd`;
let apiText = `https://api.openweathermap.org/data/2.5/weather`;

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
    let city = document.querySelector("#search-city").value;
    showCityTemp(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", getCity);

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
    let currentCels = document.querySelector("#currentTemp");
    currentCels.innerHTML = currentCels - 32;
}
let fahrentLink = document.querySelector("#linkFahrent");
fahrentLink.addEventListener("click", clickFahrent);

// function C to F, calculate for the real degrees
