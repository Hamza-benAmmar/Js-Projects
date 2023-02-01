import axios from "axios";
//https://api.open-meteo.com/v1/forecast?latitude=34.74&longitude=10.75&hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&timeformat=unixtime&timezone=auto
export function getWeather (lat,lon,timezone){
    return axios.get("https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&timeformat=unixtime",
        {
                params: {
                latitude:lat,
                longitude:lon,
                timezone,
            },
        }
    ).then(({data}) => {
        return {
            current : parseCurrentWeather(data),
            daily: parseDailyWeather(data),
            hourly:parseHourlyWeather(data)
        }
    }
    )  
}
function parseCurrentWeather({current_weather,daily}){
    const {
        temperature:currentTemp,
        windspeed:windSpeed,
        weathercode:iconCode,
    }=current_weather
    const {
        temperature_2m_max:[maxTemp],
        temperature_2m_min:[minTemp],
        apparent_temperature_max:[maxFeelsLike],
        apparent_temperature_min:[minFeelsLike],
        precipitation_sum:[precip],
    }=daily
    return {
        currentTemp,
        highTemp:maxTemp,
        lowTemp:minTemp,
        highFeelsLike:maxFeelsLike,
        lowFeelsLike:minFeelsLike,
        windSpeed,
        precip:precip,
        iconCode,
    }
}
function parseDailyWeather({daily}) {
    return daily.time.map((time,index)=>{
        return {
           timestamp :time*1000,
           iconCode:daily.weathercode[index] ,
           maxTemp:Math.round(daily.temperature_2m_max[index])
        }
    })
}
function parseHourlyWeather ({hourly,current_weather}){
    return hourly.time.map((time,index) => {
       return {
        timestamp:time * 1000,
        iconCode: hourly.weathercode[index],
        temp:Math.round(hourly.temperature_2m[index]),
        feelsLike:Math.round(hourly.apparent_temperature[index]),
        windSpeed:Math.round(hourly.windspeed_10m[index]),
        precip:Math.round((hourly.precipitation[index]*100)/100),
       }
    }).filter(({timestamp})=> timestamp>=current_weather.time *1000)
}