import dotenv from 'dotenv';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { weatherIcons } from './common/weatherIcons';

export default function Weather({ meetupId, date, time, place, weather}) {
  dotenv.config();

  const searchedDate = `${date} ${time}`

  const [prevition, setPrevition] = useState({list: []});

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://community-open-weather-map.p.rapidapi.com/forecast',
      params: { q: `buenos aires,ar`, units: 'metric' },
      headers: {
        'x-rapidapi-key': `${process.env.OPEN_WEATHER_API_KEY}`,
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
      }
    };

    axios.request(options)
      .then(r => {
        setPrevition(r.data);
      })
      .catch(error => {
      console.error(error);
      });
  }, [])

  const findWeather = (prevition, searched, ini = 0, end = prevition.length) => {
    if (end-ini < 1) {
      return prevition[ini] || 'no previtions'
    }

    let i = ini + Math.floor((end - ini) / 2)

    if (prevition[i].dt_txt === searched) {
      return prevition[i]
    }
    if ((new Date(prevition[i].dt_txt)) > (new Date(searched))) {
      return findWeather(prevition, searched, ini, i-1)
    }

    if ((new Date(prevition[i].dt_txt)) < (new Date(searched))) {
      return findWeather(prevition, searched, i+1, end)
    }

  }
  
  let resultSearch = {};
  if (!weather) {
    if (prevition.list[0]) {
      if (new Date(searchedDate) > new Date(prevition.list[0].dt_txt) && new Date(searchedDate) < new Date(prevition.list[prevition.list.length-1].dt_txt)) {
        resultSearch = findWeather(prevition.list, searchedDate);
        //Registrar resultSearch en bd
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/meetup/${meetupId}`, {
          meetup: { 
            weather: JSON.stringify(resultSearch)
          },
        })
      } else {
        resultSearch = {error: 'weather is out of range'}
      }
    } else {
      resultSearch = {error: 'weather data cannot be getted'}
    }
  } else {
    resultSearch = weather
  }

  return (
    <div className='block'>
      {resultSearch.error? <p className='text-right font-body'>Sin datos del clima para esta fecha</p>:
      <div className>
        {weatherIcons[resultSearch.weather[0].icon]}
        <h2 className='text-2xl'>{`${resultSearch.main.temp_max} °`} </h2>
      </div> 
       }
    </div>
  )
}
