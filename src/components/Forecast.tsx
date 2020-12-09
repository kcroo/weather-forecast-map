import DayForecast from './DayForecast';
import './Forecast.css';
import {Location} from '../App'
import {useEffect, useState} from 'react';

type Props = {
  currentLocation: Location | null
}

interface OpenWeatherForecast {
  dt: string,
  temp: {
    max: number,
    min: number
  },
  humidity: number,
  wind_speed: number
}

interface OpenWeatherResponse {
  daily: OpenWeatherForecast[] 
}

export interface SingleDayForecast {
  date: string,
  highTemp: number,
  lowTemp: number,
  humidity: number,
  windSpeed: number
}

interface SevenDayForecast {
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
          const data = await fetchWrapper<OpenWeatherResponse>(`https://api.openweathermap.org/data/2.5/onecall?lat=${currentLocation.latitude}&lon=${currentLocation.longitude}&exclude=current,minutely,hourly&appid=${process.env.REACT_APP_OWM_API_KEY}`)
          console.log(data);
          try {
            const forecasts: SingleDayForecast[] = data.daily.map(day => {
              return {
                date: day.dt,
                highTemp: day.temp.max,
                lowTemp: day.temp.min,
                humidity: day.humidity,
                windSpeed: day.wind_speed
              }
            })
            const sevenDayForecast = {
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
          {forecastData.allForecasts.map(day => {
            return <DayForecast dayForecast={day} key={day.date}/>
          })}
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
