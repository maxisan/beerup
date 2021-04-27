import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import dotenv from 'dotenv';

import Button from '../common/Button';

export default function MeetupForm() {
  dotenv.config();

  const [meetup, setMeetup] = useState({
    date: "",
    time: "",
  })

  const history = useHistory();

  const handlerOnSubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/meetup`, {
      meetup
    })
      .then(r => {
        history.push(`/admin/meetup/${r.data.id}/guestlist/add`)
      })
      .catch(error => console.log(error));
  }

  const handlerInputChange = (e) => {
    setMeetup({
      ...meetup,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className='flex flex-col items-center py-5'>
      <h2 className='title text-2xl font-bold mb-6'>Crear una meetup</h2>
      <form onSubmit={handlerOnSubmit} className='flex flex-col items-center w-screen max-w-lg '>
        <label htmlFor="date" className='labelStyle'>Seleccionar fecha:</label>
        <input type="date" id='date' name='date' value={meetup.date} onChange={handlerInputChange} className='inputStyle ' />
        <label htmlFor="time" className='labelStyle'>Seleccionar hora:</label>
        <input type="time" id='time' name="time" value={meetup.time} onChange={handlerInputChange} className='inputStyle mb-10'/>
        <Button type="submit" label='Crear meetup' className='btn btn-primary max-w-xs '/>
        <Button type='button' label='Cancelar' className='btn btn-secondary max-w-xs' onClick={() => history.goBack()} />
      </form>
    </div>
  )
}
