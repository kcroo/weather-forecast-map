import DayForecast from './DayForecast';
import './Forecast.css';
import {Location} from '../App'
import {useEffect, useState} from 'react';

type Props = {
  currentLocation: Location | null
}

interface OpenWeatherForecast {
  dt_txt: string,
  main: {
    temp_max: number,
    temp_min: number,
    humidity: number
  },
  wind: {
    speed: number
  }
}

interface OpenWeatherResponse {
  city: {
    name: string,
    coord: {
      lat: number,
      long: number
    }
  },
  cnt: number,
  cod: string,
  list: OpenWeatherForecast[] 
}

interface SingleDayForecast {
  date: string,
  highTemp: number,
  lowTemp: number,
  humidity: number,
  windSpeed: number
}

interface SevenDayForecast {
  location: Location,
  allForecasts: SingleDayForecast[]
}

function Forecast({currentLocation}: Props) {
  const [forecastData, setForecastData] = useState<SevenDayForecast | null>(null);

  async function fetchWrapper<T>(request: string): Promise<T> {
    const response = await fetch(request)
    return await response.json()
  }

  useEffect( () => {
    async function getForecast() {
      if (currentLocation) {
        try {
          //const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${currentLocation.latitude}&lon=${currentLocation.longitude}&cnt=7&appid=8a06a086509594b99c75611b81014364`);
          //const json = await response.json();
          const data = await fetchWrapper<OpenWeatherResponse>(`https://api.openweathermap.org/data/2.5/forecast?lat=${currentLocation.latitude}&lon=${currentLocation.longitude}&cnt=7&appid=${process.env.REACT_APP_OWM_API_KEY}`)
          console.log(data);
          try {
            const forecasts: SingleDayForecast[] = data.list.map(day => {
              return {
                date: day.dt_txt,
                highTemp: day.main.temp_max,
                lowTemp: day.main.temp_min,
                humidity: day.main.humidity,
                windSpeed: day.wind.speed
              }
            })
            const sevenDayForecast = {
              location: {
                name: data.city.name,
                latitude: data.city.coord.lat,
                longitude: data.city.coord.long
              },
              allForecasts: forecasts
            }
            setForecastData(sevenDayForecast);
          }
          catch (e) {
            console.log(e);
          }
        }
        catch (e) {
          console.log(e);
        }
      }
    }
    getForecast();
  }, [currentLocation]);

  if (currentLocation && forecastData) {
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
  else {
    return (
      <h1>Click a location on the map to view its forecast</h1>
    )
  }
}

export default Forecast;
