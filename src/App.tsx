import React, { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import './App.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'
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

  return (
    <div>
      <MapContainer center={[46.07123, -118.29352]} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map(loc => { 
        return (
          <Marker position={L.latLng(loc.latitude, loc.longitude)}>
            <Popup>{loc.name}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
    </div>
  );
}

export default App;
