// render react components from array of objects: https://stackoverflow.com/questions/32157286/rendering-react-components-from-array-of-objects
// get bounds from array of points: https://stackoverflow.com/questions/41926938/how-to-get-the-bounds-of-a-collection-of-markers-with-react-leaflet

import React, { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import './App.css';
import 'leaflet/dist/leaflet.css';
import L, { latLngBounds } from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
let DefaultIcon = L.icon({
    ...L.Icon.Default.prototype.options,
    iconUrl: icon,
    iconRetinaUrl: iconRetina,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

interface Location {
  name: string,
  latitude: number,
  longitude: number
};

function App() {
  const [locations, setLocations] = useState<Location[]>([
    {name: 'Walla Walla', latitude: 46.07123, longitude: -118.29352},
    {name: 'Tollgate', latitude: 45.781037, longitude: -118.09154}
  ]);

  // set bounds of the map, based off of locations above
  // make this state later if locations array can change & make useEffect to update it when locations change
  const bounds = latLngBounds([locations[0].latitude, locations[0].longitude], [locations[0].latitude, locations[0].longitude]);
  for (let location of locations) {
    console.log(`extending bounds: ${location.latitude}, ${location.longitude}`)
    bounds.extend([location.latitude, location.longitude]);
  }

  return (
    <div>
      <MapContainer bounds={bounds}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map(loc => { 
        return (
          <Marker key={loc.name} position={L.latLng(loc.latitude, loc.longitude)}>
            <Popup>{loc.name}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
    </div>
  );
}

export default App;
