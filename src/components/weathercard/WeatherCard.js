import React, { useEffect } from 'react'
import './WeatherCard.css'

import { fetchWeather } from '../../services/api';

const ItemWeatherCard = ({weatherForecast}) => {
  const timestamp = Object.keys(weatherForecast)[0];
  const temperature = Object.values(weatherForecast)[0];
  const date = new Date(timestamp * 1000);

  console.log(date.toLocaleDateString("pt-br"));

  const [day, month] = date.toLocaleDateString("pt-br").split('/')
  
  return <div className='column'>
    <div>{day}/{month}</div><div>{((temperature))}</div>
  </div>
}

function WeatherCard({address, onTemperatureChange, temperatures, coordinates}) {
  const temperaturesWithoutCurrent = [...temperatures].splice(1, temperatures.length-1);

  useEffect(() => {
    console.log('leruaite: ', temperatures);
    if(coordinates?.lat && coordinates?.lng) {
      const {lat, lng } = coordinates;
      fetchWeather({lat, lng }).then((temperaturesResponse) => {
        onTemperatureChange(temperaturesResponse);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordinates]);

  return (
    <div className='popupcard'>
      <p>{address}</p>
      <div className='row'>
        {temperaturesWithoutCurrent.map((weatherForecast, i) => 
          <ItemWeatherCard weatherForecast={weatherForecast} key={i} />
        )}
      </div>
    </div>
  )
}

export default WeatherCard