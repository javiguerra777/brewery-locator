import React from 'react';
import { useEffect, useState } from 'react';
import { Map, Overlay } from 'pigeon-maps';
import { maptiler } from 'pigeon-maps/providers';
import styled from 'styled-components';
import beerImg from '../img/beer.png';
import {nanoid} from 'nanoid';
import { device } from '../utils/device';

const apiKey = process.env.REACT_APP_API_KEY;
const maptilerProvider = maptiler(apiKey, 'streets');

const MapContainer = styled.div`
    width: 100vw;
    height: 60vh;
    img{
        cursor: pointer;
    }

    @media ${device.tablet}{
        width: 77vw;
        height: 100vh;
      }
`

const Maps = ( {data, lng, lat} ) => {
    const [curLng, setCurLng] = useState(0);
    const [curLat, setCurLat] = useState(0);
    const [curZoom, setCurZoom] = useState(0);

    useEffect(() => {
        setCurLng(lng);
        setCurLat(lat);
        setCurZoom(11);
    }, [lat, lng])

    const brewClick = (bname, blng, blat) => {
        setCurZoom(14);
        setCurLng(parseFloat(blng));
        setCurLat(parseFloat(blat));
    }

    const renderOverlays = () => {
        const coordElmts=[];
        for (const {name, longitude, latitude} of data){
            const flat=parseFloat(latitude)
            const flng=parseFloat(longitude)
            //add overlay if long and lat have values
            if(!isNaN(flat) && !isNaN(flng)){
                coordElmts.push(
                    <Overlay anchor={[flat, flng]} key={nanoid()}>
                        <img src={beerImg} width={50} height={50} onClick={() => brewClick(name, longitude, latitude)} alt={name}/>
                    </Overlay>
                )
            }
        }
        return coordElmts;
    }

    const renderMap = () => {
        const mapElmt=[];
        mapElmt.push(
            <Map provider={maptilerProvider}
                key={nanoid()}
                dprs={[1,2]}
                center={[curLat, curLng]}
                defaultZoom={curZoom}>
                {renderOverlays()}
                {/* second overlay */}
            </Map>
        );
        return mapElmt;
    };

    return (
        <MapContainer>
            {renderMap()}
        </MapContainer>
    )                                                                   
}                                                                           

export default Maps;