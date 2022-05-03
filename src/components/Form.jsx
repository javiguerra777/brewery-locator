import React from 'react';


export const Form = ({location, submit, newLocation, handleLocationChange}) => {
  return (
    <div className='header'>
        <h1>Brewery Search For <span id="location">{location}</span>:</h1>
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
  );
};

export default Form;