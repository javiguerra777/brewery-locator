import React from 'react';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { phoneStyle } from '../services/Functions';
import styled from 'styled-components';

const CardWrapper = styled.div`
  border: 1px black solid;
  border-radius: .5em;
  cursor: pointer;
<<<<<<< HEAD
  .brewType{
    text-transform: capitalize;
=======
  .card:hover {
    background-color: purple;
>>>>>>> b25d4d6d829deeb1dc7a33faa1002f5d1666506e
  }
`

const Brewery = ({brewery: {id, name, street, city, state, phone, brewery_type}}) => {
  const navigate = useNavigate();
  return (
    <CardWrapper>
      <div key={nanoid()} className="card" onClick={()=> navigate(`/brewery/${id}`)}>
        <p>{name}</p>
        <p>{street} {city}, {state}</p>
        <p>{phoneStyle(phone)}</p>
        <p className='brewType'>{brewery_type}</p>
      </div>
    </CardWrapper>
  );
};

export default Brewery;