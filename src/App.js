import React, { useEffect } from 'react'
import './App.css';
import MainWeather from './MainWeather';
import UserProfile from './userProfile';

function App() {
  return (
    <div className="App">
      <UserProfile/>
      <MainWeather/>
      
    </div>
  );
}

export default App;
