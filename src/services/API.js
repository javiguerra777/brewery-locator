import axios from "axios";
const baseUrl = `https://api.openbrewerydb.org/breweries`;

const config = {
  headers:{
    Authorization:
      "Bearer {REACT_APP_API_KEY_YELP}",
  },
  params: {
    terms: "restaurants",
    location: "1234 street street",
    radius: 1609,
    sort_by: "relevance",
    limit: 50,
  },
};

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