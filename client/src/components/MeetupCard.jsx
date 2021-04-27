import React from 'react'
import { Link } from 'react-router-dom'
import { RiUserSmileFill } from 'react-icons/ri'
import { IoBeer } from 'react-icons/io5'
import beerCalculator from './common/beerCalculator';
import dateToShow from './common/dateToShow';
import Weather from './Weather';


export default function MeetupCard({id, date, time, place, guest, weather}) {
  const toUseDate = dateToShow(date);

  return (
    <Link to={`/meetup/${id}`} className='w-full flex flex-col flex-initial   items-center'>
      <div className='text-white m-4 w-11/12 desk:max-w-3xl'>
        <div className='bg-meetupCard bg-redPrimary bg-blend-multiply bg-cover bg-center truncate rounded-3xl p-5 shadow-lg'>
            <div className='flex flex-col items-center justify-between w-full'>
              <h2 className='title font-bold text-2xl'>{toUseDate}</h2>
              <h3 className='text-lg justify-self-start mb-2'>a las {time.slice(0,-3)}</h3>
              <Weather meetupId={id} date={date} time={time} place={place} weather={weather} />
              <div className='m-2'>
                {guest?
                <div className='flex'>
                  <RiUserSmileFill />
                  <h2 className='px-2'>{guest.length} invitado(s)</h2>
                </div>
                : null}
              </div>
            </div>
        </div>
      </div>
    </Link>
  )
}
