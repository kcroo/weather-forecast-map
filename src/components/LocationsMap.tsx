import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import {Location} from '../App';
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

type Props = {
  locations: Location[]
}

function LocationsMap({locations}: Props) {
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

export default LocationsMap;
