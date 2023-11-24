const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const apiKey = '588f9a07616dc0b9058142ad6d5930d3';
const searchBox$$ = document.querySelector('.search input');
const searchBtn$$ = document.querySelector('.search button');
const weatherIcon$$ = document.querySelector('.weather-icon');

async function checkWeather(city){
    const response = await fetch(baseUrl + city + `&appid=${apiKey}`);
    let data = await response.json();
    

    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temperature').innerHTML = Math.round(data.main.temp)  + '°C';
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';

    if(data.weather[0].main == 'Clouds'){
        weatherIcon$$.src = 'assets/clouds.png';
    }
    else if(data.weather[0].main == 'Clear'){
        weatherIcon$$.src = 'assets/clear.png';
    }
    else if(data.weather[0].main == 'Rain'){
        weatherIcon$$.src = 'assets/rain.png';
    }
    else if(data.weather[0].main == 'Drizzle'){
        weatherIcon$$.src = 'assets/drizzle.png';
    }
    else if(data.weather[0].main == 'Mist'){
        weatherIcon$$.src = 'assets/mist.png';
    }

    document.querySelector('.weather').style.display = 'block'
}

searchBtn$$.addEventListener('click',()=>{
    checkWeather(searchBox$$.value);
})

checkWeather();