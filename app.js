//api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
//${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}

let city = document.getElementById('city');
let minMaxTemp = document.getElementById('min-max'); 
let temperature = document.getElementById('temp');
let weatherType = document.getElementById('weather');
let weatherDescription =document.getElementById('description');
let date = document.getElementById('date');
let timer = document.getElementById('timer');
let todayDate = new Date();

var currentTime;

// Onload position
window.addEventListener('load', ()=>{
    let long;
    let lat;

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            //console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=7811d37cd938d23fd56e03506924b779&units=metric`;

            fetch(api)
            .then(Response => {
                return Response.json();
            })
            .then(data => {
                //console.log(data);
                const {temp,temp_max,temp_min,icon}= data.main;

                // Set DOM Elements from Api.
                temperature.innerHTML = `${Math.round(temp)}&deg;c`;
                minMaxTemp.innerHTML = `${Math.floor(temp_min)}&deg;c (min) / ${Math.ceil(temp_max)}&deg;c(max)`;
                weatherType.innerText = `${data.weather[0].main}`;
                city.innerText = `${data.name}, ${data.sys.country}`;
                weatherDescription.innerText = `${data.weather[0].description}`
                date.innerHTML = dateManage(todayDate);

                if(weatherType.textContent == 'Rain') {
                    document.body.style.backgroundImage = "url('Images/Rain 2.jpg')";
                } else if(weatherType.textContent == 'Clouds') {
                    document.body.style.backgroundImage = "url('Images/clouds.jpg')";
                }else if(weatherType.textContent == 'Haze') {
                    document.body.style.backgroundImage = "url('Images/clouds 2.jpg')";
                }else if(weatherType.textContent == 'Clear') {
                    document.body.style.backgroundImage = "url('Images/clear 2.jpg')";
                }else if(weatherType.textContent == 'Thunderstorm') {
                    document.body.style.backgroundImage = "url('Images/storm 2.jpg')";
                }else if(weatherType.textContent == 'Snow') {
                    document.body.style.backgroundImage = "url('Images/snows 2.jpg')";
                }else if(weatherType.textContent == 'Sunny') {
                    document.body.style.backgroundImage = "url('Images/sunny.jpg')";
                } 

                //set Icon
                //setIcons(icon, document.querySelector(".icon"));

            });
        });

    }else{
        h1.textContent = "Enable location to enjoy this App"
    };
});
const weatherApi = {
    key: "7811d37cd938d23fd56e03506924b779",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather?"
};

const searchInputBox = document.getElementById('input-box');

// Event Listener Function on keypress
searchInputBox.addEventListener('keypress', (event) =>{
    if(event.keyCode ==13) {
        //console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
        searchInputBox.value = '';

    }

});

//Get Weather Report
function getWeatherReport(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=7811d37cd938d23fd56e03506924b779&units=metric`)
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport);
}

// Show weather Report
function showWeatherReport(weather){
    //console.log(weather);

    city.innerText = `${weather.name}, ${weather.sys.country}`;

    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;c`;

    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;c (min) / ${Math.ceil(weather.main.temp_max)}&deg;c(max)`;

    weatherType.innerText = `${weather.weather[0].main}`;

    weatherDescription.innerHTML = `${weather.weather[0].description}`

    date.innerText = dateManage(todayDate);

    if(weatherType.textContent == 'Rain') {
        document.body.style.backgroundImage = "url('Images/Rain 2.jpg')";
    }else if(weatherType.textContent == 'Clouds') {
        document.body.style.backgroundImage = "url('Images/clouds.jpg')";
    }else if(weatherType.textContent == 'Haze') {
        document.body.style.backgroundImage = "url('Images/clouds 2.jpg')";
    }else if(weatherType.textContent == 'Clear') {
        document.body.style.backgroundImage = "url('Images/clear 2.jpg')";
    }else if(weatherType.textContent == 'Thunderstorm') {
        document.body.style.backgroundImage = "url('Images/storm 2.jpg')";
    }else if(weatherType.textContent == 'Snow') {
        document.body.style.backgroundImage = "url('Images/snows 2.jpg')";
    }else if(weatherType.textContent == 'Sunny') {
        document.body.style.backgroundImage = "url('Images/sunny.jpg')";
    }
}

//Date manage
function dateManage(dateArg) {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", 
     "Friday", "Saturday"];

     let months = ["January", "February", "march", "April", "May", "June", "July", 
    "September", "October", "November", "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}) ${year}`;
}

function showTime(){
    var now = new Date();
    currentTime = now.toLocaleTimeString();
    timer.textContent ="Your Local time: " + currentTime;
setTimeout(showTime,1000);
}
showTime();

/*function setIcons(icon, iconID) {
     const skyCons = new skyCons({color: "black"});
     const currentIcon = icon.replace(/-/g, "_").toUpperCase();
     skyCons.play();
     return skyCons.set(iconID, skyCons[currentIcon]);
 }*/

 if('serviceWorker' in navigator) {
    window.addEventListener('load', () =>{
        navigator.serviceWorker
        .register('/sw_cached.js')
        .then(reg => console.log('service Worker: registered'))
        .catch( err => console.log(`service worker: Error: ${err}`))
    });
};