// render react components from array of objects: https://stackoverflow.com/questions/32157286/rendering-react-components-from-array-of-objects
// get bounds from array of points: https://stackoverflow.com/questions/41926938/how-to-get-the-bounds-of-a-collection-of-markers-with-react-leaflet

import React, { useState } from 'react';
import './App.css';
import LocationsMap from './components/LocationsMap';
import Forecast from './components/Forecast';

export interface Location {
  name: string,
  latitude: number,
  longitude: number
};

function App() {
  const [locations, setLocations] = useState<Location[]>([
    {name: 'Walla Walla', latitude: 46.07123, longitude: -118.29352},
    {name: 'Tollgate', latitude: 45.781037, longitude: -118.09154}
  ]);

  return (
    <div>
      <div className="forecast-container">
        <Forecast />
      </div>
      <div className="locations-map-container">
        <LocationsMap locations={locations}/>
      </div>
    </div>
  );
}

export default App;
