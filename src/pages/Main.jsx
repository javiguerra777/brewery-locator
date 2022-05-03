import axios from 'axios';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import Maps from '../components/Maps'
import '../components/mainpage.css';

const Main = () => {
  const [location, setLocation] = useState('Fresno, CA');
  const fixedLocation = location.split(',');
  const [newLocation, setNewLocation] = useState('');
  const [data, setData] = useState([]);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const breweryUrl = `https://api.openbrewerydb.org/breweries?by_city=${fixedLocation[0]}`;
  const handleLocationChange = (e) => {
    setNewLocation(e.target.value);
  }
  const submit = (e) => {
    e.preventDefault();
    setLocation(newLocation);
    setNewLocation('');
  }
  useEffect(() => {
    axios.get(breweryUrl)
    .then((response)=>{
       console.log(response.data)
      setData(response.data)})
    .catch((err)=> console.log(err));

  }, [location]);
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
  }, [data, location])
  return (
    <>
    {(data && lng && lat) && <Maps data={data} lng={lng} lat={lat}></Maps>}
    <div className='container'>
      <div className='header'>
      <h1>Brewery Search For <strong>{location}</strong>:</h1>
      <p>Search by city, state, or zip</p>
        <form onSubmit={submit} >
        <label>
          <input
          value={newLocation}
          onChange={handleLocationChange}
          />
        </label>
        <button type='submit'>Search</button>
        </form>
      </div>
    <div className='data'>
      {/*Shows data from brewery API */}
      <code>
        {data.map((brewery)=> {
          return (
          <div key={nanoid()} className="card">
            <p>{brewery.name}</p>
            <p>{brewery.street} {brewery.city}, {brewery.state}</p>
            <p>{brewery.phone}</p>
          </div>
          )
        })}
      </code>
    </div>
    </div>
    </>
  );
}

export default Main;