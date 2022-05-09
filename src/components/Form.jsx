import React from 'react';
import styled from 'styled-components';

const FormWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  gap: 5px;
  h2, span{
    font-family: 'Oleo Script', cursive;
    font-size: 1.8rem;
  }
  form{
    margin-top: 5px;
  }
  #location{
    text-transform: capitalize;
  }
  input{
    color: #000000;
    background-color: #ffffff;
  }
  input::placeholder {
    color: #000000;
  }
  .searchInput{
    min-width: 222px;
  }
  .filterInput{
    min-width: 200px;
  }
  button {
    min-width: 100px;
    background-color: black;
    cursor:pointer;
    margin-left: 10px;
  }
  button:hover {
    background-color: #85cdd2;
  }
  .suggestions{
    cursor: pointer;
  }
  .suggestions:hover{
    background-color: yellow;
    color: #000000;
  }
`

export const Form = ({location, submit, newLocation, handleLocationChange, newSearch, handleSearch, resetSearch, suggestions, suggestionHandler, disabled}) => {
  return (
    <FormWrapper>
      <div className='header-container'>
        <h2>Brewery Search For <span id="location">{location ? location : "Crazy Stewie's Favorites"}</span></h2>
          {/* <p>Search by city, state, or zip</p> */}
      </div>
      <div className='formSection'>
        <form id ='search' onSubmit={submit} >
          <label>
            Enter City:
            <input
            className='searchInput'
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
            )
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
            Filter Results:
            <input
            className='filterInput' 
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
  )
};

export default Form;