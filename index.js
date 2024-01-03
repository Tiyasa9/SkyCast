const apiKey = "4c88410125f733a80d6c276a51f07d85";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?q=&appid=&units=metric";
const apiKey1 = "6123737111384d4c9f42b9f4ed9eda96";
const baseURL1 = "https://api.weatherbit.io/v2.0/forecast/daily?city=&key=";

const cityName = document.querySelector(".enterCity");
const search = document.querySelector(".search-btn");
const nowTemp = document.querySelector(".currTemp");
const nowCity = document.querySelector(".currCity");
const wind = document.querySelector(".currSpeed");
const humid = document.querySelector(".currHumid");
const nowIcon = document.querySelector(".weather-icon");
const days = document.querySelectorAll(".day");
const temps = document.querySelectorAll(".dayTemp");
const nextIcons = document.querySelectorAll(".nxtWeatherCards img");
const des = document.querySelectorAll(".description");
const bgImg = document.querySelector("body");
const btn = document.querySelector("button");

async function weatherData(city){
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(URL);
    var data = await response.json();
    console.log(data);

    nowTemp.innerText = data.main.temp + "°C";
    const name = `${data.name}, ${data.sys.country}`
    nowCity.innerText = name;
    wind.innerText = data.wind.speed + "km/hr";
    humid.innerText = data.main.humidity + "%";

    const changeIcon = () => {
        
        if(data.weather[0].main == "Fog" || data.weather[0].main == "Mist"){
            nowIcon.src = "./images/mist.png";
        }else if(data.weather[0].main == "Clear"){
            nowIcon.src = "./images/clear.png";
        }else if(data.weather[0].main == "Rain"){
            nowIcon.src = "./images/rain.png";
        }else if(data.weather[0].main == "Clouds"){
            nowIcon.src = "./images/clouds.png";
        }else if(data.weather[0].main == "Drizzle"){
            nowIcon.src = "./images/drizzle.png";
        }else if(data.weather[0].main == "Snow"){
            nowIcon.src = "./images/snow.png";
        }else if(data.weather[0].main == "Smoke"){
            nowIcon.src = "./images/smoke.png";
        }
    }

    changeIcon();
}


async function nextWeather(city){
    const URL1 = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${apiKey1}`;
    const response = await fetch(URL1);
    var data1 = await response.json();
    console.log(data1);
     
    for(let i = 0 ; i < 6 ; i++){
        days[i].innerText = data1.data[i].datetime;
        temps[i].innerText = data1.data[i].temp + "°C";
        des[i].innerText = data1.data[i].weather.description;

        if(data1.data[i].weather.description == "Fog" || data1.data[i].weather.description == "Mist"){
            nextIcons[i].src = "./images/mist.png";
        }else if(data1.data[i].weather.description == "Clear Sky"){
            nextIcons[i].src = "./images/clear.png";
        }else if(data1.data[i].weather.description == "Rain"){
            nextIcons[i].src = "./images/rain.png";
        }else if(data1.data[i].weather.description == "Few clouds" || data1.data[i].weather.description == "Scattered clouds"){
            nextIcons[i].src = "./images/clouds.png";
        }else if(data1.data[i].weather.description == "Drizzle"){
            nextIcons[i].src = "./images/drizzle.png";
        }else if(data1.data[i].weather.description == "Snow"){
            nextIcons[i].src = "./images/snow.png";
        }else if(data1.data[i].weather.description == "Broken clouds"){
            nextIcons[i].src = "./images/broken_cloud.png";
        }
    }
}

search.addEventListener("click" , () => {
    console.log("Clicked");
    city = cityName.value;
    weatherData(city);
    nextWeather(city);
})

let currentSeason = 1;

function updateBackground(currentSeason) {

    switch (currentSeason) {
        case 1:
            bgImg.style.backgroundImage = 'url("./images/winter.jpg")';
            btn.innerText = "❄️";
            break;
        case 2:
            bgImg.style.backgroundImage = 'url("./images/spring.jpg")';
            btn.innerText = "🌸";
            break;
        case 3:
            bgImg.style.backgroundImage = 'url("./images/summer.jpg")';
            btn.innerText = "☀️";
            break;
        case 4:
            bgImg.style.backgroundImage = 'url("./images/monsoon.jpg")';
            btn.innerText = "☔";
            break;
        case 5:
            bgImg.style.backgroundImage = 'url("./images/autumn.jpg")';
            btn.innerText = "🍂";
            break;
        default:
            break;
    }
}

btn.addEventListener("click" , () => {
    console.log("Mode btn is clicked")
        currentSeason = (currentSeason % 5) + 1;
        updateBackground(currentSeason);
    }
);

