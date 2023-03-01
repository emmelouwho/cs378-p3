import React, {useState} from 'react'
import './App.css';
import {fetchWeatherData} from './API.js'
import { Search } from './searchBar';
import { CityList } from './display';

function App() {
  // fetchAPIData('https://api.open-meteo.com/v1/forecast?latitude=30.27&longitude=-97.74&hourly=temperature_2m&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FChicago')
  //   .then((data) => console.log(data));
  const initalCities = {name: 'Austin, Texas, US', lon: -97.74306, lat: 30.26715};
  const [citites, setCities] = useState([initalCities]);

  function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i].name === obj.name && list[i].lat === obj.lat && list[i].lon === obj.lon) {
        return true;
      }
    }
    return false;
  }
  const addCityHandler = (item) => {
    const name = item.admin1 ? `${item.name}, ${item.admin1}, ${item.country_code}`: `${item.name}, ${item.country_code}`
    const newCity = {
      name: name,
      lon: item.longitude,
      lat: item.latitude,
    }
    if(!containsObject(newCity, citites)){
      setCities(citites => [...citites, newCity]);
    } 
  };

  return (
    <div className="App">
      <Search addCity={addCityHandler}/>
      <CityList>
        {citites.map((item) => {
            return(<button>{item.name}</button>);
        })}
      </CityList>
    </div>
  );
}

export default App;
