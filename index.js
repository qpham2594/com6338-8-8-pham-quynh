// Your code here

var weatherSearch = document.getElementById('weather')
var lineBreak = document.createElement('br')


var weatherForm = document.querySelector('form');
weatherForm.onsubmit = function(e) {
    e.preventDefault()
    var searchTerm = this.search.value.trim();
    if (!searchTerm || /^\s*$/.test(searchTerm)) {
        return;
    }

    var weatherURL = 'https://api.openweathermap.org/data/2.5/weather'; 
    var apiKey = '?units=imperial&appid=aa3f1ef4a1b7d2080dc5d3357ddcaaa0&q=';
    var fetchURL = weatherURL + apiKey + searchTerm;

    fetch(fetchURL)
        .then(response => response.json())
        .then(locationData)
        .catch(function(error) {
            var locationNotFound = document.createElement('h2');
            weatherSearch.innerHTML = ''
            locationNotFound.innerHTML = "Location Not Found";
            weatherSearch.appendChild(locationNotFound);
        });
}


function locationData(weather) {
        console.log(weather)
        weatherForm.search.value = ''
        weatherSearch.innerHTML = ''

        var cityAndCountry = document.createElement('h2')
        cityAndCountry.innerHTML = weather.name + ", " + weather.sys?.country ;
        console.log(cityAndCountry)
        weatherSearch.appendChild(cityAndCountry)

        var coordinateLink = document.createElement('a');
        var latitude = weather.coord?.lat;
        var longitude = weather.coord?.lon;
        coordinateLink.textContent = "Click to view map";
        coordinateLink.href = 'https://www.google.com/maps/search/?api=1&query=' + latitude + ',' + longitude;
        coordinateLink.setAttribute('target', '_blank');
        weatherSearch.appendChild(coordinateLink)
      
        var weatherAppImg = document.createElement('img')
        var weatherImgUrls = {
            Thunderstorm: 'https://openweathermap.org/img/wn/11d@2x.png',
            Drizzle: 'https://openweathermap.org/img/wn/09d@2x.png',
            Rain: 'https://openweathermap.org/img/wn/09d@2x.png',
            Snow: 'https://openweathermap.org/img/wn/13d@2x.png',
            Clear: 'https://openweathermap.org/img/wn/01d@2x.png',
            Clouds: 'https://openweathermap.org/img/wn/02d@2x.png',
        }
        if (weather.weather[0].main in weatherImgUrls) {
            weatherAppImg.src = weatherImgUrls[weather.weather[0].main];
        }
        weatherAppImg.innerHTML = ''
        weatherSearch.appendChild(lineBreak)
        weatherSearch.appendChild(weatherAppImg)

        var condition = document.createElement('p')
        condition.innerHTML = weather.weather[0].description
        .split(' ') // Split the description into an array of words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter and lowercase the rest
        .join(' '); // Join the words back into a single string with spaces
        weatherSearch.appendChild(condition)

        weatherSearch.appendChild(lineBreak)

        var current = document.createElement('p')
        current.innerHTML = "Current: " + weather.main?.temp + " °F";
        weatherSearch.appendChild(current)

        var feelsLike = document.createElement('p')
        feelsLike.innerHTML = "Feels Like: " + weather.main?.feels_like + " °F";
        weatherSearch.appendChild(feelsLike)

        weatherSearch.appendChild(lineBreak)

        var updatedTime = document.createElement('p')
        var milliseconds = weather.dt * 1000;
        var date = new Date(milliseconds); // Create a new Date object with the current time
        var timeString = date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit'
        });

        updatedTime.innerHTML = "Last Updated: " + timeString;
        weatherSearch.appendChild(updatedTime)

}

