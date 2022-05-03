import axios from 'axios';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import Maps from '../components/Maps'
import './mainpage.css';

const Main = () => {
  const [location, setLocation] = useState('Fresno, CA');
  const fixedLocation = location.split(',');
  const [newLocation, setNewLocation] = useState('');
  const [data, setData] = useState([]);
  const breweryUrl = `https://api.openbrewerydb.org/breweries?by_city=${fixedLocation[0]}`;
  //const [breweries, setBreweries] = useState(data.map((brewery)=> brewery.name));
  //console.log('Here are the breweries', breweries)
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
  return (
    <>
    <Maps data={data}></Maps>
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