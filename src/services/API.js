import axios from "axios";

const baseUrl = `https://api.openbrewerydb.org/breweries`;
const serverUrl = `http://localhost:3001`;

export const getYelpData = () => {
  return axios.get("https://api.yelp.com/v3/search", config)
  .then((response) => {
    console.log(response);
  })
}

export const getBreweries = (city) => {
  return axios.get(`${baseUrl}?by_city=${city}`);
};

export const getBrewery = (id) => {
  return axios.get(`${baseUrl}/${id}`)
};

export const serverData = () => {
  return axios.get(serverUrl);
}