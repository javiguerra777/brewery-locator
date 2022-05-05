import { useEffect, useState } from 'react';
import '../stylesheets/main.css';
import Form from '../components/Form';
import Breweries from '../components/Breweries';
import Maps from '../components/Maps';
import { getBreweries } from '../services/API';
import { Cities } from '../services/Citydata';

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
  //functions
  if(newLocation.toLowerCase() === 'lol' || newLocation.toLowerCase() === 'hershe' || newLocation.toLowerCase() === 'hershey'){
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
    <Form location={location}  newLocation={newLocation} submit={submit} handleLocationChange={handleLocationChange}
    newSearch={newSearch} handleSearch={handleSearch} resetSearch={resetSearch}
    suggestions={suggestions} suggestionHandler={suggestionHandler} disabled = {disabled}/>
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
  
  

