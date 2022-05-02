import React from 'react';
import { Map, Marker } from 'pigeon-maps';
import { maptiler } from 'pigeon-maps/providers';
import RenderMarkers from './RenderMarkers';

const apiKey = process.env.REACT_APP_API_KEY;
// const apiKey = 'xjvsbhH2HT83hJjmdqQ2'
//const apiKey = process.env.REACT_APP_API_KEY;
const maptilerProvider = maptiler(apiKey, 'streets');

//console.log(apiKey)
const Maps = () => {

    console.log(`${apiKey}`)
    return (
        <Map
            provider={maptilerProvider}
            dprs={[1, 2]}   //setstate dprs
            height={200}    //setstate height
            defaultCenter={[50.879, 4.6997]} //setstate long, lat**
            //setstate zoom 
            defaultZoom={11}>
        {/* <RenderMarkers></RenderMarkers> */}
            <Marker width={50} anchor={[50.879, 4.6997]} />
            <Marker width={50} anchor={[50, 4]} />
        </Map>
    )                                                                   
}                                                                           

export default Maps;