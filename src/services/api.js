const fetchWeather = async ({lat, lng}) => {
  
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=db12bab5b337edff75b23703b2d07bb9`)
    const data = await response.json()

    const { current, daily } = data

    const todayTempeture = { [current.dt]: current.temp};
 
    //ignore today's forecast from the list of the provisions temperatures    
    const [, ...nextDaysTemperatures] = daily.splice(0, 5);

    const weatherForecast = nextDaysTemperatures.map((nextDay)=> {
      return { [nextDay.dt]: nextDay.temp.day }
    });

    return [todayTempeture, ...weatherForecast];
}
  
const fetchAddressFromLocation = async ({lat, lng}) => {
  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&result_type=political&key=AIzaSyDymfsnjCoUvtIVlycHDJBWY7TrxdtgTY4`) 
  const { results } = await response.json()
  const { formatted_address } = results[0]

  return formatted_address;
  
}

const fetchUserGeolocation = async () => {
  const response = await fetch('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDymfsnjCoUvtIVlycHDJBWY7TrxdtgTY4', {method: "POST"})
    const {location: {lat, lng}} = await response.json()
    return {lat, lng}
}

const fetchGeoCodeFromCityName = async (city) => {
  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=AIzaSyDymfsnjCoUvtIVlycHDJBWY7TrxdtgTY4`);

  const { results } = await response.json()
  const { geometry } = results[0];
  
  return geometry.location;
}

export {fetchGeoCodeFromCityName, fetchUserGeolocation, fetchAddressFromLocation, fetchWeather}