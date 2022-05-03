import React from 'react';
import { useEffect, useState } from 'react';
import { Map, Marker, Overlay } from 'pigeon-maps';
import { maptiler } from 'pigeon-maps/providers';
import styled from 'styled-components';
import beerImg from '../img/beer.png';
import {nanoid} from 'nanoid';


const apiKey = process.env.REACT_APP_API_KEY;
const maptilerProvider = maptiler(apiKey, 'streets');

const meow = (bname, blng, blat) => {
    console.log(bname);
    console.log(blng);
    console.log(blat);
}

const ChangeMouse = styled.div`
    img{
        cursor: pointer;
    }
`

//console.log(apiKey)
const Maps = ( {data, lng, lat} ) => {
    const [curLng, setCurLng] = useState(0);
    const [curLat, setCurLat] = useState(0);
    const [lngData, setLngData] = useState([]);
    const [latData, setLatData] = useState([]);

    useEffect(() => {
        //set longitude and latitude array
        setLngData(data.map(brewery => brewery.longitude))
        setLatData(data.map(brewery => brewery.latitude))
        //set default center
        const fcLng=parseFloat(lngData[0]);
        const fcLat=parseFloat(latData[0]);
        setCurLng(fcLng);
        setCurLat(fcLat);
    }, [data])

    const renderOverlays = () => {
        const coordElmts=[];

        for (const {name, longitude, latitude} of data){
            const flat=parseFloat(latitude)
            const flng=parseFloat(longitude)
            coordElmts.push(
                <Overlay anchor={[flat, flng]} key={nanoid()}>
                    <img src={beerImg} width={50} height={50} onClick={() => meow(name, longitude, latitude)} alt={name}/>
                </Overlay>
            )
        }
        //console.log(coordElmts);
        return coordElmts;
    }

    const renderMap = () => {
        const mapElmt=[];
        
        mapElmt.push(
            <Map provider={maptilerProvider}
                key={nanoid()}
                dprs={[1,2]}
                height={500}
                defaultCenter={[lat, lng]}
                defaultZoom={11}>
                {renderOverlays()}
            </Map>
        );

        return mapElmt;
    };

    //console.log(`${apiKey}`)
    return (
        <ChangeMouse>
        {renderMap()}
        </ChangeMouse>
    )                                                                   
}                                                                           

export default Maps;