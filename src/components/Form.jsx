import React from 'react';
import styled from 'styled-components';

const FormWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
<<<<<<< HEAD
  input{
    color: #000000;
    background-color: #ffffff;
  }
  button{
    min-width: 100px;
=======
  button {
    background-color: black;
    cursor:pointer;
    margin-left: 10px;
  }
  button:hover {
    background-color: red;
  }
  input {
    background-color: black;
  }
  input::placeholder {
    color: white;
  }
  .suggestions{
    cursor: pointer;
  }
  .suggestions:hover{
    background-color: yellow;
    color: black;
>>>>>>> b25d4d6d829deeb1dc7a33faa1002f5d1666506e
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
            placeholder="Fresno, CA"
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
            placeholder='Tactical OPS Brewing Inc.'
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