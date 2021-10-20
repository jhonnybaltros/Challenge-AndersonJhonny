import React, { useLayoutEffect, useEffect, useState, useRef } from 'react'
import { Loader } from "@googlemaps/js-api-loader"
import { fetchAddressFromLocation, fetchGeoCodeFromCityName, fetchUserGeolocation } from '../../services/api.js';
import './Map.css'

require('dotenv').config()

const loader = new Loader({ apiKey: "AIzaSyDymfsnjCoUvtIVlycHDJBWY7TrxdtgTY4"});

export default function Map({ city, address, onAddressChange, temperature, onCoordinateChange}) {

  const [coords, setCoords] = useState({});

  const google = useRef(null);
  const mapInstance = useRef(null);
  
  async function initMap() {
    
    const {lat, lng} = await fetchUserGeolocation()

    const googleAPI = await loader.load();

    mapInstance.current = new googleAPI.maps.Map(document.getElementById("map"), {
      center: { lat ,lng },
      zoom: 14,
      mapTypeControl:false,
      streetViewControl:false
    });

    google.current = googleAPI;

    setCoords({lat, lng});
    onCoordinateChange({lat, lng});
  }  

  useLayoutEffect(() => {
    initMap();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(city) {
      fetchGeoCodeFromCityName(city).then(({lat, lng}) => {
        setCoords({lat, lng});
        onCoordinateChange({lat, lng});
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  useEffect(() => {
    const API = google.current;
    const map = mapInstance.current;

    if (API && map && coords.lat && coords.lng &&address) {
      const {lat, lng} = coords
      
      const mapInfoWindow = new API.maps.InfoWindow({content:`<div>Hello, you are in ${address}  and the temperature is: ${temperature}° <div>`, maxWidth:200})
      const anchor = new API.maps.Marker({position:{lat, lng}, map, title: 'your location' })
      
      map.setCenter({lat, lng})

      mapInfoWindow.open({ map, anchor })
              
      return () => {
        anchor.setMap(null)
      }
    }    
  }, [coords, address, temperature])


  useEffect(() => {
    const {lat, lng} = coords

    if (lat && lng) {
      fetchAddressFromLocation({lat, lng}).then((address) =>{
        onAddressChange(address)
      })
    }
  },[coords, onAddressChange])
     
  return (<div id="map"/>)
}
