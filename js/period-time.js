import { createDOM } from './utils/dom.js'
import { formatDate } from './utils/format-data.js'

export function periodTimeTemplate({temp, date, icon, description}){
    
    return`
    <li class="dayWeather-item is-selected">
          <span class="dayWeather-time">${date}</span>
          <img class="dayWeather-icon" height="48" width="48" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" rain="">
          <span class="dayWeather-temp">${temp}° </span>
    </li>
     `
}

export function dataAditionalTemplate({tempMax, tempMin, wind, humidity}){
    return`
    <div>
    <table style="width: 100%;margin: 20px 0 20px 0;">
        <tr>
            <td class="temp-max">
                Máx = ${tempMax}°
            </td>
            <td class="temp-min">
                Mín = ${tempMin}° 
            </td>
        </tr>
        <tr>
            <td class="viento">
                Viento = ${humidity} Km/h
            </td>
            <td class="humdedad">
                Humedad = ${wind}%
            </td>
        </tr>
    </table>
  </div>
     `
}


export function createPeriodTime(weather){
    //temp
    //icon
    //date
    //description
    const dateOptions = {
        hour: 'numeric',
        hour12: true,
    }

    const date = formatDate(new Date(weather.dt * 1000), dateOptions)
    const config = {
        temp: weather.main.temp,
        tempMax: weather.main.temp_max,
        tempMin: weather.main.temp_min,
        wind: weather.wind.speed,
        humidity: weather.main.humidity,
        date,
        icon: weather.weather[0].icon,
        description: weather.weather[0].description
        
    }
    

    return createDOM(periodTimeTemplate(config))
    
}