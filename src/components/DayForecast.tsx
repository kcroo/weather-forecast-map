import './DayForecast.css';
import {SingleDayForecast} from './Forecast'

type Props = {
  dayForecast: SingleDayForecast
}

function kelvinToFahrenheit(temp: number): number {
  return Math.round(1.8 * (temp - 273) + 32);
}

function unixTimeToMonthDate(unixTime: string): string {
  const date = new Date(parseInt(unixTime) * 1000);
  return `${date.getMonth()}/${date.getDate()}`;
}

function DayForecast({dayForecast}: Props) {
  return (
    <div>
      <h3>{unixTimeToMonthDate(dayForecast.date)}</h3>
      <p>{kelvinToFahrenheit(dayForecast.highTemp)}</p>
      <p>{kelvinToFahrenheit(dayForecast.lowTemp)}</p>
    </div>
  )
}

export default DayForecast;
