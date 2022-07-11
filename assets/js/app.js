let key = 'cc8fe01df44bc4c62528873d53642314';

//city input
let cityInput = document.querySelector('#cityInput');

//search butotn
let searchBtn = document.querySelector('#searchBtn');

//Containers
let todayCardContainer = document.querySelector('#today-card-container');
let carouselInner = document.querySelector('#carousel-inner-container');
let currWeather;

//function to add classes to list elements in today card container
function addTodayListClasses(element) {
    element.classList.add('list-group-item', 'card-list-item')
}

//fuction to capitalize the first letter of a string
function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}

//function to generate the today card
function createTodayCard(name, data) {
    console.log(data);
    let cityName = name;
    let weather = data.current.weather[0].main;
    currWeather = weather;
    let weatherDesc = capitalize(data.current.weather[0].description);
    let temperature = data.current.feels_like.toFixed(1);
    let humidity = data.current.humidity;
    let wind = data.current.wind_speed;
    let uv = data.current.uvi;

    //Weather icon
    let iconCode = data.current.weather[0].icon;
    let iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";

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

    // Create a list which displays weather informationa bout today
    let todayUL = document.createElement('ul');
    todayUL.classList.add('list-group', 'list-group-flush', 'card-list');

    //create description list item
    let descItem = document.createElement('p');
    addTodayListClasses(descItem);
    descItem.setAttribute('id', 'descLI');
    descItem.textContent = `Weather Type: ${weatherDesc}`;
    todayUL.appendChild(descItem);


    //create temperature list item
    let tempItem = document.createElement('li');
    addTodayListClasses(tempItem);
    tempItem.setAttribute('id', 'tempLI');
    tempItem.textContent = `Temperature: ${temperature}°`;
    todayUL.appendChild(tempItem);

    //create Humidity list item
    let humidItem = document.createElement('li');
    addTodayListClasses(humidItem);
    humidItem.setAttribute('id', 'humidLI');
    humidItem.textContent = `Humidity: ${humidity}%`;
    todayUL.appendChild(humidItem);

    //create Wind list item
    let windItem = document.createElement('li');
    addTodayListClasses(windItem);
    windItem.setAttribute('id', 'windLI');
    windItem.textContent = `Wind Speed: ${wind} mph`;
    todayUL.appendChild(windItem);

    //create Wind list item
    let uvItem = document.createElement('li');
    addTodayListClasses(uvItem);
    uvItem.setAttribute('id', 'uvLI');
    uvItem.textContent = `UV Index: ${uv}`;
    todayUL.appendChild(uvItem);

    //add the todayUL to the todayCard
    todayCardDiv.appendChild(todayUL);

    //Append the today card to the container div
    todayCardContainer.appendChild(todayCardDiv);
}

// Function to get city data
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

    let url = `https://api.openweathermap.org/geo/1.0/direct?q=${selectedCity}&limit=1&appid=${key}`;

    console.log(url);

    fetch(url)
        .then(res => res.json())
        .then(data => {
            getCityData(data[0].name, data[0].lat, data[0].lon);
        })
        .catch(err => console.log(err));
}

searchBtn.addEventListener('click', getGeolocation);