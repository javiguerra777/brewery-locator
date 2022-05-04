import React from 'react';
import { useEffect, useState} from 'react';
import { getBreweries } from '../services/API';
import Form from '../components/Form';
import Breweries from '../components/Breweries';
import Maps from '../components/Maps';
import styled from 'styled-components';
import brew_bkgd from '../img/brew_bkgd.png';
import { device } from '../utils/device';

const HeaderWrapper = styled.div`
  background-color: #ffffff;
  h1{
    font-family: 'Oleo Script', cursive;
  }
`
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
    width: 95vw;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    .dataContainer{
      overflow:hidden;
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
  const [location, setLocation] = useState('Fresno, CA');
  const fixedLocation = location.split(',');
  const [newLocation, setNewLocation] = useState('');
  const [data, setData] = useState([]);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);

  const handleLocationChange = (e) => {
    setNewLocation(e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    localStorage.setItem('location', JSON.stringify(newLocation));
    setLocation(newLocation);
    setNewLocation('');
  };

  //grab data from API
  useEffect(() => {
    getBreweries(fixedLocation[0])
    .then((response)=>{
      console.log(response.data)
    setData(response.data);
    setNewLocation('');
    })
  },[location]);

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
    <HeaderWrapper>
      <h1>BrewMaps</h1>
    </HeaderWrapper>
    <MainWrapper>
      <article className='wholeContent'>
        <Form location={location} newLocation={newLocation} submit={submit} handleLocationChange={handleLocationChange} />
        <section className='contentSection'>
          <div className='mapContainer'>
            {(data && lng && lat) && <Maps data={data} lng={lng} lat={lat}></Maps>}
          </div>
          <div className='dataContainer'>
            <Breweries data={data} />
          </div>
        </section>
      </article>
    </MainWrapper>
  </> 
  );
}
export default Main;