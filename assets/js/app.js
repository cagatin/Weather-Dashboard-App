let key = 'cc8fe01df44bc4c62528873d53642314';
let cityInput = document.querySelector('#cityInput');
let searchBtn = document.querySelector('#searchBtn');

function requestCity(e) {
    e.preventDefault();
    let selectedCity = cityInput.value;

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${key}`;

    console.log(url);

    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
}

searchBtn.addEventListener('click', requestCity);