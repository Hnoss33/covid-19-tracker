import React from 'react';
import {
MenuItem,
FormControl,
Select
} from "@material-ui/core"
import './App.css';

function App() {
  return (
    <div className="app">  
      <h1>COVID-19 Tracker</h1>
<FormControl className="app__dropdown">
  <Select variant="outlined" value="abc">
    <MenuItem value="worldwide">WorldWide</MenuItem>
    <MenuItem value="worldwide">WorldWide</MenuItem>
    <MenuItem value="worldwide">WorldWide</MenuItem>
    <MenuItem value="worldwide">WorldWide</MenuItem>
  </Select>
</FormControl>
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
