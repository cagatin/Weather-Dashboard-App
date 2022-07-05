let key = 'cc8fe01df44bc4c62528873d53642314';
let cityInput = document.querySelector('#cityInput');
let searchBtn = document.querySelector('#searchBtn');
let todayCardContainer = document.querySelector('#today-card-container');
let currWeather;

function createTodayCard(name, data) {
    let cityName = name;
    let weather = data.current.weather[0].main;
    currWeather = weather;
    let weatherDesc = data.current.weather[0].description;
    let temperature = data.current.feels_like.toFixed(1);
    let humidity = data.current.humidity;
    let wind = data.current.wind_speed;

    //Weather icon
    let iconCode = data.current.weather[0].icon;
    let iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";

    //create the today card
    let todayCardDiv = document.createElement('div');
    todayCardDiv.classList.add('card');
    todayCardDiv.setAttribute('id', 'today-card');

    //create the header for the today card
    let todayHeaderDiv = document.createElement('div');
    todayHeaderDiv.classList.add('card-header');

    //create the title for the header
    let todayTitle = document.createElement('h2');
    todayTitle.classList.add('card-title');
    todayTitle.textContent = cityName;

    //Create the icon image
    let todayIcon = document.createElement('img');
    todayIcon.setAttribute('id', 'today-icon');
    todayIcon.setAttribute('src', iconUrl);

    //append the title and image to the header
    todayHeaderDiv.appendChild(todayTitle);
    todayHeaderDiv.appendChild(todayIcon);

    //append the header to the main card div
    todayCardDiv.appendChild(todayHeaderDiv);

    //Append the today card to the container div
    todayCardContainer.appendChild(todayCardDiv);
}

function getCityData(name, lat, long) {
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=imperial&exclude=minutely,hourly,daily&appid=${key}`;

    fetch(url)
        .then(res => res.json())
        .then(data => createTodayCard(name, data))
        .catch(err => console.log(err));
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
            getCityData(data[0].name, data[0].lat, data[0].lon);
        })
        .catch(err => console.log(err));
}

searchBtn.addEventListener('click', getGeolocation);