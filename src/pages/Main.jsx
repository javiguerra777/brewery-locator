import { useEffect, useState } from 'react';
import '../stylesheets/main.css';
import Form from '../components/Form';
import Breweries from '../components/Breweries';
import Maps from '../components/Maps';
import { getBreweries } from '../services/API';
const Main = () => {
  const [location, setLocation] = useState('Fresno, CA');
  const fixedLocation = location.split(',');
  const [newLocation, setNewLocation] = useState('');
  const [data, setData] = useState([]);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const handleLocationChange = (e) => {
    setNewLocation(e.target.value);
  }
  const submit = (e) => {
    e.preventDefault();
    localStorage.setItem('location', JSON.stringify(newLocation));
    setLocation(newLocation);
    setNewLocation('');
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
  <div className='container'>
  <header>
  <Form location={location} newLocation={newLocation} submit={submit} handleLocationChange={handleLocationChange} />
  </header>
  <section className='content'>
  {(data && lng && lat) && <Maps data={data} lng={lng} lat={lat}></Maps>}
  <Breweries data={data} />
  </section>
  </div>
  </> 
  );
}
export default Main;
  
  

