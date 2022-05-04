import { useEffect, useState } from 'react';
import '../stylesheets/main.css';
import Form from '../components/Form';
import Breweries from '../components/Breweries';
import Maps from '../components/Maps';
import { getBreweries } from '../services/API';
const Main = () => {

  const [location, setLocation] = useState(JSON.parse(localStorage.getItem('location')) ||'Fresno, CA');
  const fixedLocation = location.split(',');
  const [newLocation, setNewLocation] = useState('');
  const [data, setData] = useState([]);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [newSearch, setNewSearch] = useState('');
  //functions
  const handleLocationChange = (e) => {
    setNewLocation(e.target.value);
  }

  const submit = (e) => {
    e.preventDefault();
    localStorage.setItem('location', JSON.stringify(newLocation));
    setLocation(newLocation);
    setNewLocation('');
  }

  const handleSearch = (e) => {
    setNewSearch(e.target.value);
  }

  const search = (apiData) => {
    if (newSearch === ''){
      return apiData;
    }else {
      return apiData.filter((value)=> {
        if(value.name?.toLowerCase().includes(newSearch) || value.name?.includes(newSearch) || value.brewery_type?.toLowerCase().includes(newSearch) || value.brewery_type?.includes(newSearch)){
          return value; 
        }
      })
    }
  }
  const resetSearch = (e)=> {
    e.preventDefault();
    setNewSearch('');
  }
  //grab data from API
  useEffect(() => {
    getBreweries(fixedLocation[0])
    .then((response)=>{
      console.log(response.data)
    setData(response.data);
    setNewLocation('');
    })
  },[location])
  
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
      const allData = data.entries();
      //loop until find a longitude
      while (foundLng === ''){
        let nextData = allData.next().value;
        let tempLng = parseFloat(nextData[1].longitude);
        let tempLat = parseFloat(nextData[1].latitude);
        if (!isNaN(tempLng && !isNaN(tempLat))){
          foundLng = tempLng;
          setLng(tempLng);
          setLat(tempLat);
        }
      }
    }
  }, [data, location]);

  return (
  <>
  <div className='container'>
    <header className='container-header'>
    <Form location={location} setLocation={setLocation} newLocation={newLocation} submit={submit} handleLocationChange={handleLocationChange}
    newSearch={newSearch} handleSearch={handleSearch} resetSearch={resetSearch}/>
    </header>
    <div className='content'>
    {(data && lng && lat) && <Maps data={data} lng={lng} lat={lat}></Maps>}
      <div className='box'>
      <Breweries data={search(data)}/>
      </div>
    </div>
  </div>
  </> 
  );
}
export default Main;
  
  

