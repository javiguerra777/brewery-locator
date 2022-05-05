import React from 'react';
import Brewery from './Brewery';

const Breweries = ({data}) => {
  return (
    <div className='data'>
      {/*Shows data from brewery API */}
      {data.map((brewery)=> {
        return (<Brewery key ={brewery.id} brewery={brewery}/>)
      })};
    </div>
  );
};

export default Breweries;