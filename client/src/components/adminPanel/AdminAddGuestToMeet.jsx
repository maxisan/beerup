import React, {useContext, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import AppContext from '../../context/AppContext';
import Guest from '../Guest';
import Button from '../common/Button';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import dotenv from 'dotenv';

export default function AdminAddGuestToMeet(props) {
  dotenv.config();

  const sweetAlert = withReactContent(Swal);

  const meetupId = props.match.params.meetupId;
  const history = useHistory();
  
  const [selectedUsers, setSelectedUsers] = useState({});
  const {userList, getAllUsers, selectedMeetup, getSelectedMeetup} = useContext(AppContext);

  useEffect(() => {
    getAllUsers();
    getSelectedMeetup(meetupId)
  }, [])

  const invitedUsers = selectedMeetup.users && selectedMeetup.users.map(u => u.id) || [];
  
  const inviteUsers = () => {
    const posts = [];
    for (let userId in selectedUsers) {
      if (selectedUsers[userId]) {
        posts.push(
          axios({
            method: 'POST',
            withCredentials: true,
            url: `${process.env.REACT_APP_BACKEND_URL}/user/${userId}/meetup/${meetupId}`
          })
        );
      }
    }
    if (posts.length) {
      Promise.all(posts)
        .then(() => {
          sweetAlert.fire({
            icon: 'success',
            text: `Se los invitó a los usuarios seleccionados`,
            showConfirmButton: false,
            timer: 2500
          });
          setSelectedUsers({});
          history.push('/admin/meetup')
        })
        .catch(error => console.log(error));
    } else {
      sweetAlert.fire({
        icon: 'error',
        text: `No se seleccionaron usuarios`,
        showConfirmButton: false,
        timer: 2500
      });
    }
  }

  return (
    <div className='m-2 desk:max-w-3xl desk:mx-auto text-center'>
      {userList.length && userList.map(u => 
      <button type='button' onClick={() => 
        setSelectedUsers({
          ...selectedUsers,
          [u.id]: !selectedUsers[u.id],
        })
      } className={`block w-full focus:outline-none ${selectedUsers[u.id]? 'bg-green-300':''} ${invitedUsers.includes(u.id)?'bg-gray-300 ':''}`} disabled={invitedUsers.includes(u.id)}>
        <div className='flex justify-between items-center'>
          <Guest key={u.id} firstName={u.firstName} lastName={u.lastName} email={u.email} profilePicture={u.profilePicture}/>
          {invitedUsers.includes(u.id)?<p className='text-center text-sm w-1/4'>Usuario ya invitado</p>:null}
        </div>
      </button>
      )}
      <Button label='Invitar usuarios' className='btn btn-primary' onClick={inviteUsers} type='button' />
      <Button label='Cancelar' className='btn btn-secondary' onClick={() => history.push('/admin/meetup')} type='button' />

    </div>
  )
}
