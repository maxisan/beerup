import React, { useContext } from 'react'
import AppContext from '../context/AppContext';
import MeetupCard from './MeetupCard';

export default function Profile() {

  const {loggedUser, meetupList} = useContext(AppContext);

  const {id, firstName, lastName, email, profilePicture, meetups} = loggedUser;

  return (
    <div className='flex flex-col items-center'>
      <div className='flex flex-col mb-20 max-w-xs desk:flex-row desk:max-w-none
       '>
        <img src={profilePicture} alt="" className='w-40 self-center desk:max-h-44 ' />
        <div className='self-center desk:mx-4 desk:self-end'>
          <h2 className='title'>{`${firstName} ${lastName}`}</h2>
          <p className='font-body text-sm  '>{email}</p> 
        </div>
      </div>
      <div className='w-full'>
        <h2 className='title text-2xl font-bold text-center'>Tus próximas meetups</h2>
        {meetups.map(m => <MeetupCard key={m.id} id={m.id} date={m.date} time={m.time} weather={m.weather} />) }
      </div>


    </div>
  )
}
