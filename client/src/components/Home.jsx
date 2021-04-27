import React, { useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';
import MeetupCard from './MeetupCard';
import afterToday from './common/afterToday';

export default function Home() {

  const { getAllMeetups, meetupList } = useContext(AppContext)

  useEffect(() => {
    getAllMeetups();
  }, [])

  const futureMeetup = meetupList.filter(m => afterToday(m.date))
  const pastMeetup = meetupList.filter(m => !afterToday(m.date))

  const nextMeetup = futureMeetup[0];
  return (
    <div>
      <div>
        {nextMeetup ?
          <div className='flex flex-col items-center mb-10'>
            <h2 className='title'>Nuestra próxima meetup:</h2>
            <MeetupCard key={nextMeetup.id} id={nextMeetup.id} date={nextMeetup.date} time={nextMeetup.time} guest={nextMeetup.users} weather={nextMeetup.weather} />
          </div>
          :
          <h2 className='title'>Pronto habrá una nueva meetup</h2>}
      </div>

      {futureMeetup.length > 1 ?
        <div className='flex flex-col items-center mb-10'>
          <h2 className='title'>Meetups siguientes</h2>
          {futureMeetup.map((meetup, i) => {
            if (i !== 0) {
              return <MeetupCard key={meetup.id} id={meetup.id} date={meetup.date} time={meetup.time} guest={meetup.users} weather={meetup.weather} />
            }
          })}
        </div>
        : null}
    </div>
  )
}
