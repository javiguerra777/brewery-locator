import React, { useEffect, useState } from 'react'
import { useParams , useNavigate} from 'react-router-dom';
import { getBrewery } from '../services/API';
import { phoneStyle } from '../services/Functions';
import '../stylesheets/info.css'
const Info = () => {
  const navigate = useNavigate();
  const [brewery, setBrewery] = useState([]);
  const { id } = useParams();
  const {name, street, city, state, phone, website_url, brewery_type} = brewery;
  useEffect(()=> {
    getBrewery(id)
    .then(({data:brewery}) => setBrewery(brewery))
    .catch((err)=> console.log(err));
  }, [getBrewery, id]);
  return (
    <div className='information'>
      <button onClick={()=> navigate('/')}>Return to home</button>
     <h1>Brewery Info:</h1>
     <p>
      Name: {name}
     <br/>
     Address: {street} {city}, {state}
     <br/>
     Phone: {phone ? <span id="phone">{phoneStyle(phone)}</span> : 'N/A'}
      <br/>
      Website: {website_url ? <a href={website_url} target="_blank">{website_url}</a> : 'N/A'}
      <br/>
      Type of Brewery: {brewery_type}
     </p>
    </div>
  );
};

export default Info;