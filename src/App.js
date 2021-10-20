import React, {useState, useEffect } from 'react';
import './App.css';
import Map from './components/map/Map';
import SearchBar from './components/searchbar/SearchBar'
import WeatherCard from './components/weathercard/WeatherCard';

function App() {
  const [coordinates, setCoordinates] = useState({});
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('')
  const [temperatures, setTemperatures] = useState([]);
  const [currentTemperature, setCurrentTemperature] = useState({ firstRenderTemperature: 0 });
  
  useEffect(() => {
    const currentTemperatureObject = temperatures.length ? temperatures[0]: currentTemperature;
    const todaysTemperature = Object.values(currentTemperatureObject)[0];
    setCurrentTemperature(todaysTemperature);
  }, [temperatures])

 
  return (
    <div className="App app-relative">
      <Map 
        city={city} 
        address={address} 
        temperature={currentTemperature}
        onAddressChange={setAddress} 
        onCoordinateChange={setCoordinates}
      />
      <div className="wrapper">
        <SearchBar onChange={setCity} />
        <WeatherCard  
          address={address}
          coordinates={coordinates}
          temperatures={temperatures}
          onTemperatureChange={setTemperatures}
        />
      </div>
    </div>  
  );
}

export default App;
