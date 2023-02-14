//import weather from '../data/current-weather.js'
import { formatDate } from './utils/format-data.js'
import { weatherConditionsCodes } from './constans.js'
import { getLanLon } from './geolocation.js'
import { getCurrentWeather } from './services/weather.js'

function setCurrentWeatherCity($el, city){

    $el.textContent = city

}


function setCurrentWeatherDate($el){
    const date = new Date()
    const formattedDate = formatDate(date)
    $el.textContent = formattedDate
}


function setCurrentTemp($el, temp) {
    $el.textContent = Math.floor(temp) + '°'
}

function solarStatus(sunsetTime, sunriseTime) {
    const currentHours = new Date().getHours()
    const sunsetHours = sunsetTime.getHours()
    const sunriseHours = sunriseTime.getHours()

    if( currentHours > sunsetHours || currentHours < sunriseHours) {
        return 'morning'

    }
        return 'night'
}


function setBackground($el, conditionCode, solarStatus) {
    const weatherType = weatherConditionsCodes[conditionCode]
    const size = window.matchMedia('(-webkit-min-device-pixel-ratio:2)').matches ? '@2x' : ''
    $el.style.backgroundImage = `url(./images/${solarStatus}-${weatherType}${size}.jpg)`
}

 //LOADER



 function showCurrentWeather($app, $loader){
    $app.hidden = false
    $loader.hidden = true
}

function configCurrentWeather(weather){
    const $app = document.querySelector('#app')
    const $loading   = document.querySelector('#loading')
    
   
    //LOADER
    showCurrentWeather($app, $loading)

    //DATE

    const $currentWeatherDate = document.querySelector('#current-weather-date')
    setCurrentWeatherDate($currentWeatherDate)
    
    //city
    const $currentWeatherCity = document.querySelector('#current-weather-city')
    const city = weather.name
    setCurrentWeatherCity($currentWeatherCity, city)

    //TEMP

    const $currentWeatherTemp = document.querySelector('#current-weather-temp')
    const temp = weather.main.temp

    const wind = weather.wind.speed
    const humidity = weather.main.humidity
    const tempMax = weather.main.temp_max
    const tempMin = weather.main.temp_min
    setCurrentTemp($currentWeatherTemp, temp, tempMax, tempMin, humidity, wind)

    
    //BACKGROUND
    const sunriseTime = new Date(weather.sys.sunrise * 1000)
    const sunsetTime = new Date(weather.sys.sunset * 1000)
    //const $app = document.querySelector('#app')
    const conditionCode = String(weather.weather[0].id).charAt(0)

    setBackground($app, conditionCode, solarStatus(sunriseTime, sunsetTime))

}

export default async function currentWeather(){

    //GEO // API - WEATHER // CONFIG
    //console.log('esto pasa ANTES de getcurrentPosition')
   
    const { lat, lon, isError } = await getLanLon()
    if(isError) return console.log('Ah ocurrido un error ubicandote') 
    //console.log(lat, lon)
    // const latlon = getCurrentPosition()     
   /* getCurrentPosition() 
    .then((data) => {
        console.log('hemos triunfado', data)
    })
    .catch((message) => {
        console.log(message)
    })
    console.log('esto pasa DESPUES de getcurrentPosition')*/
    const {isError: currentWeatherError, data: weather} = await getCurrentWeather(lat, lon)
    if(currentWeatherError) return console.log('ha ocurrido un error trayendo los datos del clima')
    configCurrentWeather(weather)
    //console.log(weather)

}