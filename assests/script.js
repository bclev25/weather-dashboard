const apiKey = "46bdaf7c649f67e2ce603555190f7fd9";
const apiUrl = "";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherInfoContainer = document.querySelector(".weather-info");
const forecastContainer = document.querySelector(".forecast");
const searchHistoryContainer = document.querySelector(".search-history");

let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

async function getWeatherData(cityName) {
    try{
        const response = await fetch ("${apiUrl}?q=${cityName}&appid=${apiKey}");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching weather data", error);
        return null;
    }
}

function displayForecast(weatherData) {

}

function handleSearch() {
    const cityName = cityInput.ariaValueMax.trim();

    if (cityName === '') {
        alert("Please enter a city name!");
        return;
    }

    getWeatherData(cityName)
    .then((weatherData) => {
        if (weatherData) {
            displayCurrentWeather(weatherData);
            displayForecast(weatherData);

            searchHistory.push(cityName);
            localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
            updateSearchHistory();
        } else {
            alert("City not found. Please try a different city");
        }
    });
}

function updateSearchHistory() {
    searchHistoryContainer.innerHTML = '';
    const list = document.createElement("ul");

    searchHistory.forEach((city) => {
        const listItem = document.createElement("li");
        listItem.textContent = city;
        listItem.addEventListener("click", () => {
            cityInput.value = city;
            handleSearch();
        });

        list.appendChild(listItem);
    });

    searchHistoryContainer.appendChild(list);
}

searchBtn.addEventListener("click", handleSearch);

updateSearchHistory();