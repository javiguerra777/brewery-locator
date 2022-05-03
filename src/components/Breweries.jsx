import React from 'react';
import Brewery from './Brewery';

const Breweries = ({data}) => {
  return (
    <div className='data'>
        {/*Shows data from brewery API */}
    <code>
    {data.map((brewery)=> {
      return (
        <Brewery key ={brewery.id} brewery={brewery}/>
        )

      })}
    </code>
  </div>
  );
};

export default Breweries