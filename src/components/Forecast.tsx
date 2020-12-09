import DayForecast from './DayForecast';
import './Forecast.css';
import {Location} from '../App'

type Props = {
  currentLocation: Location | null
}

function Forecast({currentLocation}: Props) {
  if (!currentLocation) {
    return (
      <h1>Click a location on the map to view its forecast</h1>
    )
  }
  else {
    return (
      <div>
        <h1>{currentLocation.name}, {currentLocation.latitude}, {currentLocation.longitude}</h1>
        <div className="forecast-box">
            <DayForecast />
            <DayForecast />
            <DayForecast />
            <DayForecast />
            <DayForecast />
            <DayForecast />
            <DayForecast />
        </div>
      </div>
    )
  }
}

export default Forecast;
