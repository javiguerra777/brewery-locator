import React from 'react';
import { useEffect, useState} from 'react';
import { getBreweries, serverData} from '../services/API';
import Form from '../components/Form';
import Breweries from '../components/Breweries';
import Maps from '../components/Maps';
import styled from 'styled-components';
import brew_bkgd from '../img/brew_bkgd.png';
import { device } from '../utils/device';
import { Cities } from '../services/Citydata';

const MainWrapper = styled.main`
  width: 100vw;
  height: 100vh;
  background-image: url(${brew_bkgd});
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  background-size: cover;
  .wholeContent{
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    overflow-y: scroll;
  }
  .wholeContent::-webkit-scrollbar{
    display: none;
  }
  .wholeContent{
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .contentSection{
    margin: 20px auto;
    height: 80vh;
    width: 95vw;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    .dataContainer{
      overflow-y:scroll;
    }
    .dataContainer::-webkit-scrollbar{
      display: none;
    }
    .dataContainer{
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  }

  @media ${device.tablet}{
    .contentSection{
      width: 90vw;
      flex-direction: row;
    }

    .dataContainer{
      width: 23vw;
    }
  }
`

const Main = () => {
  let disabled = false;
  const [location, setLocation] = useState(JSON.parse(localStorage.getItem('location')) ||'Fresno, CA');
  const fixedLocation = location.split(',');
  const [newLocation, setNewLocation] = useState('');
  const [data, setData] = useState([]);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [newSearch, setNewSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [yelpData, setYelpData] = useState([]);
  
  //functions
  if(newLocation.toLowerCase().includes('lol') || newLocation.toLowerCase().includes('hershe')){
    disabled = true;
  }
  const handleLocationChange = (text) => {
    let matches = [];
    if(text.length > 0){
     matches = Cities.filter(city => {
       const regex = new RegExp(`${text}`, "gi");
       return city.city.match(regex);
     })
    }
    setSuggestions(matches);
    setNewLocation(text);
  };

  const submit = (e) => {
    e.preventDefault();
    localStorage.setItem('location', JSON.stringify(newLocation));
    setLocation(newLocation);
    setNewLocation('');
    setSuggestions([]);
  };

  const handleSearch = (e) => {
    setNewSearch(e.target.value);
  };

  const search = (apiData) => {
    if (newSearch === ''){
      return apiData;
    }else {
      return apiData.filter((value)=> {
        if(value.name?.toLowerCase().includes(newSearch.toLowerCase()) || value.brewery_type?.toLowerCase().includes(newSearch.toLowerCase()) ||
        value.state?.toLowerCase().includes(newSearch.toLowerCase())){
          return value; 
        }
      })
    }
  };
  const resetSearch = (e)=> {
    e.preventDefault();
    setNewSearch('');
  };

  const suggestionHandler = (text)=> {
  setNewLocation(text);
    setSuggestions([]);
  }

  //grab data from API
  useEffect(() => {
    getBreweries(fixedLocation[0])
    .then((response)=>{
    setData(response.data);
    setNewLocation('');
    })
    .catch((err)=> console.log(err));
  },[location])
  //grabbing data from the Yelp API
  // useEffect(()=> {
  //   serverData()
  //   .then(response => {
  //     console.log(response)
  //     setYelpData(response)
  //   })
  // }, []);
  
  //grab data from localstorage
  useEffect(()=> {
    const retrieveLocation = JSON.parse(localStorage.getItem('location'));
    if(retrieveLocation){
      setLocation(retrieveLocation);
    }
  },[])
  //use effect for default center in map component
  useEffect(() => {
    if(data.length){
      //for (const {name, longitude, latitude} of data){
      let foundLng = '';
      let foundLat = '';
      const allData = data.entries();
      //loop until find a longitude
      while (foundLng === '' && foundLat === ''){
        let nextData = allData.next().value;
        let tempLng = parseFloat(nextData[1].longitude);
        let tempLat = parseFloat(nextData[1].latitude);
        if (!isNaN(tempLng) && !isNaN(tempLat)){
          foundLng = tempLng;
          foundLat = tempLat;
          setLng(foundLng);
          setLat(foundLat);
        }
      }
    }
  }, [data, location]);

  return (
  <>
    <MainWrapper>
      <article className='wholeContent'>
      <Form location={location}  newLocation={newLocation} submit={submit} handleLocationChange={handleLocationChange}
        newSearch={newSearch} handleSearch={handleSearch} resetSearch={resetSearch}
        suggestions={suggestions} suggestionHandler={suggestionHandler} disabled = {disabled}/>
        <section className='contentSection'>
          <div className='mapContainer'>
            {(data && lng && lat) && <Maps data={data} lng={lng} lat={lat}></Maps>}
          </div>
          <div className='dataContainer'>
            <Breweries data={search(data)}/>
          </div>
        </section>
      </article>
    </MainWrapper>
  </> 
  );
}
export default Main;