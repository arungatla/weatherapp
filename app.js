// Tutorial by http://youtube.com/CodeExplained
// api key : eba530a9e862adee48f85ffa42fc1ae5

//19fe6cb396mshd2374085442c5efp195405jsn9cd305192788


//select elements

const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");


//App data
const weather = {};

weather.temperature = {
    unit: "celsius"
}

//App consts and vars
const KELVIN = 273;
//API key

const key = "eba530a9e862adee48f85ffa42fc1ae5";

//check if browser supports geo location

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);

} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p> Browser doesn't Support Geolocation";

}

//set users position

function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

//show error if any issue is goingon

function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p>${error.message}</p>`
}

//get weather function

function getWeather(latitude, longitude) {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;


    fetch(api).then(function (response) {
            let data = response.json()
            return data;
        })
        .then(function (data) {
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function () {
            displayWeather();
        });
}

function displayWeather() {
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png" />`;
    tempElement.innerHTML = `${weather.temperature.value}* <span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

//c to f conversion

function celsiusToFahrenheit(temperature) {
    return (temperature * 9 / 5) + 32;
}

//when clicks the temp element in the data

tempElement.addEventListener("click", function () {
    if (weather.temperature.value === undefined) return;

    if (weather.temperature.unit == "celsius") {
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);

        fahrenheit = Math.floor(fahrenheit);

        tempElement.innerHTML = `${fahrenheit}*<span>F</span>`
        weather.temperature.unit = "fahrenheit";
    } else {
        tempElement.innerHTML = `${weather.temperature.value}*<span>C</span>`
        weather.temperature.unit = "celsius";
    }
})