import React, { useState } from 'react';
import { MenuItem, FormControl, Select } from "@material-ui/core"
import './App.css';
// State = How to write a variable in REACT 
//https://disease.sh/v3/covid-19/countries
//useEffect = runes a piece of code based on a given condition

function App() { //cada vez que este componente do load on the screen el useeffect corre y verifica abajo en los braquets so if changes the code get load again  
  const [countries, setCountries] = useState([]); //este es el HOOK 'useState'
useEffect(() => {
//the code incide here will run once when the component loads and not again after, solo una vez corre esto
//async -> send a request, wait for it, do something with info
const getCountriesData = async () => {
    await fetch ("https://disease.sh/v3/covid-19/countries")
    .then((response) => response.json())
    .then((data) => { //when this Data comeback we have to deestructure this shit, so 
            const countries = data.map((country) => ({
              name: country.country,
              value: country.countryInfo.iso2 
             }))
        })
    }
  }, []); //si esto en los braquets no se completa habra un loop infinito debe haber 
  return (
    <div className="app">
    <div className="app__header">
    <h1>COVID-19 Tracker</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value="abc">
            {countries.map((country) => (
              <MenuItem value={country}></MenuItem>
            ))}
          </Select>
        </FormControl>
    </div>
      
      {/* {Header} */}
      {/* {Title + select input dropdown field } */}

      {/* {infoBoxes} */}
      {/* {infoBoxes} */}
      {/* {infoBoxes} */}

      {/* {table} */}
      {/* {Graph} */}

      {/* {Map} */}
    </div>
  );
}

export default App;
