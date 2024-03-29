import React, {useState, useEffect} from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { ref, set, onValue } from "firebase/database";
import './App.css';

import { Search } from './searchBar';
import { CityList } from './display';
import { Weather } from './weather';
import { db } from './firebase';

function MainWeather() {
  const initalCities = [
    {name: 'Austin, Texas, US', longitude: -97.74306, latitude: 30.26715, timezone: 'America/Chicago'},
    {name: 'Dallas, Texas, US', longitude: -96.80667, latitude: 32.78306, timezone: 'America/Chicago'},
    {name: 'Houston, Texas, US', longitude: -95.36327, latitude: 29.76328, timezone: 'America/Chicago'}
  ];

  const [citites, setCities] = useState([]);
  const [activeCity, setActiveCity] = useState(initalCities[0]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth0();

  useEffect(() => {
    if(user){
      const username = user.email.split("@")[0]
      const userProf = ref(db, 'users/' + username);
      onValue(userProf, (snapshot) => {
        const data = snapshot.val();
        if(data){
          setCities(data.citites);
          setActiveCity(data.citites[0])
        }
      });
    }else(
      setCities(initalCities)
    )
  }, [user]);

  function equalObjects(obj1, obj2) {
    return obj1.name === obj2.name && obj1.latitude === obj2.latitude && obj1.longitude === obj2.longitude;
  }

  function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
      if (equalObjects(list[i], obj)) {
        return true;
      }
    }
    return false;
  }
  const addCityHandler = (item) => {
    const name = item.admin1 ? `${item.name}, ${item.admin1}, ${item.country_code}`: `${item.name}, ${item.country_code}`
    const newCity = {
      name: name,
      longitude: item.longitude,
      latitude: item.latitude,
      timezone: item.timezone,
    }
    if(!containsObject(newCity, citites)){
      setCities(citites => [...citites, newCity]);
    } 
    const username = user.email.split("@")[0]
    set(ref(db, 'users/' + username), {
        citites: [...citites, newCity],
    });
  };

  const changeCity = (e, item) => {
    setActiveCity(item);
    setLoading(true);
    setTimeout(function(){ 
      setLoading(false)
    }, 3000);
  }

  return (
    <div className="App">
      <Search addCity={addCityHandler}/>
      <CityList>
        {citites.map((item) => {
          const className = equalObjects(activeCity, item) ? 'active city' : 'non-active city';
          return(<button className={className} onClick={(e) => changeCity(e, item)}>{item.name}</button>);
        })}
      </CityList>
      <Weather item={activeCity} loading={loading}/>
    </div>
  );
}

export default MainWeather;
