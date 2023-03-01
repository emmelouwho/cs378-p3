import {fetchWeatherData} from './API.js'
import React, {useEffect, useState} from 'react'
import {WeatherTable, WeatherSection} from './display.js'

export function Weather(props){
    const {item, loading} = props;
    const [weather, setWeather] = useState(null);
    const [currentTemp, setCurrTemp] = useState(null);
    useEffect(() => {
        async function getWeather(){
            const weatherData = await fetchWeatherData(item);
            setWeather(weatherData);
        }

        async function setUp(){

            await getWeather();
            if(weather === null) return;
            const timezone = new Date().toLocaleString("en-US", { timeZone: item.timezone });
            const today = new Date(timezone);
            
            const month = today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1;
            const hours = today.getHours() < 10 ? '0' + today.getHours(): today.getHours();
            const date = today.getDate() < 10 ? '0' + today.getDate(): today.getDate();
            const currTime = today.getFullYear() + '-' + month + '-' + date + 'T' + hours + ':00';
            const index = weather.hourly.time.indexOf(currTime);
            setCurrTemp(weather.hourly.temperature_2m[index]);
        }
        setUp();
    })

    const tableBody = () => {
        if(!weather) return;
        const index = Array.from(Array(10).keys());
        return (
            <tbody>
                {index.map((i) => {
                    let time = parseInt(weather.hourly.time[i].substring(11,13));
                    if(time === 0){
                        time = '12:00AM';
                    }else if(time <= 12){
                        time = time + ':00AM';
                    }else {
                        time = time + ':00PM';
                    }          
                    const temp = weather.hourly.temperature_2m[i];      
                    return (
                        <tr>
                            <th>{time}</th>
                            <th>{temp} F</th>
                        </tr>
                    ); 
                })}
            </tbody>
        )
    }

    if(loading){
        return(
            <div>
                Loading...
            </div>
        )
    }
    return(
        <WeatherSection>

            {currentTemp && (<div>
                {currentTemp} F
            </div>)}
            <WeatherTable>
                <thead>
                    <tr><th>Time</th>Temp</tr>
                </thead>
                {tableBody()}
            </WeatherTable>
        </WeatherSection>
    )
}