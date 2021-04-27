import React from 'react';
import { TiDelete } from 'react-icons/ti';
import axios from 'axios';
import Guest from '../Guest';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import dotenv from 'dotenv';

export default function AdminGuestList({ guestList, meetupId, getSelectedMeetup }) {
  dotenv.config();

  const DeleteAlert = withReactContent(Swal);

  const removeGuest = user => {
    DeleteAlert.fire({
      title: <p>Estás a punto de quitar un usuario de la lista de invitados</p>,
      icon: 'question',
      html: 
      <div>
        <p>Nombre: <b>{`${user.firstName} ${user.lastName}`}</b></p>
        <p>¿Deseas removerlo?</p>
      </div>,
      confirmButtonText: 'Quitar usuario',
      showDenyButton: true,
      denyButtonText: 'Dejar usuario',
    })
      .then(result => {
        if(result.isConfirmed) {
          axios({
            method: 'DELETE',
            withCredentials: true,
            url: `${process.env.REACT_APP_BACKEND_URL}/user/${user.id}/meetup/${meetupId}`,
          })
            .then(r => {
              getSelectedMeetup(meetupId);
            })
            .catch(error => console.log(error));
        }
      })

  }

  return (
    <div className='flex flex-col mx-5 my-2'>
      <h2 className='self-center title'>Van a estar: </h2>
      {guestList.map(g =>
        <div className='flex justify-between items-center desk:w-full desk:max-w-xl desk:mx-auto'>
          <Guest key={g.id} firstName={g.firstName} lastName={g.lastName} email={g.email} profilePicture={g.profilePicture} confirmed={g.guestmeetup.confirmed} />
          {g.guestmeetup.confirmed ?
            <span className='py-1 px-2 rounded-full bg-green-400 text-sm'>Confirmado</span>
            :
            <span className='py-1 px-2 bg-red-300 rounded-full text-sm'>No confirmado</span>}
          <TiDelete className='text-2xl' onClick={() => removeGuest(g)} />
        </div>
      )}
    </div>
  )
}
