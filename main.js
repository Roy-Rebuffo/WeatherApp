const baseUrl ="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiKey = "588f9a07616dc0b9058142ad6d5930d3";
const searchBox$$ = document.querySelector(".search input");
const searchBtn$$ = document.querySelector(".search button");
const weatherIcon$$ = document.querySelector(".weather-icon");
const card$$ = document.querySelector('.card');




async function checkWeather(city) {
  const response = await fetch(baseUrl + city + `&appid=${apiKey}`);
  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    let data = await response.json();
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    // Limpiar clases existentes
    card$$.classList.remove("clouds", "clear", "rain", "drizzle", "mist");

    if (data.weather[0].main == "Clouds") {
      weatherIcon$$.src = "assets/clouds.png";
      card$$.classList.add("clouds");
    } else if (data.weather[0].main == "Clear") {
      weatherIcon$$.src = "assets/clear.png";
      card$$.classList.add("clear");
    } else if (data.weather[0].main == "Rain") {
      weatherIcon$$.src = "assets/rain.png";
      card$$.classList.add("rain");
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon$$.src = "assets/drizzle.png";
      card$$.classList.add("drizzle");
    } else if (data.weather[0].main == "Mist") {
      weatherIcon$$.src = "assets/mist.png";
      card$$.classList.add("mist");
    }
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}


searchBtn$$.addEventListener("click", () => {
  checkWeather(searchBox$$.value);
});
searchBox$$.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      checkWeather(searchBox$$.value);
    }
  });

checkWeather();
