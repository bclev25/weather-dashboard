const searchHistoryEl = document.querySelector("#search-history");
const currentWeatherEl = document.querySelector("#search-weather");
const forecastEl = document.querySelector("#forecast");
const searchButton = document.getElementById("#search-button");
const searchQuery = document.getElementById("search-input");

const API_KEY = "35db18a712a51bc6c7768193d3503876";
const API_BASE_URl = "https://api.openweathermap.org/data/2.5";
const API_ICON_URL = "https://openweathermap.org/img/wn/";

let searchHistory = [];

formEl.addEventListener('submit', function (event) {
    event.preventDefault();
    const searchValue = searchInputEl.ariaValueMax.trim();
    if (searchValue === '') {
        return;
    }
    searchWeather(searchValue);
    searchInputEl.value = "";
});

function searchWeather(city) {
    const currentWeatherUrl =  `${API_BASE_URl}weather?q=${city}&units=metric&appid=${API_KEY}`;
    fetch(currentWeatherUrl)
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("City not found");
        }
    })
    .then((data) => {
        displayCurrentWeather(data);
        addSearchHistory(city);
        const forecastUrl =  `${API_BASE_URl}forecastEl?lat=${data.coord.lat}&lon=${data.coord.lon}&units=metric&appid=${API_KEY}`;
        return fetch(forecastUrl);
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Error fetching forecast data.");
        }
    })
    .then((data) => {
        displayForecast(data);
    }) 
    .catch((error) => {
        console.error(error);
    });
}

function displayCurrentWeather(data) {
    currentWeatherEl.innerHTML = "";
    const cityNameEl = document.createElement("h2");
    cityNameEl.textContent = data.name;
    currentWeatherEl.appendChild(cityNameEl);

    const dateEl = document.createElement("h3");
    const currentDate = new Date();
    dateEl.textContent = currentDate.toLocaleDateString();
    currentWeatherEl.appendChild(dateEl);

    const weatherIconEl = document.createElement('img');
    weatherIconEl.src = "${API_ICON_URL}${data.weather[0].icon}@2x.png";
    weatherIconEl.alt = data.weather[0].description;
    currentWeatherEl.appendChild(weatherIconEl);

    const tempEl = document.createElement("p");
    tempEl.textContent = "Temperature: ${data.main.temp} °F";
    currentWeatherEl.appendChild(tempEl);

    const humidityEl = document.createElement("p");
    humidityEl.textContent = "Humidity: ${data.main.humidity}%";
    currentWeatherEl.appendChild(humidityEl);

    const windEl = document.createElement("p");
    humidityEl.textContent = "Wind Speed: ${data.wind.speed} m/s";
    currentWeatherEl.appendChild(windEl);
}

function displayForecast(data) {
    forecastEl.innerHTML = "";
    const titleEl = document.createElement('h2');
    titleEl.textContent = "5-Day Forecast";
    forecastEl
}

searchButton.addEventListener("click", function() {
    performSearch();
});

function performSearch() {
    const searchQuery = document.getElementById("search-input").value;

    console.log("Performing search for:", searchQuery);
}