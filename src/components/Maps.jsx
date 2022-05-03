import React from 'react';
import { Map, Marker, Overlay } from 'pigeon-maps';
import { maptiler } from 'pigeon-maps/providers';
import RenderOverlays from './RenderOverlays';
import beerImg from '../img/beer.png';
import styled from 'styled-components';


const apiKey = process.env.REACT_APP_API_KEY;
// const apiKey = 'xjvsbhH2HT83hJjmdqQ2'
//const apiKey = process.env.REACT_APP_API_KEY;
const maptilerProvider = maptiler(apiKey, 'streets');

const meow = () => {
    console.log('meow');
}

const ChangeMouse = styled.div`
    img{
        cursor: pointer;
    }
`

//console.log(apiKey)
const Maps = ( {data} ) => {

    //console.log(`${apiKey}`)
    return (
        <ChangeMouse>
        <Map
            provider={maptilerProvider}
            dprs={[1, 2]}   //setstate dprs
            height={500}    //setstate height
            defaultCenter={[50.879, 4.6997]} //setstate long, lat**
            //setstate zoom 
            defaultZoom={11}>
            {/* <RenderMarkers></RenderMarkers> */}
            {/* i think we'll decide between overlay and markers */}
            {/* <Marker width={50} anchor={[50.879, 4.6997]} />
            <Marker width={50} anchor={[50, 4]} onClick={() => meow()}/> */}
            <RenderOverlays data={data}></RenderOverlays>
            {/* <Overlay anchor={[50.879, 4.6997]} offset={[22, 60]}>
                <img src={beerImg} width={50} height={50} onClick={() => meow()}  alt='' />
            </Overlay>
            <Overlay anchor={[50, 4]} offset={[22, 60]}>
                <img src={beerImg} width={50} height={50} onClick={() => meow()}  alt='' />
            </Overlay> */}
        </Map>
        </ChangeMouse>
    )                                                                   
}                                                                           

export default Maps;