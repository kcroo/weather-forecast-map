import './DayForecast.css';
import {SingleDayForecast} from './Forecast'

type Props = {
  dayForecast: SingleDayForecast
}

function unixTimeToMonthDate(unixTime: string): string {
  const date = new Date(parseInt(unixTime) * 1000);
  return `${date.getMonth()+1}/${date.getDate()}`;
}

// mm to inches: multiple mm by 0.0393701; multiple that by 100, add epsilon, and divide by 100 to get rounded to decimal places
function mmToInch(mmAmount: number): number {
  return Math.round( (mmAmount * 3.93701 + Number.EPSILON) ) / 100
}

function DayForecast({dayForecast}: Props) {
  return (
    <div>
      <h3>{unixTimeToMonthDate(dayForecast.date)}</h3>
      <p>{Math.round(dayForecast.highTemp)}</p>
      <p>{Math.round(dayForecast.lowTemp)}</p>
      {dayForecast.weather.map(data => {
        return (
          <div>
            <p>{data.main}</p>
            <p>{data.description}</p>
          </div>
        );
      })}
      <img src={`http://openweathermap.org/img/wn/${dayForecast.weather[0].icon}.png`} alt={`${dayForecast.weather[0].main}`}></img>
      {dayForecast.precipitation.probability !== 0 && 
        <div>
          {dayForecast.precipitation.rainAmount > 0 && 
            <p>Rain amount: {mmToInch(dayForecast.precipitation.rainAmount)}</p>
          }
          {dayForecast.precipitation.snowAmount > 0 && 
            <p>Snow amount: {mmToInch(dayForecast.precipitation.snowAmount)}</p>
          }
        </div>
      }
    </div>
  )
}

export default DayForecast;
