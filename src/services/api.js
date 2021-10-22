const fetchWeather = async ({lat, lng}) => {
  
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=${process.env.WEATHER_API.KEY}`)
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
  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&result_type=political&key=${process.env.GOOGLE_API_KEY}`) 
  const { results } = await response.json()
  const { formatted_address } = results[0]

  return formatted_address;
  
}

const fetchUserGeolocation = async () => {
  const response = await fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.GOOGLE_API_KEY}`, {method: "POST"})
    const {location: {lat, lng}} = await response.json()
    return {lat, lng}
}

const fetchGeoCodeFromCityName = async (city) => {
  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${process.env.GOOGLE_API_KEY}`);

  const { results } = await response.json()
  const { geometry } = results[0];
  
  return geometry.location;
}

export {fetchGeoCodeFromCityName, fetchUserGeolocation, fetchAddressFromLocation, fetchWeather}