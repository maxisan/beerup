const { Meetup } = require('../../db');

const meetups = [
  {
    weather: JSON.stringify({
      dt: 1619373600,
      main: {
        temp: 21.7,
        feels_like: 17.85,
        temp_min: 18.48,
        temp_max: 21.48,
        pressure: 1019,
        sea_level: 1019,
        grnd_level: 1015,
        humidity: 56,
        temp_kf: 0
      },
      weather: [
        {
          id: 801,
          main: "Clouds",
          description: "few clouds",
          icon: "02d"
        }
      ],
      clouds: {
        all: 18
      },
      wind: {
        speed: 3.04,
        deg: 173,
        gust: 4.31
      },
      visibility: 10000,
      pop: 0,
      sys: {
        pod: "d"
      },
      dt_txt: "2021-05-04 18:00:00"
    }),
    date: "2021-05-04",
    time: "11:26:00",
  },
  {
    weather: JSON.stringify({
      dt: 1619373600,
      main: {
        temp: 16.48,
        feels_like: 17.85,
        temp_min: 18.48,
        temp_max: 16.48,
        pressure: 1019,
        sea_level: 1019,
        grnd_level: 1015,
        humidity: 56,
        temp_kf: 0
      },
      weather: [
        {
          id: 801,
          main: "Clouds",
          description: "few clouds",
          icon: "02d"
        }
      ],
      clouds: {
        all: 18
      },
      wind: {
        speed: 3.04,
        deg: 173,
        gust: 4.31
      },
      visibility: 10000,
      pop: 0,
      sys: {
        pod: "d"
      },
      dt_txt: "2021-05-25 18:00:00"
    }),
    date: "2021-05-25",
    time: "06:30:00",
  },
  {
    weather: JSON.stringify({
      dt: 1619373600,
      main: {
        temp: 18.48,
        feels_like: 17.85,
        temp_min: 18.48,
        temp_max: 18.48,
        pressure: 1019,
        sea_level: 1019,
        grnd_level: 1015,
        humidity: 56,
        temp_kf: 0
      },
      weather: [
        {
          id: 801,
          main: "Clouds",
          description: "few clouds",
          icon: "02d"
        }
      ],
      clouds: {
        all: 18
      },
      wind: {
        speed: 3.04,
        deg: 173,
        gust: 4.31
      },
      visibility: 10000,
      pop: 0,
      sys: {
        pod: "d"
      },
      dt_txt: "2021-04-25 18:00:00"
    }),
    date: "2021-04-25",
    time: "15:38:00",
  },
  {
    weather: JSON.stringify({
      dt: 1619492400,
      main: {
        temp: 15.49,
        feels_like: 14.79,
        temp_min: 15.49,
        temp_max: 15.49,
        pressure: 1020,
        sea_level: 1020,
        grnd_level: 1017,
        humidity: 65,
        temp_kf: 0
      },
      weather: [
        {
          id: 800,
          main: "Clear",
          description: "clear sky",
          icon: "01n"
        }
      ],
      clouds: {
        all: 0
      },
      wind: {
        speed: 0.98,
        deg: 135,
        gust: 0.96
      },
      visibility: 10000,
      pop: 0,
      sys: {
        pod: "n"
      },
      dt_txt: "2021-05-27 03:00:00"
    }),
    date: "2021-05-27",
    time: "01:43:00",
  },
  {
    weather: JSON.stringify({
      dt: 1619492400,
      main: {
        temp: 15.49,
        feels_like: 14.79,
        temp_min: 15.49,
        temp_max: 27.49,
        pressure: 1020,
        sea_level: 1020,
        grnd_level: 1017,
        humidity: 65,
        temp_kf: 0
      },
      weather: [
        {
          id: 800,
          main: "Clear",
          description: "clear sky",
          icon: "01n"
        }
      ],
      clouds: {
        all: 0
      },
      wind: {
        speed: 0.98,
        deg: 135,
        gust: 0.96
      },
      visibility: 10000,
      pop: 0,
      sys: {
        pod: "n"
      },
      dt_txt: "2021-05-13 03:00:00"
    }),
    date: "2021-05-13",
    time: "11:52:00",
  },
  {
    weather: JSON.stringify({
      dt: 1619492400,
      main: {
        temp: 15.49,
        feels_like: 14.79,
        temp_min: 15.49,
        temp_max: 23.49,
        pressure: 1020,
        sea_level: 1020,
        grnd_level: 1017,
        humidity: 65,
        temp_kf: 0
      },
      weather: [
        {
          id: 800,
          main: "Clear",
          description: "clear sky",
          icon: "01n"
        }
      ],
      clouds: {
        all: 0
      },
      wind: {
        speed: 0.98,
        deg: 135,
        gust: 0.96
      },
      visibility: 10000,
      pop: 0,
      sys: {
        pod: "n"
      },
      dt_txt: "2021-06-08 03:00:00"
    }),
    date: "2021-06-08",
    time: "23:10:00",
  }
]

const meetupPreload = () => {
  const createMeetups = meetups.map(m => {
    Meetup.create(m)
  })
  Promise.all(createMeetups)
    .then(() => console.log('Meetups created successfully'))
    .catch(error => console.log(error));
}

module.exports = meetupPreload;