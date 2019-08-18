import Axios from "axios";

export const axios = Axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  params: {
    appId: '8fa3121bd792461fdb4eeb6e0100d91d',
  }
})

export const geolocation = Axios.create({
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
  params: {
    access_token: 'pk.eyJ1IjoiY29yb25lbGwiLCJhIjoiY2p1OGp1OHR2MWxxdjQ0cWtiNzc5eTlwNSJ9.g_jmzx3kDEF7cnNBuuFSZA',
    limit: 1,
  }
});

export const weatherFetcher = Axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/a59d60cd958df794a2a477ad6dfe0942',
  headers: {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'},
  
  params: {
    units: 'si',
    lang: 'en',
  }
})

export default { axios, geolocation, weatherFetcher };