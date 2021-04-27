import React, { useContext, useEffect } from 'react'
import Button from './common/Button';
import AppContext from '../context/AppContext';
import GuestList from './GuestList';
import dateToString from './common/dateToShow';
import Weather from './Weather';

export default function Meetup(props) {

  const meetupId = props.match.params.id;
  const { selectedMeetup, getSelectedMeetup } = useContext(AppContext);

  useEffect(() => {
    getSelectedMeetup(meetupId)
  }, [meetupId]);

  const {date, time, weather} = selectedMeetup;
  const dateToShow = dateToString(date);
  const guests = selectedMeetup.users;
  
  return (
    <div>
      <div className='flex justify-between mx-5 items-center desk:max-w-lg desk:mx-auto'>
        <div className=''>
          <h2 className='text-2xl font-bold font-title'>{dateToShow}</h2>
          <h3 className='font-title'>a las {time && time.toString().slice(0,-3)}</h3>
        </div>
        <div className='flex flex-col w-2/5'>
          <Weather date={date} time={time} place={selectedMeetup.place} weather={weather}/>
        </div>
      </div>
        <div className='flex flex-col items-center'>
          <GuestList guestList={guests || []} />
        </div>
    </div>
  )
}
