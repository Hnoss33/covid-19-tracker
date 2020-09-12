import React, { useState, useEffect } from 'react';
import './App.css';
import {
  Card,
  CardContent,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  makeStyles
} from "@material-ui/core";
import Table from './Table';
import Map from './Map';
import InfoBox from './InfoBox';
import {sortData, prettyPrintStat} from './util'
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css";
import numeral from "numeral";
import Logo from "./Resourses/Component 25 – 1.png"

const useStyles = makeStyles((theme) => {
  return {
    button: {
      display: "block",
      marginTop: theme.spacing(2)
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    root: {
      backgroundColor: '#ffffff',
      },
  };
});

//leer documentacion de los hooks en REACT usamos useState y el useEffect
// State = How to write a variable in REACT 
//https://disease.sh/v3/covid-19/countries
//useEffect = runes a piece of code based on a given condition
//the code incide here will run once when the component loads and not again after, solo una vez corre esto
//async -> send a request, wait for it, do something with info
//cada vez que este componente do load on the screen el useeffect corre y verifica abajo en los braquets so if changes the code get load again 
//this is gonna be use in Map.js {const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 }{const [mapZoom, setMapZoom] = useState(3);}});
function App() {  
const classes = useStyles();
const [countries, setCountries] = useState([]); //este es el HOOK 'useState'
const [country, setCountry] = useState('worldwide');
const [countryInfo, setCountryInfo, ] = useState({})
const [tableData, setTableData] = useState([]);
const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
const [mapZoom, setMapZoom] = useState(3);
const [mapCountries, setMapCountries] = useState([]);
const [casesType, setCasesType] = useState("cases"); // onclick!



  useEffect(() => {
      fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch ("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => { //when this Data comeback we have to deestructure this shit, so con este useEffect traemos las ciudades asi que podemos uitilizarlo para ubicar en el mapa los circulos
                const countries = data.map((country) => ({
                name: country.country, //name country 
                value: country.countryInfo.iso2, //country code like UK, USA  ETC
          }));
          const sortedData = sortData(data);
          setMapCountries(data);
          setTableData(sortedData);
          setCountries(countries);
        });
      
      }
  getCountriesData(); //ASI SE MANEJA EL ASYNC EFFECT
  }, []); //si esto en los braquets no se completa habra un loop infinito debe haber algo aca que determine que solo se hara para 1 solo elemento 
  //{countries.map((country) this render all the countries what we saw
  
  //cuando hacemos click en el pais donde queremos ver la informacion , debemos traer esa informacion del pais, asi que creamos 
  //esta funcion escucha cuando hacemos click,  mapea la API y llama, primero llama la funcion de la lista de paises y luego la cambia 
  const onCountryChange = async (event) => {
  const countryCode = event.target.value;
    
//DESDE ACA HACEMOS EL FETCH DESDE LA API CON INFORMACION ESPEcIFICA
    
    const url = countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
    .then((response) => response.json())
    .then((data) => {
       setCountry(countryCode);
       setCountryInfo(data);
       setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      setMapZoom(5);

    });
  };
  const styles = useStyles();
  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
        <img className="login_logo"src={Logo}alt=""/>
          
          <FormControl variant="filled" className={`${styles.root} ${classes.formControl}`} error >
          <InputLabel id="controlled-open-select-label">Countries</InputLabel>
          <Select id="controlled-open-select"
              label="Worldwide"
              onChange={onCountryChange} 
              value={country}
              renderValue={(value) => `☠︎ - ${value}`}
               >
                <MenuItem value="worldwide"></MenuItem>
                {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
        </div>
          
          <div className="app__stats">
              <InfoBox
                onClick={(e) => setCasesType("cases")}
                title="Coronavirus Cases"
                isRed
                active={casesType === "cases"}
                cases={prettyPrintStat(countryInfo.todayCases)}
                total={numeral(countryInfo.cases).format("0.0a")}
              />
              <InfoBox
                onClick={(e) => setCasesType("recovered")}
                title="Recovered"
                active={casesType === "recovered"}
                cases={prettyPrintStat(countryInfo.todayRecovered)}
                total={numeral(countryInfo.recovered).format("0.0a")}
              />
              <InfoBox
                onClick={(e) => setCasesType("deaths")}
                title="Deaths"
                isRed
                active={casesType === "deaths"}
                cases={prettyPrintStat(countryInfo.todayDeaths)}
                total={numeral(countryInfo.deaths).format("0.0a")}
              />
          </div>
          
            <Map id="mapa"
              countries={mapCountries}
              casesType={casesType}
              center={mapCenter}
              zoom={mapZoom}
            />
        </div>
          <Card className= {`${styles.root} ${"app__right"}`} > 
            <CardContent className="app__information">
                <h3>Live Cases by Country ☣︎ </h3>
                <Table countries={tableData} />
                <h3 className="app__graphTitle">Worldwide new {casesType} ☣︎</h3>
                <LineGraph className="app__graph" casesType={casesType} />
            
            </CardContent>
          </Card>
</div>
  );
};

//<Card className="app__right">  si colocamos este classname significa que debemos crear el ...props en la funcion dentro de Linegraph para poder modificar el css de esta CARD
export default App;
