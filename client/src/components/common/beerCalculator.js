const beerCalculator = (guests = 0, temp = 25) => {

  if (temp < 20) {
      return Math.ceil(guests*.75/6)
  }
  if (temp > 20 && temp < 24) {
      return Math.ceil(guests/6)
  }
  if (temp > 24) {
      return Math.ceil(guests*2/6)
  }
}

const meetupBeerCalculator = (meetup = {}) => {
  const guests = meetup.users;
  const weather = meetup.weather;

  if (!guests || !guests.length) {
    return {
      beer: 0,
      error: 'No hay invitados a la meetup',
    }
  }
  if (!weather) {
    return {
      beer: beerCalculator(guests.length),
      error: 'No existen datos del clima aún',
    }
  }
  return {
    beer: beerCalculator(guests.length, weather.main.temp_max),
  }
} 

export default meetupBeerCalculator;