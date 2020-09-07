import React, { useState, useEffect } from 'react';
import './App.css';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import Table from './Table';
import Map from './Map';
import InfoBox from './InfoBox';

//leer documentacion de los hooks en REACT usamos useState y el useEffect
// State = How to write a variable in REACT 
//https://disease.sh/v3/covid-19/countries
//useEffect = runes a piece of code based on a given condition
//the code incide here will run once when the component loads and not again after, solo una vez corre esto
//async -> send a request, wait for it, do something with info
//cada vez que este componente do load on the screen el useeffect corre y verifica abajo en los braquets so if changes the code get load again 
function App() {  
const [countries, setCountries] = useState([]); //este es el HOOK 'useState'
const [country, setCountry] = useState('worldwide');
const [countryInfo, setCountryInfo, ] = useState({})
const [tableData, setTableData] = useState([]);

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
        .then((data) => { //when this Data comeback we have to deestructure this shit, so 
                const countries = data.map((country) => ({
                name: country.country,
                value: country.countryInfo.iso2, 
          }));
          setTableData(data);
          setCountries(countries)
        });
      
      }
  getCountriesData(); //ASI SE MANEJA EL ASYNC EFFECT
  }, []); //si esto en los braquets no se completa habra un loop infinito debe haber algo aca que determine que solo se hara para 1 solo elemento 
  //{countries.map((country) this render all the countries what we saw
  
  //cuando hacemos click en el pais donde queremos ver la informacion , debemos traer esa informacion del pais, asi que creamos 
  //esta funcion escucha cuando hacemos click,  mapea la API y llama, primero llama la funcion de la lista de paises y luego la cambia 
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    
//DESDE ACA HACEMOS EL FETCH DESDE LA API CON INFORMACION ESPECIFICA
    const url = countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
    .then((response) => response.json())
    .then((data) => {
       setCountry(countryCode);
       //all the data from the country
       //from the country
       setCountryInfo(data);
    });
  };

  return (
    <div className="app">
      <div className="app__left">
    <div className="app__header">
    <h1>COVID-19 Tracker</h1>
        <FormControl className="app__dropdown">
          <Select 
          variant="outlined" 
          onChange={onCountryChange} 
          value={country}
          >
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
    </div>
      
      <div className="app__stats">
            <InfoBox 
            title="Coronavirus cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}

            />
            <InfoBox 
            title="Recovered" 
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
            />
            <InfoBox 
            title="Deaths" 
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
            />
      </div>
      <Map>

      </Map>
      </div>
      <Card className="app__righ">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData}/>
          <h3>Worldwide new cases</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
