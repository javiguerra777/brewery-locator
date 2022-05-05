import React from 'react';
import styled from 'styled-components';

const FormWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  input{
    color: #000000;
    background-color: #ffffff;
  }
  button{
    min-width: 100px;
  }
`

export const Form = ({location, submit, newLocation, handleLocationChange, newSearch, handleSearch, resetSearch, suggestions, suggestionHandler, disabled}) => {
  return (
    <FormWrapper>
      <div className='header-container'>
        <h1>Brewery Search For <span id="location">{location ? location : "Crazy Stewie's Favorites"}</span>:</h1>
          <p>Search by city, state, or zip</p>
      </div>
      <div className='formSection'>
        <form id ="search" onSubmit={submit} >
          <label>
            Enter City:
            <input
            type="text"
            value={newLocation}
            onChange={e=> handleLocationChange(e.target.value)}
            />   
            <button type='submit' disabled={disabled}>Search</button>
          </label>
          {suggestions && suggestions.map((suggestion, i) => {
          return (
            <div className='suggestions' key={i} onClick={()=> suggestionHandler(`${suggestion.city}, ${suggestion.state}`)}>{suggestion.city}, {suggestion.state}</div>
            );
          })}
            {/* <label>
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
            </label> */}
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
    </FormWrapper>
  );
};

export default Form;