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
      {dayForecast.weather.map(data => {
        return (
          <div>
            <p>{data.main}</p>
            <p>{data.description}</p>
          </div>
        );
      })}
      <img src={`http://openweathermap.org/img/wn/${dayForecast.weather[0].icon}.png`} alt={`${dayForecast.weather[0].main}`}></img>
    </div>
  )
}

export default DayForecast;
