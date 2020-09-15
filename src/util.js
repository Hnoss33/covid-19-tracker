//esta es una funcion de sorteo osea que sortData es igual  a Data 
// export const sortData = (data) => {
//     const sortedData = [...data];
import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

//this is a dictionary, its an a object with al the colors that 
//<Circle will show on the map, so down below are the fuction showdataonmap who has Circle whitch will drow with the colors from the dictionary call casesTypeColors
const casesTypeColors = {
  cases: {
    hex: "#802636",
    rgb: "rgb(204, 16, 52)",
    half_op: "rgba(204, 16, 52, 0.3)",
    multiplier: 800,
  },
  recovered: {
    hex: "#68b35d",
    rgb: "rgba(104, 179, 93, 1)",
    half_op: "rgba(125, 215, 29, 0.3)",
    multiplier: 1200,
  },
  deaths: {
    hex: "#802636",
    rgb: "rgb(251, 68, 67)",
    half_op: "rgba(251, 68, 67, 0.3)",
    multiplier: 2000,
  },
};
///////////////
export const sortData = (data) => {
    const sortedData = [...data];

    return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
}
///////////////

//this function shows in the infoBox if the number increase or decrease , just show the + symbol
export const prettyPrintStat = (stat) => stat ? `+${numeral(stat).format("0.0a")}` : "+0";


///////////////
//this fuction Draw circles on the map with interactive tooltop

// the RADIUS below just increase the size of the circle who represents the quantity of deaths or infectons on the map, so its just multiply the number of cases with the multiplier from the directory 
export const showDataOnMap = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      fillOpacity={0.4}
      weight={1}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle> 
    ));
//
// weight={1}