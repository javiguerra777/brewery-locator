import React from 'react';
import { Cities, renderCities } from '../services/Citydata';
import Autocomplete from 'react-autocomplete';

export const Form = ({location, setLocation, submit, newLocation, handleLocationChange, newSearch, handleSearch, resetSearch}) => {
  let disabled = false;
  console.log(newSearch)
  return (
    <div className='header-container'>
      <h1>Brewery Search For <span id="location">{location}</span>:</h1>
        <p>Search by city, state, or zip</p>
   
    <div className='header'>
  
        <form id ="search" onSubmit={submit} >
          <label>
            Enter City:
            <input
            type="text"
            value={newLocation}
            onChange={handleLocationChange}
            />
          <button type='submit' disabled={disabled}>Search</button>

          </label>
          <label>
            Enter State:
            <input
            type="text"
            />
            <button>Search</button>
          </label>
          <label>
            Enter Zip:
            <input
            type="text"
            />
            <button>Search</button>
          </label>
      </form>
      <form>
        <label htmlFor='search'>
          Search through results:
          <input 
          type="text"
          id='search'
          placeholder='search breweries'
          value={newSearch}
          onChange={handleSearch}
           />
        </label>
        <button onClick={resetSearch}>Reset Search</button>
      </form>
    </div>
    </div>
  );
};

export default Form;