import React from 'react';
import { Marker } from 'pigeon-maps';

//<Marker width={50} anchor={[50, 4]} /> */
const RenderMarkers = ( {data} ) => {
    const coordElmts = [];
    for (const {id, brewery_type} of data)
        console.log(id);
    // for (const() of markerCoords){
    //     coordElmts.push(
            // <Marker>
            //     width={markerWidth}
            //     anchor={markerAnchor} //anchor is long, lat
            // </Marker>
    //     )
    // }
    return;
}

export default RenderMarkers;