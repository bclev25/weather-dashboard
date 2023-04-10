const searchButton = document.querySelector('#search-button');
const searchInput = document.querySelector('#search-input');
const forecastContainer = document.querySelector('#forecast-container');

searchButton.addEventListener('click', () => {
  const city = searchInput.value;
  const apiKey = '58e5be5761a6d352c05c8c44e1f7f573'; // replace with your actual API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const forecasts = data.list.filter(forecast => forecast.dt_txt.includes('12:00:00'));
      let forecastHtml = '';
      forecasts.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'long' });
        const temperature = `${Math.round(forecast.main.temp)}°C`;
        const description = `${forecast.weather[0].description}`;
        forecastHtml += `
          <div class="forecast-card">
            <div class="forecast-day">${day}</div>
            <div class="forecast-temperature">${temperature}</div>
            <div class="forecast-description">${description}</div>
          </div>
        `;
      });
      forecastContainer.innerHTML = forecastHtml;
    })
    .catch(error => console.error(error));
});
