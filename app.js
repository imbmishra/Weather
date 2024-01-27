const apiKey = "d2052fed2b90825f059756c067133a58";
const apiURL = `https://api.openweathermap.org/data/2.5/weather?&appid=${apiKey}&units=metric&q=`;

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

window.addEventListener("load", () => {
  checkWeather('bangalore');
});

async function checkWeather(city) {
    const response = await fetch(apiURL + city);
    
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        let data = await response.json();
        // console.log(data);

        document.querySelector(".weather").style.display =
            "block";
        document.querySelector(".error").style.display = "none";
        
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";
        let img = document.querySelector(".weather-icon");

        if (data.weather[0].main.toLowerCase() === "clear") {
            img.src = "images/clear.png"
        } else if (data.weather[0].main.toLowerCase() === "clouds") {
            img.src = "images/clouds.png"
        } else if (data.weather[0].main.toLowerCase() === "drizzle") {
            img.src = "images/drizzle.png"
        } else if (data.weather[0].main.toLowerCase() === "mist") {
            img.src = "images/mist.png"
        } else if (data.weather[0].main.toLowerCase() === "rain") {
            img.src = "images/rain.png"
        } else if (data.weather[0].main.toLowerCase() === "snow") {
            img.src = "images/snow.png"
        }
    }
}

searchBtn.addEventListener("click", () => {
    let city;
    if (searchBox.value === "") {
        city = "bengaluru";
        // console.log("default city");
    } else {
        city = searchBox.value;
    }
    checkWeather(city);
});