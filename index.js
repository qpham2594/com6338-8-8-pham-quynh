// Your code here
// all variables needed, moved most variables out as global variables

var weatherSearch = document.getElementById('weather')
var lineBreak = document.createElement('br')
var cityAndCountry = document.createElement('h2')
var coordinateLink = document.createElement('a');
var weatherImg = document.createElement('img')
var condition = document.createElement('p')
var current = document.createElement('p')
var feelsLike = document.createElement('p')
var updatedTime = document.createElement('p')

// preventDefault and fetch the API
// attempted error code = 404 in the locationData at first but was not passing the test even though it does work on the App
// then removed the error code method to .catch instead
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

// function to display data on DOM
function locationData(weather) {
        console.log(weather)
        weatherSearch.innerHTML = ''
        weatherForm.search.value = ''
        // reset after each submission
        // without the ? after sys, there was a TypeError message in console?

        cityAndCountry.innerHTML = weather.name + ", " + weather.sys?.country ;
        console.log(cityAndCountry)
        weatherSearch.appendChild(cityAndCountry)

       //attempted to create one variable with both lat and lon and combined everything in <a href > with "target_BLANK" inside but did not pass test
       //then split everything up and set attribute separately
        var latitude = weather.coord?.lat;
        var longitude = weather.coord?.lon;
        coordinateLink.innerHTML = "Click to view map";
        coordinateLink.href = 'https://www.google.com/maps/search/?api=1&query=' + latitude + ',' + longitude;
        coordinateLink.setAttribute('target', '_blank');
        weatherSearch.appendChild(coordinateLink)
        
      // initially used icons URLs, set an array, then use if statement to detect key words in weather.main[0]
      // the above way worked, but did not pass the last test - possibly due to all the URL links
      // split everything up and combined with weatherImg.src instead 
        var weatherImgCode = weather.weather[0].icon
        var weatherImgLink = 'https://openweathermap.org/img/wn/'
        weatherImg.src = weatherImgLink + weatherImgCode + '@2x.png'
        weatherSearch.appendChild(lineBreak)
        weatherSearch.appendChild(weatherImg)

    // split the word into array to capitalize the first letter and lowercase letters for the rest, then rejoin 
        condition.innerHTML = weather.weather[0].description
        .split(' ') // Split the description into an array of words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter and lowercase the rest
        .join(' '); // Join the words back into a single string with spaces
        weatherSearch.appendChild(condition)

        weatherSearch.appendChild(lineBreak)

        
        current.innerHTML = "Current: " + weather.main?.temp + " °F";
        weatherSearch.appendChild(current)

       
        feelsLike.innerHTML = "Feels Like: " + weather.main?.feels_like + " °F";
        weatherSearch.appendChild(feelsLike)

        weatherSearch.appendChild(lineBreak)

        // Using the instruction and example from the page
        var milliseconds = weather.dt * 1000;
        var date = new Date(milliseconds); // Create a new Date object with the current time
        var timeString = date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit'
        });

        updatedTime.innerHTML = "Last Updated: " + timeString;
        weatherSearch.appendChild(updatedTime)
}

