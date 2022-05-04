import React from 'react';

export const Form = ({location, submit, newLocation, handleLocationChange, newSearch, handleSearch, resetSearch, suggestions, suggestionHandler}) => {
  let disabled = false;
  return (
    <div className='header-container'>
      <h1>Brewery Search For <span id="location">{location ? location : "Crazy Stewie's Favorites"}</span>:</h1>
        <p>Search by city, state, or zip</p>
   
    <div className='header'>
  
        <form id ="search" onSubmit={submit} >
          <label>
            Enter City:
            <input
            type="text"
            value={newLocation}
            onChange={e=> handleLocationChange(e.target.value)}
            />
            {suggestions && suggestions.map((suggestion, i) => {
              return (
              <div className='suggestions' key={i} onClick={()=> suggestionHandler(`${suggestion.city}, ${suggestion.state}`)}>{suggestion.city}, {suggestion.state}</div>
              );
            })}
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