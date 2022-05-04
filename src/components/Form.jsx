import React from 'react';
import styled from 'styled-components';

const FormWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`

export const Form = ({location, submit, newLocation, handleLocationChange}) => {
  return (
    <FormWrapper>
      <div className='header'>
        <h2>Brewery Search For <span id="location">{location}</span>:</h2>
      </div>
      <div className='formSection'>
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
    </FormWrapper>
  );
};

export default Form;