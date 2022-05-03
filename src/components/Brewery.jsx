import React from 'react';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { phoneStyle } from '../services/Functions';

const Brewery = ({brewery: {id, name, street, city, state, phone, brewery_type}}) => {
  const navigate = useNavigate();
  return (
    <div key={nanoid()} className="card" onClick={()=> navigate(`/brewery/${id}`)}>
          <p>{name}</p>
          <p>{street} {city}, {state}</p>
          <p>{phoneStyle(phone)}</p>
          <p>{brewery_type}</p>
        </div>
  );
};

export default Brewery;