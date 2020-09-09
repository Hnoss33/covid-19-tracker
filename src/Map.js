import React from 'react';
import './Map.css';
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import { showDataOnMap } from './util';
//https://react-leaflet.js.org/
//we have to instal {npm install react-leaflet} and  npm i leaflet "both"!!
//https://www.openstreetmap.org/
//en el app.js debemos traer el archivo css asi : {import "leaflet/dist/leaflet.css";} importante!!
function Map({countries, casesType, center, zoom}) {
    return (
        <div className="map">
            <LeafletMap center={center} zoom={zoom}>
            <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
          {showDataOnMap(countries, casesType )}
            </LeafletMap>
        </div>
    )
}

export default Map
