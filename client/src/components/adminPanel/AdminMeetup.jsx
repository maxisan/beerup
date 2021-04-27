import React, { useContext } from 'react'
import AppContext from '../../context/AppContext';
import { useHistory } from 'react-router-dom';
import { AiOutlineWarning } from 'react-icons/ai';
import MeetupTable from './MeetupTable';
import afterToday from '../common/afterToday';
import MeetupCard from '../MeetupCard';
import beerMeetupCalculator from '../common/beerCalculator';
import Button from '../common/Button';


export default function AdminMeetup() {

  const history = useHistory()
 
  const { meetupList } = useContext(AppContext);

  const upcomingMeetups = meetupList.filter(m => afterToday(m.date));
  const nextMeetup = upcomingMeetups[0]

  const nextMeetupBeer = beerMeetupCalculator(nextMeetup);

  return (
    <div className='flex flex-col'>
      <Button label='Crear nueva meetup' className='btn btn-primary self-center' onClick={() => history.push('/admin/meetup/new')} type='button' />

      {nextMeetup?
      <div className='flex flex-col items-center'>
        <h2 className='title'>Próxima meetup:</h2>
        <MeetupCard id={nextMeetup.id} date={nextMeetup.date} time={nextMeetup.time} place={nextMeetup.place} guest={nextMeetup.users} weather={nextMeetup.weather} /> 
        <p className='mx-4 text-center'>¡Hay que comprar <b>{nextMeetupBeer.beer} cajas de cervezas</b> para la próxima meetup!</p>
        {nextMeetupBeer.error?
          <p className='font-body font-bold bg-yellow-400 px-6 py-2 text-sm rounded-lg mt-1 mb-5 flex m-4'><AiOutlineWarning className='text-xl mr-1' /> Observación: {nextMeetupBeer.error}</p>
        : null}
      </div>
      
      : null}


      <MeetupTable />
    </div>
  )      
}
