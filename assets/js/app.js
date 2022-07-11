let key = 'cc8fe01df44bc4c62528873d53642314';

//city input
let cityInput = document.querySelector('#cityInput');

//search butotn
let searchBtn = document.querySelector('#searchBtn');

//Containers
let todayCardWrapper = document.querySelector('#today-card-wrapper');
let todayCardContainer = document.querySelector('#today-card-container');
let carouselWrapper = document.querySelector('#five-day-forcast-carousel');
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

//function to remove all child elements from some parent element
function removeChildren(parentEl) {
    if (parentEl.firstChild) {
        while (parentEl.firstChild) {
            parentEl.removeChild(parentEl.firstChild);
        }
    } else {
        return;
    }
}

//function to generate the today card
function createTodayCard(name, data) {
    //if there is already a today card displayed --> remove it 
    removeChildren(todayCardContainer);

    //if there is a 'hidden' class, remove it
    if (todayCardWrapper.classList.contains('hidden')) {
        todayCardWrapper.classList.remove('hidden');
    }


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
    descItem.textContent = `${weatherDesc}`;
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

//function to convert unix to DD/MM/YY
function getDate(str) {
    let dateStr = str.split(" ")[0];
    let res = dateStr.slice(5, 10);     //remove the year
    console.log(res);
    return res;
}

//Function to create a carousel card for the 5 day forecast
function createCarouselCard(data, i) {
    let date = getDate(data.dt_txt);
    let temperature = data.main.temp;
    let windspeed = data.wind.speed;
    let humidity = data.main.humidity;
    let description = data.weather[0].main;

    //Weather icon
    let iconCode = data.weather[0].icon;
    let iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";


    //create the container div
    let carouselCardDiv = document.createElement('div');
    if (i == 0) {
        carouselCardDiv.classList.add('active');
    }
    carouselCardDiv.classList.add('carousel-item');

    //create the wrapper div
    let wrapperDiv = document.createElement('div');
    wrapperDiv.classList.add('cards-wrapper')

    //create the card itself
    let cardDiv = document.createElement('div');
    cardDiv.classList.add('card', 'five-day-card');

    //create the header
    let cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');

    //add an h2 for the date
    let cardH2 = document.createElement('h2');
    cardH2.classList.add('card-title');
    cardH2.textContent = date;

    //Create the icon image
    let iconImg = document.createElement('img');
    iconImg.setAttribute('src', iconUrl);

    //append the h2 and image to the header div
    cardHeader.appendChild(cardH2);
    cardHeader.appendChild(iconImg);

    //append the header div to the card div
    cardDiv.appendChild(cardHeader);

    //Create a ul to display useful information
    let ul = document.createElement('ul');
    ul.classList.add("list-group", "list-group-flush", "card-list", "five-day-forcast-list");

    //Creating a list item for description
    let descLI = document.createElement('li');
    descLI.classList.add("list-group-item", "card-list-item");
    descLI.textContent = `${description}`;
    ul.appendChild(descLI);

    //Creating a list item for temperature
    let tempLI = document.createElement('li');
    tempLI.classList.add("list-group-item", "card-list-item");
    tempLI.textContent = `Temperature: ${temperature}°`;
    ul.appendChild(tempLI);

    //Creating a list item for humidity
    let humidLI = document.createElement('li');
    humidLI.classList.add("list-group-item", "card-list-item");
    humidLI.textContent = `Humidity: ${humidity}%`;
    ul.appendChild(humidLI);

    //Creating a list item for wind speed
    let windLI = document.createElement('li');
    windLI.classList.add("list-group-item", "card-list-item");
    windLI.textContent = `Wind Speed: ${windspeed} mph`;
    ul.appendChild(windLI);

    //add the ul to the card div
    cardDiv.appendChild(ul);

    //append the card div to the wrapper
    wrapperDiv.appendChild(cardDiv);

    // append the wrapper div to the carousel card div
    carouselCardDiv.appendChild(wrapperDiv);

    //
    carouselInner.appendChild(carouselCardDiv);
}

//function to filter out today's date from the 5 day forecast array
function filter5DayList(data) {
    let hour = data.dt_txt.split(" ")[1];
    return hour === "00:00:00";
}

//Function to create cards for the 5 day forcast in carouselInner
function create5DayCard(data) {
    //Array contianing only 5 Dates
    let filteredArr = data.list.filter(filter5DayList);

    for (let i = 0; i < filteredArr.length; i++) {
        createCarouselCard(filteredArr[i], i);
    }
}

//funciton to generate 5 day forcast data
function getFiveDayData(lat, lon) {
    //if there is already a today card displayed --> remove it 
    removeChildren(carouselInner);

    //if there is a 'hidden' class, remove it
    if (carouselWrapper.classList.contains('hidden')) {
        carouselWrapper.classList.remove('hidden');
    }

    let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${key}`;

    fetch(url)
        .then(res => res.json())
        .then(data => create5DayCard(data))
        .catch(err => console.log(err))
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

    fetch(url)
        .then(res => res.json())
        .then(data => {
            getCityData(data[0].name, data[0].lat, data[0].lon);
            getFiveDayData(data[0].lat, data[0].lon);
        })
        .catch(err => console.log(err));
}

searchBtn.addEventListener('click', getGeolocation);
searchBtn.addEventListener('click', getFiveDayData);