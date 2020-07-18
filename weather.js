const weather = document.querySelector(".js-weather"),
    weatherRefresh = document.querySelector(".js-weatherRefresh");

const API_KEY = "8b0aefe72f5e097339c9f473fc9acbdc";
const COORDS = "coord";

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`).then(function(response) {
        return response.json();
    }).then(function(json) {
        const _weather = json.weather[0].main;
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${_weather} ${temperature}°c @ ${place}`;
        weather.classList.add(SHOWING_CN);
    });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude)
}

function handleGeoError() {
    console.log("Can't acces geo location");
}

function askfForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function refreshWeather() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords !== null) {
        localStorage.removeItem(COORDS);
        askfForCoords();
    }
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askfForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function showRefresh(event) {
    event.preventDefault();
    weather.classList.remove(SHOWING_CN);
    weatherRefresh.classList.add(SHOWING_CN);
}

function showWeather(event) {
    event.preventDefault();
    weatherRefresh.classList.remove(SHOWING_CN);
    weather.classList.add(SHOWING_CN);
};

function refreshWeatherListener(event) {
    event.preventDefault();
    refreshWeather();
}

function addWeatherEventListener() {
    weather.addEventListener("mouseover",showRefresh);
    weatherRefresh.addEventListener("mouseout", showWeather);e=
    weatherRefresh.addEventListener("click", refreshWeatherListener);
}

function init() {
    loadCoords();
    addWeatherEventListener();
    setInterval(loadCoords, 600*1000)
}

init();