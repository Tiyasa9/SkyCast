const apiKey = "4c88410125f733a80d6c276a51f07d85";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?q=kolkata&appid=4c88410125f733a80d6c276a51f07d85&units=metric";

const cityName = document.querySelector(".enterCity");
const search = document.querySelector(".search-btn");
const nowTemp = document.querySelector(".currTemp");
const nowCity = document.querySelector(".currCity");
const wind = document.querySelector(".currSpeed");
const humid = document.querySelector(".currHumid");
const nowIcon = document.querySelector(".weather-icon");

let city;

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
        if(data.weather[0].main == "Fog"){
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
        }
    }

}
search.addEventListener("click" , () => {
    console.log("Clicked");
    city = cityName.value;
    weatherData(city);
})


