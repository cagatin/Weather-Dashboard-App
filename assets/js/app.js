let key = 'cc8fe01df44bc4c62528873d53642314';
let cityInput = document.querySelector('#cityInput');
let searchBtn = document.querySelector('#searchBtn');
let todayCardContainer = document.querySelector('#today-card-container');

function createTodayCard(data) {
    let cityName = data.name;
    let weather = data[0].main;
    let weatherDesc = data[0].description;
    let temperature = data.main.feels_like.toFixed(1);
    let humidity = data.main.humidity;
    let wind = data.wind.speed;
}

function getCityData(lat, long) {
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}`;
}

//Function to retrieve geolocation of input city.
function getGeolocation(e) {
    e.preventDefault();
    let selectedCity = cityInput.value;

    let url = `http://api.openweathermap.org/geo/1.0/direct?q=${selectedCity}&limit=1&appid=${key}`;

    console.log(url);

    fetch(url)
        .then(res => res.json())
        .then(data => {
            getCityData(data[0].lat, data[0].lon);
        })
        .catch(err => console.log(err));
}

searchBtn.addEventListener('click', getGeolocation);